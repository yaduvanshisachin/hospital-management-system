import { useState, useEffect } from 'react';
import { publicAPI, patientAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function BookAppointmentPage() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({ doctorId: '', appointmentTime: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [fetchingDoctors, setFetchingDoctors] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => { fetchDoctors(); }, []);

  const fetchDoctors = async () => {
    try {
      const response = await publicAPI.getAllDoctors();
      setDoctors(response.data || []);
    } catch { setError('Failed to load doctors list.'); }
    finally { setFetchingDoctors(false); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      await patientAPI.createAppointment({
        doctorId: Number(form.doctorId),
        patientId: user?.userId,
        appointmentTime: form.appointmentTime + ':00',
        reason: form.reason,
      });
      setSuccess('Appointment booked successfully!');
      setForm({ doctorId: '', appointmentTime: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Failed to book appointment.');
    } finally { setLoading(false); }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const inputCls = "w-full px-3.5 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-slate-100 text-sm outline-none transition-all focus:border-accent/50 focus:bg-white/10 focus:ring-2 focus:ring-accent-glow placeholder:text-slate-500";

  return (
    <div className="max-w-[1100px] mx-auto animate-fade-in">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-100 mb-1">📝 Book Appointment</h1>
        <p className="text-slate-400 text-sm">Schedule a visit with one of our specialists</p>
      </div>

      <div className="glass p-8 max-w-[550px]">
        {error && <div className="p-3 rounded-lg text-sm font-medium mb-4 bg-red-500/10 text-red-400 border border-red-500/20" id="book-error">{error}</div>}
        {success && <div className="p-3 rounded-lg text-sm font-medium mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" id="book-success">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="doctorId" className="text-xs font-medium text-slate-400 uppercase tracking-wide">Select Doctor</label>
            {fetchingDoctors ? (
              <div className="h-[42px] rounded-lg animate-shimmer"></div>
            ) : (
              <select id="doctorId" name="doctorId" value={form.doctorId} onChange={handleChange} required className={inputCls + " pr-9 cursor-pointer"}>
                <option value="">Choose a doctor</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>Dr. {doc.name} — {doc.specialization || 'General'}</option>
                ))}
              </select>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="appointmentTime" className="text-xs font-medium text-slate-400 uppercase tracking-wide">Preferred Date & Time</label>
            <input id="appointmentTime" name="appointmentTime" type="datetime-local" value={form.appointmentTime} onChange={handleChange} min={getMinDateTime()} required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reason" className="text-xs font-medium text-slate-400 uppercase tracking-wide">Reason for Visit</label>
            <textarea id="reason" name="reason" placeholder="Describe your symptoms or reason for the visit..." value={form.reason} onChange={handleChange} rows={4} required className={inputCls + " resize-y min-h-[80px]"} />
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 px-5 bg-gradient-to-br from-accent to-accent-dark text-white rounded-lg text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(99,102,241,0.4)] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center" id="book-btn">
            {loading ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : '📅 Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
}
