import { useState, useEffect } from 'react';
import { doctorAPI } from '../services/api';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchAppointments(); }, []);

  const fetchAppointments = async () => {
    try {
      const response = await doctorAPI.getMyAppointments();
      setAppointments(response.data || []);
    } catch { setError('Failed to load appointments.'); }
    finally { setLoading(false); }
  };

  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) : '—';
  const fmtTime = (d) => d ? new Date(d).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';

  return (
    <div className="max-w-[1100px] mx-auto animate-fade-in">
      <div className="flex justify-between items-start mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">📅 My Appointments</h1>
          <p className="text-slate-400 text-sm">View and manage your scheduled appointments</p>
        </div>
        <div className="flex flex-col items-center bg-white/[0.04] border border-white/[0.08] px-6 py-3 rounded-xl">
          <span className="text-2xl font-extrabold text-accent-light">{appointments.length}</span>
          <span className="text-[0.72rem] text-slate-500 uppercase tracking-wide">Total</span>
        </div>
      </div>

      {error && <div className="p-3 rounded-lg text-sm font-medium mb-4 bg-red-500/10 text-red-400 border border-red-500/20">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="h-40 rounded-xl animate-shimmer"></div>)}
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4 opacity-50">📅</span>
          <h3 className="text-lg text-slate-100 mb-1.5">No Appointments</h3>
          <p className="text-slate-400 text-sm">You don't have any appointments scheduled yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map(apt => (
            <div key={apt.id} className="glass p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all" id={`appointment-${apt.id}`}>
              <div className="flex justify-between items-center mb-3.5 pb-3 border-b border-white/[0.08]">
                <span className="text-xs font-semibold text-accent-light">#{apt.id}</span>
                <span className="text-[0.85rem] font-semibold text-slate-100 bg-accent/10 px-2.5 py-1 rounded-md">{fmtTime(apt.appointmentTime)}</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>📅</span><span>{fmtDate(apt.appointmentTime)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="text-xs font-semibold text-slate-500">Reason:</span>
                  <span>{apt.reason || 'General checkup'}</span>
                </div>
                {apt.doctor && (
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span className="text-xs font-semibold text-slate-500">Doctor:</span>
                    <span>Dr. {apt.doctor.name} ({apt.doctor.specialization})</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
