import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  Check,
  ShieldCheck,
  Clock,
} from 'lucide-react';

export const NotificationsModule: React.FC = () => {
  const { notifications, markNotificationAsRead, clearAllNotifications, setActiveTab } = useApp();
  const [pushStatus, setPushStatus] = useState<string>('default');

  const requestBrowserPermission = async () => {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPushStatus(permission);
        if (permission === 'granted') {
          new Notification('NAYANA AI PLACEMENT OS', {
            body: 'Browser push notifications successfully connected!',
            icon: '/icon-192.png',
          });
        }
      } catch {
        setPushStatus('denied');
      }
    } else {
      setPushStatus('unsupported');
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#15121A] border border-[#30283A]">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-[#E6C7E6]" />
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Notifications & Reminders</h1>
          </div>
          <p className="text-xs text-[#B9B0BD] mt-1">
            Real-time alerts for college placement deadlines, Superset registrations, and daily study reminders.
          </p>
        </div>

        <button
          onClick={clearAllNotifications}
          className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-[#1D1824] text-[#B9B0BD] hover:text-[#F5F1F5] border border-[#30283A]"
        >
          Mark All as Read
        </button>
      </div>

      {/* Browser Push Permission Card */}
      <div className="p-5 rounded-2xl bg-[#1D1824] border border-[#30283A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-[#F5F1F5]">Web Push Notifications (FCM Architecture)</h3>
          <p className="text-xs text-[#B9B0BD] mt-0.5">
            Receive morning study plans and deadline alerts even when the tab is closed.
          </p>
          <span className="text-[10px] text-purple-300 font-semibold mt-1 inline-block">
            Status: {pushStatus === 'granted' ? 'Active & Enabled ✅' : 'Permission Not Yet Granted'}
          </span>
        </div>

        <button
          onClick={requestBrowserPermission}
          className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#663399] text-white hover:bg-[#663399]/90 shadow-md shadow-[#663399]/30 shrink-0"
        >
          {pushStatus === 'granted' ? 'Notifications Enabled' : 'Enable Push Notifications'}
        </button>
      </div>

      {/* Notification List */}
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            onClick={() => {
              markNotificationAsRead(notif.id);
              if (notif.linkTab) setActiveTab(notif.linkTab);
            }}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              notif.read
                ? 'bg-[#15121A] border-[#30283A]/70 opacity-80'
                : 'bg-[#1D1824] border-[#663399]/60 shadow-md shadow-[#663399]/10'
            }`}
          >
            <div className="p-2 rounded-lg bg-[#2E1A47] text-[#E6C7E6] shrink-0 mt-0.5">
              {notif.type === 'deadline' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
              {notif.type === 'ai' && <Sparkles className="w-4 h-4 text-purple-400" />}
              {notif.type === 'drive' && <Calendar className="w-4 h-4 text-indigo-400" />}
              {notif.type === 'task' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-[#F5F1F5]">{notif.title}</h4>
                <span className="text-[10px] text-[#82778A]">{notif.timestamp}</span>
              </div>
              <p className="text-xs text-[#B9B0BD]">{notif.message}</p>
            </div>

            {!notif.read && (
              <span className="w-2 h-2 rounded-full bg-[#663399] mt-2 shrink-0 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
