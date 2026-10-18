import React, { useState } from 'react';
import { X, Bell, Volume2, VolumeX, ShieldCheck, Check, Send } from 'lucide-react';
import { AlertSettings } from '../types/sports';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AlertSettings;
  onSaveSettings: (settings: AlertSettings) => void;
  onDispatchTestAlert: () => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
  onDispatchTestAlert,
}) => {
  const [current, setCurrent] = useState<AlertSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(current);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  const handleTestNotification = async () => {
    onDispatchTestAlert();
    setTestSent(true);
    if ('Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (e) {
        // Ignore in restricted iframe
      }
    }
    setTimeout(() => setTestSent(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
          <Bell className="w-4 h-4" />
          <span>Notification & Alert Triggers</span>
        </div>
        <h2 className="text-xl font-extrabold text-white tracking-tight">
          High-Probability Banker Alerts
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Set custom algorithms to notify you instantly when matches with top historical accuracy and sharp consensus are detected.
        </p>

        <div className="space-y-5 text-xs text-slate-300">
          {/* Min Confidence Slider */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white">Minimum Win Probability</span>
              <span className="font-mono text-emerald-400 font-bold text-sm">{current.minConfidence}%+</span>
            </div>
            <input
              type="range"
              min="85"
              max="96"
              step="1"
              value={current.minConfidence}
              onChange={(e) => setCurrent({ ...current, minConfidence: parseInt(e.target.value, 10) })}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>85% (Value Edge)</span>
              <span>90% (Banker)</span>
              <span>95% (Ultra Banker)</span>
            </div>
          </div>

          {/* Odds Limits */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1">Minimum Odds</label>
              <input
                type="number"
                step="0.05"
                min="1.15"
                max="1.50"
                value={current.minOdds}
                onChange={(e) => setCurrent({ ...current, minOdds: parseFloat(e.target.value) || 1.2 })}
                className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-white text-xs"
              />
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <label className="text-[11px] text-slate-400 block mb-1">Maximum Safe Odds</label>
              <input
                type="number"
                step="0.05"
                min="1.30"
                max="2.00"
                value={current.maxOdds}
                onChange={(e) => setCurrent({ ...current, maxOdds: parseFloat(e.target.value) || 1.5 })}
                className="w-full px-2.5 py-1 bg-slate-900 border border-slate-800 rounded font-mono text-white text-xs"
              />
            </div>
          </div>

          {/* Sports Filter Toggles */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
            <span className="font-semibold text-white block">Active Sport Channels</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(
                [
                  ['soccer', 'Soccer'],
                  ['basketball', 'NBA / Euro'],
                  ['tennis', 'Tennis ATP/WTA'],
                  ['hockey', 'NHL Hockey'],
                  ['baseball', 'MLB Baseball'],
                  ['football', 'NFL Football'],
                ] as const
              ).map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800/80 cursor-pointer hover:border-slate-700"
                >
                  <input
                    type="checkbox"
                    checked={current.sports[key]}
                    onChange={(e) =>
                      setCurrent({
                        ...current,
                        sports: { ...current.sports, [key]: e.target.checked },
                      })
                    }
                    className="rounded accent-emerald-500"
                  />
                  <span className="text-[11px] text-slate-200">{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sound & Dispatch Options */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2">
              {current.soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
              <span className="font-medium text-slate-200">Audio Chime on High-Probability Match</span>
            </div>
            <input
              type="checkbox"
              checked={current.soundEnabled}
              onChange={(e) => setCurrent({ ...current, soundEnabled: e.target.checked })}
              className="rounded accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Dispatch Sample Alert Button */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleTestNotification}
              disabled={testSent}
              className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{testSent ? 'Alert Dispatched!' : 'Send Test Notification'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Alert Rules</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
