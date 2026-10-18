import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Check, Plus, AlertCircle, BarChart3, Clock, MapPin } from 'lucide-react';
import { Match } from '../types/sports';

interface MatchCardProps {
  match: Match;
  onOpenAnalysis: (match: Match) => void;
  onAddToSlip: (match: Match) => void;
  isInSlip: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  onOpenAnalysis,
  onAddToSlip,
  isInSlip,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const p = match.peculiarMarket;

  const sportDisplayNames: Record<string, string> = {
    soccer: 'Soccer',
    basketball: 'Basketball',
    tennis: 'Tennis',
    hockey: 'Ice Hockey',
    baseball: 'Baseball',
    football: 'Football',
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800/90 hover:border-slate-700/90 rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md">
      {/* Card Header & Unboxed Metadata */}
      <div className="p-5 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">{sportDisplayNames[match.sport] || match.sport}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{match.league}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-slate-400" />
              {match.scheduledTime}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-emerald-400 font-semibold">{match.confidenceTier}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono tabular-nums">+{p.edgePercent}% EV Edge</span>
          </div>
        </div>

        {/* Teams Matchup Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {match.homeTeam} <span className="text-slate-500 font-normal">vs</span> {match.awayTeam}
            </h3>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{match.venue}</span>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block">Banker Odds</span>
            <span className="text-xl font-extrabold text-emerald-400 font-mono tabular-nums">
              @{p.odds.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Peculiar Market Specification (The Core Focus of the App) */}
      <div className="mx-5 my-2 p-3.5 rounded-lg bg-slate-950 border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Tailored Peculiar Market ({p.marketName})
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {p.selection}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs sm:text-right">
            <div>
              <span className="text-[11px] text-slate-400 block">Model Win Prob</span>
              <span className="text-sm font-bold text-emerald-400 font-mono tabular-nums">
                {p.modelProbability}%
              </span>
            </div>
            <div className="border-l border-slate-800 pl-3">
              <span className="text-[11px] text-slate-400 block">Implied Odds</span>
              <span className="text-sm font-medium text-slate-300 font-mono tabular-nums">
                {p.impliedProbability}%
              </span>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs text-slate-300 leading-relaxed border-t border-slate-900 pt-2">
          <span className="text-emerald-400 font-medium">Why this option:</span> {p.rationale}
        </p>
      </div>

      {/* Key Metric Indicators Strip */}
      <div className="px-5 py-3 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-t border-slate-800/60 bg-slate-950/30">
        <div>
          <span className="text-slate-400 block text-[11px]">Historical Accuracy</span>
          <span className="font-semibold text-slate-200 font-mono tabular-nums">
            {p.historicalAccuracy.hits} of {p.historicalAccuracy.sampleSize} ({p.historicalAccuracy.rate}%)
          </span>
          <span className="block text-[11px] text-slate-500 truncate" title={p.historicalAccuracy.description}>
            {p.historicalAccuracy.description}
          </span>
        </div>

        <div>
          <span className="text-slate-400 block text-[11px]">Expert & Sharp Consensus</span>
          <span className="font-semibold text-emerald-400 font-mono tabular-nums">
            {p.expertConsensus.score}% Agreement
          </span>
          <span className="block text-[11px] text-slate-500 truncate" title={p.expertConsensus.sharpBooksAgreement}>
            {p.expertConsensus.sharpBooksAgreement}
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <span className="text-slate-400 block text-[11px]">Tactical Mismatch</span>
          <span className="font-medium text-slate-300 text-[11px] line-clamp-2" title={p.tacticalMismatch}>
            {p.tacticalMismatch}
          </span>
        </div>
      </div>

      {/* Expandable Head-to-Head & Form Guide Section */}
      {showDetails && (
        <div className="px-5 py-4 border-t border-slate-800 bg-slate-950/70 space-y-4 text-xs">
          {/* Key Stat Badges */}
          <div>
            <h4 className="font-semibold text-slate-300 mb-2">Peculiar Match Factors & Indicators</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {p.keyStats.map((st, i) => (
                <div key={i} className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block truncate">{st.label}</span>
                  <span className="text-xs font-bold text-slate-200 font-mono tabular-nums">{st.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Head-to-Head Record */}
          <div>
            <h4 className="font-semibold text-slate-300 mb-2">Recent Head-to-Head Encounters</h4>
            <div className="space-y-1.5">
              {match.h2h.map((rec, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-900/70 border border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono">{rec.date}</span>
                    <span className="text-slate-300">{rec.home} vs {rec.away}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono tabular-nums font-bold text-white">{rec.score}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        rec.marketOutcome === 'hit'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {rec.marketOutcome === 'hit' ? 'MARKET HIT' : 'MISSED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Guide */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-slate-400 mb-1.5">{match.homeTeam} Form (Last 5)</h5>
              <div className="flex items-center gap-1.5">
                {match.formGuide.home.map((f, i) => (
                  <span
                    key={i}
                    title={`${f.opponent}: ${f.score} (${f.result}) - Market: ${f.marketOutcome}`}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] ${
                      f.result === 'W'
                        ? 'bg-emerald-600 text-white'
                        : f.result === 'D'
                        ? 'bg-amber-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {f.result}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-medium text-slate-400 mb-1.5">{match.awayTeam} Form (Last 5)</h5>
              <div className="flex items-center gap-1.5">
                {match.formGuide.away.map((f, i) => (
                  <span
                    key={i}
                    title={`${f.opponent}: ${f.score} (${f.result}) - Market: ${f.marketOutcome}`}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[11px] ${
                      f.result === 'W'
                        ? 'bg-emerald-600 text-white'
                        : f.result === 'D'
                        ? 'bg-amber-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {f.result}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Action Footer */}
      <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between gap-3 bg-slate-900/40">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
        >
          <span>{showDetails ? 'Hide Historical Matrix' : 'View H2H & Form Matrix'}</span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenAnalysis(match)}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI Situational Analysis</span>
          </button>

          <button
            onClick={() => onAddToSlip(match)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              isInSlip
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-sm'
            }`}
          >
            {isInSlip ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>In Slip</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Slip</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
