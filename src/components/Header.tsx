import React from 'react';
import { ShieldCheck, Bell, RefreshCw, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { NotificationItem } from '../types/sports';

interface HeaderProps {
  notifications: NotificationItem[];
  unreadCount: number;
  onOpenNotifications: () => void;
  onOpenAlertSettings: () => void;
  onOpenTurnoverCalculator: () => void;
  onTriggerScan: () => void;
  isScanning: boolean;
  activeTab: string;
  setActiveTab: (tab: 'scanner' | 'turnover' | 'ledger') => void;
}

export const Header: React.FC<HeaderProps> = ({
  unreadCount,
  onOpenNotifications,
  onOpenAlertSettings,
  onOpenTurnoverCalculator,
  onTriggerScan,
  isScanning,
  activeTab,
  setActiveTab,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <button
              onClick={() => setActiveTab('scanner')}
              className="text-left group"
            >
              <span className="text-lg font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0">
                TurnoverEdge
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button
              onClick={() => setActiveTab('scanner')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'scanner' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400'
              }`}
            >
              Daily Scanner
            </button>
            <button
              onClick={() => setActiveTab('turnover')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'turnover' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400'
              }`}
            >
              Compound Challenge
            </button>
            <button
              onClick={() => setActiveTab('ledger')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 border-b-2 ${
                activeTab === 'ledger' ? 'border-emerald-400 text-white' : 'border-transparent text-slate-400'
              }`}
            >
              Bankroll Ledger
            </button>
            <button
              onClick={onOpenTurnoverCalculator}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0 text-slate-400 flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>ROI Calculator</span>
            </button>
          </nav>

          {/* Zone 3: Primary action + interactive utilities */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onTriggerScan}
              disabled={isScanning}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0 disabled:opacity-60"
              title="Rescan sports fixtures across sports"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Live Scan'}</span>
            </button>

            <button
              onClick={onOpenAlertSettings}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg transition-colors"
              title="Notification & Confidence Settings"
              aria-label="Alert Settings"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 rounded-lg transition-colors"
              title="High Probability Banker Alerts"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('turnover')}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              Today’s Banker
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
