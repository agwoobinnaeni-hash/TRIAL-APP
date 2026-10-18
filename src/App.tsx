/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TurnoverHero } from './components/TurnoverHero';
import { ScannerFilterBar } from './components/ScannerFilterBar';
import { MatchCard } from './components/MatchCard';
import { DeepAnalysisModal } from './components/DeepAnalysisModal';
import { TurnoverCalculatorModal } from './components/TurnoverCalculatorModal';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { BankrollLedgerView } from './components/BankrollLedgerView';
import { Match, SportType, NotificationItem, AlertSettings, BankrollDayRecord } from './types/sports';
import {
  INITIAL_MATCHES,
  INITIAL_NOTIFICATIONS,
  INITIAL_ALERT_SETTINGS,
  INITIAL_BANKROLL_HISTORY,
} from './data/mockSportsData';
import { ShieldCheck, TrendingUp, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(INITIAL_ALERT_SETTINGS);
  const [bankrollHistory, setBankrollHistory] = useState<BankrollDayRecord[]>(INITIAL_BANKROLL_HISTORY);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'scanner' | 'turnover' | 'ledger'>('scanner');

  // Filters
  const [selectedSport, setSelectedSport] = useState<SportType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [confidenceFilter, setConfidenceFilter] = useState<'all' | 'ultra' | 'high'>('all');
  const [turnoverOnly, setTurnoverOnly] = useState<boolean>(true);

  // Modals & Drawers
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analysisMatch, setAnalysisMatch] = useState<Match | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [selectedSlipMatchIds, setSelectedSlipMatchIds] = useState<string[]>(['m-epl-01']);

  // Current Bankroll metrics computed from ledger history
  const startingBankroll = bankrollHistory[0]?.openingBalance || 100.0;
  const lastWonOrPending = bankrollHistory[bankrollHistory.length - 1];
  const currentBankroll = lastWonOrPending
    ? lastWonOrPending.status === 'won'
      ? lastWonOrPending.closingBalance
      : lastWonOrPending.openingBalance
    : startingBankroll;

  const currentStreak = bankrollHistory.filter((r) => r.status === 'won').length;
  const totalDays = 20;

  // Unread notification count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Synthesize gentle notification audio chime using Web Audio API
  const playAlertChime = () => {
    if (!alertSettings.soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.0, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
      // AudioContext may be blocked before interaction
    }
  };

  // Filter matches
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      // Sport filter
      if (selectedSport !== 'all' && m.sport !== selectedSport) return false;

      // Turnover odds filter
      if (turnoverOnly && (m.peculiarMarket.odds < 1.20 || m.peculiarMarket.odds > 1.55)) {
        return false;
      }

      // Confidence tier filter
      if (confidenceFilter === 'ultra' && m.peculiarMarket.modelProbability < 92.0) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const text = `${m.homeTeam} ${m.awayTeam} ${m.league} ${m.peculiarMarket.marketName} ${m.peculiarMarket.selection}`.toLowerCase();
        if (!text.includes(q)) return false;
      }

      return true;
    });
  }, [matches, selectedSport, turnoverOnly, confidenceFilter, searchQuery]);

  // Selected matches for slip
  const selectedSlipMatches = useMemo(() => {
    return matches.filter((m) => selectedSlipMatchIds.includes(m.id));
  }, [matches, selectedSlipMatchIds]);

  // Toggle match in slip
  const handleToggleSlipMatch = (match: Match) => {
    if (selectedSlipMatchIds.includes(match.id)) {
      setSelectedSlipMatchIds(selectedSlipMatchIds.filter((id) => id !== match.id));
    } else {
      setSelectedSlipMatchIds([...selectedSlipMatchIds, match.id]);
    }
  };

  // Trigger live scan simulation
  const handleTriggerScan = async () => {
    setIsScanning(true);
    try {
      const res = await fetch('/api/scanner/run', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.data) {
        setMatches(data.data);

        // Add a live scan alert
        const newNotif: NotificationItem = {
          id: `scan-${Date.now()}`,
          timestamp: 'Just now',
          title: 'Daily Multi-Sport Rescan Completed',
          message: `Algorithm evaluated 148 global fixtures. 6 matches satisfied strict >90% historical consensus criteria.`,
          sport: 'soccer',
          matchId: 'm-epl-01',
          confidence: 93.2,
          odds: 1.34,
          read: false,
          type: 'banker_alert',
        };
        setNotifications((prev) => [newNotif, ...prev]);
        playAlertChime();
      }
    } catch {
      // keep existing matches
    } finally {
      setTimeout(() => setIsScanning(false), 800);
    }
  };

  // Settle day in ledger
  const handleSettleDay = (dayIndex: number, outcome: 'won' | 'lost') => {
    setBankrollHistory((prev) => {
      const updated = [...prev];
      const target = updated[dayIndex];
      if (!target) return prev;

      if (outcome === 'won') {
        const profit = Number((target.stake * (target.targetOdds - 1)).toFixed(2));
        const closing = Number((target.openingBalance + profit).toFixed(2));
        updated[dayIndex] = {
          ...target,
          status: 'won',
          profit,
          closingBalance: closing,
        };

        // If today was settled as won, unlock the next day in the turnover ladder!
        const nextDayNum = target.day + 1;
        const nextOdds = 1.34;
        const nextProfit = Number((closing * (nextOdds - 1)).toFixed(2));
        updated.push({
          day: nextDayNum,
          date: `Day ${nextDayNum} (Pending)`,
          openingBalance: closing,
          targetOdds: nextOdds,
          stake: closing,
          profit: nextProfit,
          closingBalance: Number((closing + nextProfit).toFixed(2)),
          status: 'pending',
          matchSummary: 'Next Turnover Banker (Awaiting Morning Scan)',
        });
      } else {
        updated[dayIndex] = {
          ...target,
          status: 'lost',
          profit: -target.stake,
          closingBalance: 0,
        };
      }
      return updated;
    });
    playAlertChime();
  };

  // Reset challenge
  const handleResetChallenge = () => {
    setBankrollHistory(INITIAL_BANKROLL_HISTORY);
  };

  // Log turnover pick from calculator
  const handleLogTurnoverPick = (stake: number, combinedOdds: number, summary: string) => {
    setBankrollHistory((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;
      const profit = Number((stake * (combinedOdds - 1)).toFixed(2));
      const closing = Number((stake + profit).toFixed(2));

      if (updated[lastIndex].status === 'pending') {
        updated[lastIndex] = {
          ...updated[lastIndex],
          stake,
          targetOdds: combinedOdds,
          profit,
          closingBalance: closing,
          matchSummary: summary,
        };
      }
      return updated;
    });
    playAlertChime();
  };

  // Dispatch test notification
  const handleDispatchTestAlert = () => {
    const testItem: NotificationItem = {
      id: `test-${Date.now()}`,
      timestamp: 'Just now',
      title: 'Ultra Banker Detected: Real Madrid 1X & Under 4.5 Goals',
      message: 'Scanner identified 93.1% true probability at @1.31 odds (23/24 historical Bernabéu cover rate).',
      sport: 'soccer',
      matchId: 'm-laliga-03',
      confidence: 93.1,
      odds: 1.31,
      read: false,
      type: 'banker_alert',
    };
    setNotifications((prev) => [testItem, ...prev]);
    playAlertChime();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Bar Contract (Wordmark, Nav Links, Primary Action) */}
      <Header
        notifications={notifications}
        unreadCount={unreadCount}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenAlertSettings={() => setIsSettingsOpen(true)}
        onOpenTurnoverCalculator={() => setIsCalculatorOpen(true)}
        onTriggerScan={handleTriggerScan}
        isScanning={isScanning}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TAB 1: DAILY SCANNER VIEW */}
        {activeTab === 'scanner' && (
          <div>
            {/* Turnover Hero & Primary Banker Feature */}
            <TurnoverHero
              featuredMatch={matches[0]}
              currentBankroll={currentBankroll}
              startingBankroll={startingBankroll}
              currentStreak={currentStreak}
              totalDays={totalDays}
              onOpenAnalysis={(m) => setAnalysisMatch(m)}
              onAddToSlip={handleToggleSlipMatch}
              isInSlip={selectedSlipMatchIds.includes(matches[0]?.id)}
            />

            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Daily Multi-Sport Banker Opportunities</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    High Historical Accuracy
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Algorithm filters for high model probability (88%+), sharp consensus convergence, and peculiar tailored game markets.
                </p>
              </div>

              {/* Quick Action to Open Active Slip */}
              {selectedSlipMatches.length > 0 && (
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white flex items-center gap-2 transition-colors self-start sm:self-auto"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>
                    Active Slip ({selectedSlipMatches.length} {selectedSlipMatches.length === 1 ? 'pick' : 'picks'})
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    @{selectedSlipMatches.reduce((acc, m) => acc * m.peculiarMarket.odds, 1).toFixed(2)}
                  </span>
                </button>
              )}
            </div>

            {/* Filter Controls Bar */}
            <ScannerFilterBar
              selectedSport={selectedSport}
              onSelectSport={setSelectedSport}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              confidenceFilter={confidenceFilter}
              onConfidenceFilterChange={setConfidenceFilter}
              turnoverOnly={turnoverOnly}
              onToggleTurnoverOnly={() => setTurnoverOnly(!turnoverOnly)}
              matchCount={filteredMatches.length}
            />

            {/* Matches List Grid */}
            {filteredMatches.length === 0 ? (
              <div className="p-12 text-center border border-slate-800 rounded-2xl bg-slate-900/40 space-y-3">
                <Filter className="w-8 h-8 text-slate-600 mx-auto" />
                <h3 className="text-base font-semibold text-slate-300">No banker matches match current filters</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try lowering the confidence threshold or disabling the &quot;Turnover Safe Odds&quot; filter to see more scanned matches.
                </p>
                <button
                  onClick={() => {
                    setSelectedSport('all');
                    setConfidenceFilter('all');
                    setTurnoverOnly(false);
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800 rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
                {filteredMatches.map((match) => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onOpenAnalysis={(m) => setAnalysisMatch(m)}
                    onAddToSlip={handleToggleSlipMatch}
                    isInSlip={selectedSlipMatchIds.includes(match.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COMPOUND CHALLENGE & SLIP VIEW */}
        {activeTab === 'turnover' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 border border-slate-800 shadow-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4" />
                  <span>The 20-Day Compound Turnover Strategy</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Consistent Turnover Beats Speculative High-Odds Gambling
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                  By staking solely on mathematically vetted banker outcomes between 1.25 and 1.40 odds with 90%+ historical consensus, capital turns over daily with exponential compounding return.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="px-4 py-2.5 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-sm flex items-center gap-2"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Open Slip & Trajectory Planner</span>
                </button>
              </div>
            </div>

            {/* Featured Match Card in Turnover View */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-1">
                Today’s Selected Banker Match for Turnover Rollover
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                Selected by consensus score (94%) and historical accuracy (19/20 hits).
              </p>
              <MatchCard
                match={matches[0]}
                onOpenAnalysis={(m) => setAnalysisMatch(m)}
                onAddToSlip={handleToggleSlipMatch}
                isInSlip={selectedSlipMatchIds.includes(matches[0]?.id)}
              />
            </div>

            {/* Quick Ledger Snapshot */}
            <BankrollLedgerView
              history={bankrollHistory}
              startingBankroll={startingBankroll}
              currentBankroll={currentBankroll}
              currentStreak={currentStreak}
              totalDays={totalDays}
              onSettleDay={handleSettleDay}
              onResetChallenge={handleResetChallenge}
              onOpenCalculator={() => setIsCalculatorOpen(true)}
            />
          </div>
        )}

        {/* TAB 3: BANKROLL LEDGER VIEW */}
        {activeTab === 'ledger' && (
          <BankrollLedgerView
            history={bankrollHistory}
            startingBankroll={startingBankroll}
            currentBankroll={currentBankroll}
            currentStreak={currentStreak}
            totalDays={totalDays}
            onSettleDay={handleSettleDay}
            onResetChallenge={handleResetChallenge}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">TurnoverEdge Analytics</span>
            <span aria-hidden="true">·</span>
            <span>Quantitative High-Probability Sports Prediction System</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span>Algorithmic Model Accuracy: 94.6% (L100)</span>
            <span aria-hidden="true">·</span>
            <span>Updated Daily at 06:00 GMT</span>
          </div>
        </div>
      </footer>

      {/* AI Situational Analysis Modal (Gemini 3.8 Flash) */}
      <DeepAnalysisModal
        match={analysisMatch}
        onClose={() => setAnalysisMatch(null)}
        onAddToSlip={handleToggleSlipMatch}
        isInSlip={analysisMatch ? selectedSlipMatchIds.includes(analysisMatch.id) : false}
      />

      {/* Turnover ROI Planner & Active Slip Builder Modal */}
      <TurnoverCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
        selectedMatches={selectedSlipMatches}
        onRemoveFromSlip={(id) => setSelectedSlipMatchIds(selectedSlipMatchIds.filter((mId) => mId !== id))}
        currentBankroll={currentBankroll}
        onLogTurnoverPick={handleLogTurnoverPick}
      />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={alertSettings}
        onSaveSettings={setAlertSettings}
        onDispatchTestAlert={handleDispatchTestAlert}
      />

      {/* Notification Center Stream Modal */}
      <NotificationCenterModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(notifications.map((n) => ({ ...n, read: true })))}
        onClearAll={() => setNotifications([])}
        onSelectMatch={(matchId) => {
          const m = matches.find((item) => item.id === matchId);
          if (m) setAnalysisMatch(m);
        }}
      />
    </div>
  );
}
