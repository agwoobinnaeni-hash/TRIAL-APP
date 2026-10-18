import React, { useState } from 'react';
import { X, TrendingUp, DollarSign, Calculator, Calendar, ArrowRight, Check, Trash2 } from 'lucide-react';
import { Match } from '../types/sports';

interface TurnoverCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMatches: Match[];
  onRemoveFromSlip: (matchId: string) => void;
  currentBankroll: number;
  onLogTurnoverPick: (stake: number, combinedOdds: number, summary: string) => void;
}

export const TurnoverCalculatorModal: React.FC<TurnoverCalculatorModalProps> = ({
  isOpen,
  onClose,
  selectedMatches,
  onRemoveFromSlip,
  currentBankroll,
  onLogTurnoverPick,
}) => {
  const [startCapital, setStartCapital] = useState<number>(100);
  const [dailyOdds, setDailyOdds] = useState<number>(1.34);
  const [daysCount, setDaysCount] = useState<number>(20);
  const [activeStake, setActiveStake] = useState<number>(currentBankroll);
  const [loggedSuccess, setLoggedSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate active slip combined odds and probability
  const combinedOdds = selectedMatches.length > 0
    ? Number(selectedMatches.reduce((acc, m) => acc * m.peculiarMarket.odds, 1).toFixed(2))
    : dailyOdds;

  const combinedProb = selectedMatches.length > 0
    ? Number(selectedMatches.reduce((acc, m) => acc * (m.peculiarMarket.modelProbability / 100), 1) * 100).toFixed(1)
    : (1 / dailyOdds * 100).toFixed(1);

  const potentialReturn = (activeStake * combinedOdds).toFixed(2);
  const netProfit = (Number(potentialReturn) - activeStake).toFixed(2);

  // Generate Compound Projection Table for n days
  const projectionTable = [];
  let runningBalance = startCapital;
  for (let i = 1; i <= daysCount; i++) {
    const dayStart = runningBalance;
    const profit = dayStart * (dailyOdds - 1);
    const dayEnd = dayStart + profit;
    runningBalance = dayEnd;
    if (i <= 7 || i === 10 || i === 15 || i === 20 || i === daysCount) {
      projectionTable.push({
        day: i,
        start: dayStart.toFixed(2),
        profit: profit.toFixed(2),
        end: dayEnd.toFixed(2),
        roi: (((dayEnd - startCapital) / startCapital) * 100).toFixed(0),
      });
    }
  }

  const handlePlaceOrder = () => {
    const summary = selectedMatches.length > 0
      ? selectedMatches.map((m) => `${m.homeTeam}: ${m.peculiarMarket.selection}`).join(' + ')
      : `Daily Turnover Banker (${dailyOdds} odds)`;

    onLogTurnoverPick(activeStake, combinedOdds, summary);
    setLoggedSuccess(true);
    setTimeout(() => {
      setLoggedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <Calculator className="w-4 h-4" />
          <span>Compound Turnover Engine & Daily Slip</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Turnover ROI Planner & Slip Builder
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Systematic bankroll turnover prioritizes high-confidence, low-variance odds (1.25–1.40) to compound profits daily.
        </p>

        {/* Top Grid: Interactive Inputs vs Today's Slip */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Active Slip Builder */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Today’s Selected Banker Picks ({selectedMatches.length})
              </span>
              <span className="text-xs font-mono text-emerald-400">
                Combined: @{combinedOdds.toFixed(2)}
              </span>
            </div>

            {selectedMatches.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-slate-800 rounded-lg text-slate-500 text-xs">
                No matches added yet. Click &quot;Add to Slip&quot; on any banker card to calculate combined turnover.
              </div>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedMatches.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs"
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="font-semibold text-white truncate">{m.homeTeam} vs {m.awayTeam}</p>
                      <p className="text-emerald-400 truncate text-[11px]">{m.peculiarMarket.selection}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-mono tabular-nums font-bold text-slate-200">
                        @{m.peculiarMarket.odds.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveFromSlip(m.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove pick"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Stake Input */}
            <div className="pt-2 border-t border-slate-900 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Daily Stake Amount:</span>
                <span className="text-slate-400 font-mono">Available: ${currentBankroll.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <DollarSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="number"
                    min="1"
                    step="5"
                    value={activeStake}
                    onChange={(e) => setActiveStake(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-white font-mono tabular-nums focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <button
                  onClick={() => setActiveStake(currentBankroll)}
                  className="px-2.5 py-1.5 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300"
                >
                  Full Bankroll
                </button>
                <button
                  onClick={() => setActiveStake(Number((currentBankroll * 0.5).toFixed(2)))}
                  className="px-2.5 py-1.5 text-[11px] font-medium bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300"
                >
                  Half-Kelly (50%)
                </button>
              </div>

              {/* Potential Return Summary */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Potential Return</span>
                  <span className="text-sm font-bold text-white font-mono tabular-nums">${potentialReturn}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Est. Model Win Prob</span>
                  <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">{combinedProb}%</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loggedSuccess}
                className="w-full py-2.5 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md disabled:opacity-60"
              >
                {loggedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Logged to Daily Turnover Ledger!</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>Log to Daily Turnover Challenge (+${netProfit} target)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Compound Simulator Settings */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-4 text-xs">
            <span className="text-xs font-bold text-white uppercase tracking-wider block">
              Compound Challenge Simulator
            </span>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Starting Capital ($):</label>
                <input
                  type="number"
                  min="10"
                  step="25"
                  value={startCapital}
                  onChange={(e) => setStartCapital(Math.max(10, parseFloat(e.target.value) || 10))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Average Daily Banker Odds:</label>
                <input
                  type="number"
                  min="1.15"
                  max="2.00"
                  step="0.01"
                  value={dailyOdds}
                  onChange={(e) => setDailyOdds(Math.max(1.15, parseFloat(e.target.value) || 1.2))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Turnover Duration (Days):</label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  step="5"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Math.max(5, parseInt(e.target.value, 10) || 10))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20">
              <span className="text-slate-400 text-[11px] block">Projected Capital after {daysCount} Days:</span>
              <span className="text-xl font-extrabold text-emerald-400 font-mono tabular-nums">
                ${runningBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Total Compounded Return: +{(((runningBalance - startCapital) / startCapital) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Projection Ledger */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Compound Turnover Trajectory Milestones
          </h4>
          <div className="overflow-x-auto border border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
                <tr>
                  <th className="py-2.5 px-3">Day</th>
                  <th className="py-2.5 px-3">Opening ($)</th>
                  <th className="py-2.5 px-3">Daily Gain (@{dailyOdds.toFixed(2)})</th>
                  <th className="py-2.5 px-3">Closing ($)</th>
                  <th className="py-2.5 px-3 text-right">Cumulative ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 font-mono tabular-nums">
                {projectionTable.map((row) => (
                  <tr key={row.day} className="hover:bg-slate-800/40">
                    <td className="py-2 px-3 font-sans font-medium text-slate-300">Day {row.day}</td>
                    <td className="py-2 px-3 text-slate-400">${row.start}</td>
                    <td className="py-2 px-3 text-emerald-400">+${row.profit}</td>
                    <td className="py-2 px-3 font-bold text-white">${row.end}</td>
                    <td className="py-2 px-3 text-right text-emerald-400">+{row.roi}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
