import React, { useEffect, useState } from 'react';
import { X, Sparkles, ShieldCheck, AlertTriangle, TrendingUp, Cpu, BarChart2, CheckCircle2 } from 'lucide-react';
import { Match, DeepAnalysisResult } from '../types/sports';

interface DeepAnalysisModalProps {
  match: Match | null;
  onClose: () => void;
  onAddToSlip: (match: Match) => void;
  isInSlip: boolean;
}

export const DeepAnalysisModal: React.FC<DeepAnalysisModalProps> = ({
  match,
  onClose,
  onAddToSlip,
  isInSlip,
}) => {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<DeepAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!match) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch('/api/ai/deep-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ match }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && data.data) {
          setAnalysis(data.data);
        } else {
          setError('Failed to load deep situational analysis.');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err.message || 'Network error occurred during analysis.');
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [match]);

  if (!match) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-bold tracking-wider uppercase mb-1">
          <Sparkles className="w-4 h-4" />
          <span>Algorithmic Deep Situational Scan</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          {match.homeTeam} vs {match.awayTeam}
        </h2>
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1 mb-6">
          <span>{match.league}</span>
          <span aria-hidden="true">·</span>
          <span>{match.scheduledTime}</span>
          <span aria-hidden="true">·</span>
          <span>{match.venue}</span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-16 text-center space-y-4">
            <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-medium text-slate-300">
              Running Monte Carlo simulations & synthesizing sharp syndicate consensus...
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Evaluating tailored peculiar market edge against {match.awayTeam} defensive tracking data.
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-900/60 text-xs text-rose-300 mb-4">
            {error}
          </div>
        )}

        {/* Analysis Content */}
        {!loading && analysis && (
          <div className="space-y-6 text-xs text-slate-300">
            {/* Executive Verdict Banner */}
            <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  EXECUTIVE MODEL VERDICT
                </span>
                <span className="text-sm font-extrabold text-emerald-400 font-mono tabular-nums">
                  {analysis.confidenceScore}% Confidence
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {analysis.executiveSummary}
              </p>
            </div>

            {/* Why This Peculiar Market */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-emerald-400" />
                Peculiar Tailored Market Mechanics
              </h4>
              <p className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 leading-relaxed">
                {analysis.peculiarEdgeBreakdown}
              </p>
            </div>

            {/* Historical Precedent */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                Historical Accuracy & Regression Analysis
              </h4>
              <p className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 leading-relaxed">
                {analysis.historicalPrecedent}
              </p>
            </div>

            {/* Syndicate & Model Consensus */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Consensus & Bookmaker Depth
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Syndicate Vote</span>
                  <span className="text-xs text-slate-200 mt-1 block">{analysis.consensusBreakdown.syndicateVote}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Sharp Books Flow</span>
                  <span className="text-xs text-slate-200 mt-1 block">{analysis.consensusBreakdown.sharpBooksShift}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Monte Carlo Result</span>
                  <span className="text-xs text-emerald-400 font-mono mt-1 block">{analysis.consensusBreakdown.algorithmicSimulations}</span>
                </div>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Situational Risk Vectors to Monitor
              </h4>
              <ul className="space-y-1.5 p-3 rounded-lg bg-amber-950/20 border border-amber-900/40">
                {analysis.riskFactors.map((rf, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-amber-400 font-bold">·</span>
                    <span>{rf}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bankroll Management & Turnover Advice */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                Daily Turnover Portfolio Allocation
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-slate-400 block text-[11px]">Turnover Suitability</span>
                  <span className="font-semibold text-emerald-400">{analysis.bankrollAdvice.turnoverSuitability}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Kelly Stake Allocation</span>
                  <span className="font-semibold text-slate-200">{analysis.bankrollAdvice.recommendedKellyFraction}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Fair Value Threshold</span>
                  <span className="font-bold text-emerald-400 font-mono tabular-nums">@{analysis.bankrollAdvice.optimalEntryOdds.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onAddToSlip(match);
                  onClose();
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isInSlip
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isInSlip ? 'Already in Slip' : 'Include in Today’s Turnover Slip'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
