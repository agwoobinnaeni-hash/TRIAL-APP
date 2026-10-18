import React from 'react';
import { X, Bell, CheckCheck, Trash2, ArrowUpRight, Zap, Target, TrendingUp } from 'lucide-react';
import { NotificationItem, Match } from '../types/sports';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
  onClearAll: () => void;
  onSelectMatch: (matchId: string) => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onClearAll,
  onSelectMatch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <Bell className="w-4 h-4" />
          <span>Notification Stream</span>
        </div>
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          High-Probability Banker Alerts
        </h2>

        {/* Action Header */}
        <div className="flex items-center justify-between py-2 border-b border-slate-800 text-xs mt-2 mb-4">
          <span className="text-slate-400">
            {notifications.filter((n) => !n.read).length} unread notifications
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onMarkAllRead}
              className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClearAll}
              className="text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No active alerts. The scanner runs automatically in the background when matches meet your probability threshold.
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  onSelectMatch(n.matchId);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  n.read
                    ? 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    : 'bg-slate-950 border-emerald-500/40 hover:border-emerald-500 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-white flex items-center gap-1">
                        {n.title}
                      </span>
                      {!n.read && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-emerald-400 font-mono tabular-nums block">
                      @{n.odds.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono block">
                      {n.timestamp}
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-900/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono tabular-nums text-emerald-400 font-medium">
                    {n.confidence}% Model Confidence
                  </span>
                  <span className="flex items-center gap-1 text-slate-300 hover:text-white">
                    <span>Inspect Match</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
