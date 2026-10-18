import React from 'react';
import { DollarSign, CheckCircle, TrendingUp, AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { BankrollDayRecord } from '../types/sports';

interface BankrollLedgerViewProps {
  history: BankrollDayRecord[];
  startingBankroll: number;
  currentBankroll: number;
  currentStreak: number;
  totalDays: number;
  onSettleDay: (dayIndex: number, outcome: 'won' | 'lost') => void;
  onResetChallenge: () => void;
  onOpenCalculator: () => void;
}

export const BankrollLedgerView: React.FC<BankrollLedgerViewProps> = ({
  history,
  startingBankroll,
  currentBankroll,
  currentStreak,
  totalDays,
  onSettleDay,
  onResetChallenge,
  onOpenCalculator,
}) => {
  const netProfit = currentBankroll - startingBankroll;
  const roi = ((netProfit / startingBankroll) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Ledger Overview KPI Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400">Starting Seed Capital</p>
          <p className="text-xl font-extrabold text-slate-200 font-mono tabular-nums mt-1">
            ${startingBankroll.toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Base capital at Day 1</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400">Current Capital Balance</p>
          <p className="text-xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1">
            ${currentBankroll.toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-400/80 mt-1">+{roi}% Compound Return</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400">Turnover Win Streak</p>
          <p className="text-xl font-extrabold text-white font-mono tabular-nums mt-1">
            {currentStreak} Days
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Goal: {totalDays} Consecutive Days</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <p className="text-xs text-slate-400">Cumulative Net Profit</p>
          <p className="text-xl font-extrabold text-emerald-400 font-mono tabular-nums mt-1">
            +${netProfit.toFixed(2)}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">Zero redraws / Pure compound</p>
        </div>
      </div>

      {/* Main Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Daily Bankroll Turnover History
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified daily ledger records for the compound rollover challenge.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCalculator}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Project Trajectory</span>
            </button>
            <button
              onClick={onResetChallenge}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-rose-400 bg-slate-950 hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors flex items-center gap-1"
              title="Reset challenge to Day 1 initial seed"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Challenge</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 text-slate-400 border-b border-slate-800 text-[11px]">
              <tr>
                <th className="py-3 px-4">Day</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Peculiar Banker Pick Selection</th>
                <th className="py-3 px-4 text-right">Odds</th>
                <th className="py-3 px-4 text-right">Stake ($)</th>
                <th className="py-3 px-4 text-right">Net Profit</th>
                <th className="py-3 px-4 text-right">Closing ($)</th>
                <th className="py-3 px-4 text-center">Status / Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono tabular-nums">
              {history.map((record, index) => {
                const isPending = record.status === 'pending';
                const isWon = record.status === 'won';

                return (
                  <tr key={record.day} className={`hover:bg-slate-800/30 ${isPending ? 'bg-emerald-950/10' : ''}`}>
                    <td className="py-3 px-4 font-sans font-bold text-white">
                      Day {record.day}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-sans text-[11px]">
                      {record.date}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-200 max-w-xs truncate" title={record.matchSummary}>
                      {record.matchSummary}
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-semibold">
                      @{record.targetOdds.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-300">
                      ${record.stake.toFixed(2)}
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${isWon ? 'text-emerald-400' : isPending ? 'text-slate-400' : 'text-rose-400'}`}>
                      {isWon ? `+$${record.profit.toFixed(2)}` : isPending ? `+$${record.profit.toFixed(2)} (est)` : `-$${record.stake.toFixed(2)}`}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-white">
                      ${record.closingBalance.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center font-sans">
                      {isPending ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onSettleDay(index, 'won')}
                            className="px-2 py-1 text-[11px] font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded transition-colors"
                            title="Settle match as won"
                          >
                            Settle WON
                          </button>
                          <button
                            onClick={() => onSettleDay(index, 'lost')}
                            className="px-2 py-1 text-[11px] font-medium bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800/80 rounded transition-colors"
                            title="Settle match as lost"
                          >
                            LOST
                          </button>
                        </div>
                      ) : isWon ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          WON
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400">
                          <AlertCircle className="w-3.5 h-3.5" />
                          LOST
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
