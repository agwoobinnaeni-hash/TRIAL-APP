import React from 'react';
import { Search, Sliders, ShieldAlert, Award, Activity } from 'lucide-react';
import { SportType } from '../types/sports';

interface ScannerFilterBarProps {
  selectedSport: SportType;
  onSelectSport: (sport: SportType) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  confidenceFilter: 'all' | 'ultra' | 'high';
  onConfidenceFilterChange: (filter: 'all' | 'ultra' | 'high') => void;
  turnoverOnly: boolean;
  onToggleTurnoverOnly: () => void;
  matchCount: number;
}

export const ScannerFilterBar: React.FC<ScannerFilterBarProps> = ({
  selectedSport,
  onSelectSport,
  searchQuery,
  onSearchChange,
  confidenceFilter,
  onConfidenceFilterChange,
  turnoverOnly,
  onToggleTurnoverOnly,
  matchCount,
}) => {
  const sports: Array<{ id: SportType; label: string }> = [
    { id: 'all', label: 'All Sports' },
    { id: 'soccer', label: 'Soccer' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'tennis', label: 'Tennis' },
    { id: 'hockey', label: 'Ice Hockey' },
    { id: 'baseball', label: 'Baseball' },
    { id: 'football', label: 'American Football' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Top Filter Controls: Sports Segmented Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Functional Segmented Button Controls */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {sports.map((s) => {
            const isActive = selectedSport === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSport(s.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search team, league, or market..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-colors"
          />
        </div>
      </div>

      {/* Secondary Bar: Confidence Tiers, Turnover Safe Mode & Count */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-medium">Confidence Filter:</span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => onConfidenceFilterChange('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                confidenceFilter === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All High Prob (88%+)
            </button>
            <button
              onClick={() => onConfidenceFilterChange('ultra')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                confidenceFilter === 'ultra'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Ultra Bankers (92%+)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Turnover Qualified Toggle */}
          <button
            onClick={onToggleTurnoverOnly}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              turnoverOnly
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Turnover Safe (1.20 - 1.55 Odds)</span>
          </button>

          {/* Qualified Matches Count */}
          <div className="text-slate-400 font-medium">
            <span className="text-white font-mono tabular-nums font-semibold">{matchCount}</span>{' '}
            {matchCount === 1 ? 'banker pick' : 'banker picks'} isolated
          </div>
        </div>
      </div>
    </div>
  );
};
