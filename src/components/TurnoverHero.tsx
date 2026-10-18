import React from 'react';
import { Target, Zap, TrendingUp, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { Match } from '../types/sports';

interface TurnoverHeroProps {
  featuredMatch: Match;
  currentBankroll: number;
  startingBankroll: number;
  currentStreak: number;
  totalDays: number;
  onOpenAnalysis: (match: Match) => void;
  onAddToSlip: (match: Match) => void;
  isInSlip: boolean;
}

export const TurnoverHero: React.FC<TurnoverHeroProps> = ({
  featuredMatch,
  currentBankroll,
  startingBankroll,
  currentStreak,
  totalDays,
  onOpenAnalysis,
  onAddToSlip,
  isInSlip,
}) => {
  const roiPercent = (((currentBankroll - startingBankroll) / startingBankroll) * 100).toFixed(1);
  const targetDayOdds = featuredMatch.peculiarMarket.odds;
  const projectedTodayReturn = (currentBankroll * targetDayOdds).toFixed(2);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl mb-8">
      {/* Background Image Scrim */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img
          src="/src/assets/images/sports_stadium_dusk_1792307111687.jpg"
          alt="Stadium floodlights pitch"
          className="w-full h-full object-cover opacity-20 filter saturate-150"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
      </div>

      <div className="relative z-10 p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Thesis & Compound Ladder Status */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                <Target className="w-3.5 h-3.5" />
                DAILY TURNOVER ALGORITHM
              </span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-400 font-mono tabular-nums">DAY {currentStreak + 1} OF {totalDays}</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-400">CONSECUTIVE STREAK: {currentStreak} DAYS</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance leading-tight">
                Data-Driven Daily Turnover for Consistent Compound Growth
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Scanning 140+ fixtures daily across 6 major sports. Our algorithm isolates high-probability banker markets tailored to team tactical profiles, targeting steady 1.25–1.40 odds for compounded portfolio turnover.
              </p>
            </div>

            {/* Compound Progress Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800/90">
              <div>
                <p className="text-xs text-slate-400">Initial Bankroll</p>
                <p className="text-lg font-bold text-slate-200 font-mono tabular-nums">${startingBankroll.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Current Capital</p>
                <p className="text-lg font-bold text-emerald-400 font-mono tabular-nums">${currentBankroll.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Turnover ROI</p>
                <p className="text-lg font-bold text-emerald-400 font-mono tabular-nums">+{roiPercent}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Today’s Target</p>
                <p className="text-lg font-bold text-white font-mono tabular-nums">${projectedTodayReturn}</p>
              </div>
            </div>

            {/* Turnover Progression Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Compound Ladder Progress</span>
                <span className="font-mono tabular-nums font-medium text-slate-200">{Math.round(((currentStreak) / totalDays) * 100)}% Complete</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500"
                  style={{ width: `${((currentStreak) / totalDays) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Today's #1 Banker Pick Highlight */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-xl bg-slate-950/90 border border-emerald-500/30 shadow-2xl relative">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                  <span>TODAY’S PRIME BANKER PICK</span>
                </div>
                <span className="text-xs font-mono text-slate-400">{featuredMatch.league}</span>
              </div>

              {/* Match Header */}
              <div className="mb-4">
                <div className="text-base sm:text-lg font-bold text-white flex items-center justify-between">
                  <span>{featuredMatch.homeTeam} vs {featuredMatch.awayTeam}</span>
                  <span className="text-xs text-slate-400 font-normal">{featuredMatch.scheduledTime}</span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{featuredMatch.venue}</p>
              </div>

              {/* Tailored Market Box */}
              <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-300">Tailored Option:</span>
                  <span className="text-base font-bold text-emerald-400 font-mono tabular-nums">
                    @{featuredMatch.peculiarMarket.odds.toFixed(2)} Odds
                  </span>
                </div>
                <p className="text-sm font-semibold text-white mt-1">
                  {featuredMatch.peculiarMarket.selection}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {featuredMatch.peculiarMarket.historicalAccuracy.description}
                </p>
              </div>

              {/* Probabilities & Edge */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800 text-center mb-4">
                <div>
                  <p className="text-[11px] text-slate-400">Model Probability</p>
                  <p className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                    {featuredMatch.peculiarMarket.modelProbability}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Historical Accuracy</p>
                  <p className="text-sm font-bold text-slate-200 font-mono tabular-nums">
                    {featuredMatch.peculiarMarket.historicalAccuracy.hits}/{featuredMatch.peculiarMarket.historicalAccuracy.sampleSize}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-slate-400">Consensus Edge</p>
                  <p className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                    +{featuredMatch.peculiarMarket.edgePercent}% EV
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onAddToSlip(featuredMatch)}
                  className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
                    isInSlip
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isInSlip ? 'Added to Slip' : 'Add to Turnover Slip'}</span>
                </button>

                <button
                  onClick={() => onOpenAnalysis(featuredMatch)}
                  className="py-2 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap"
                >
                  <span>AI Breakdown</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
