import { useState } from 'react';
import { adminAPI } from '../services/api';

export default function OnboardDoctorPage() {
  const [form, setForm] = useState({ userId: '', name: '', specialization: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const specializations = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Ophthalmology', 'Psychiatry', 'General Medicine', 'Surgery', 'Radiology', 'Oncology', 'Urology'];
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const response = await adminAPI.onboardDoctor({ ...form, userId: Number(form.userId) });
      setSuccess(`Dr. ${response.data.name} has been successfully onboarded!`);
      setForm({ userId: '', name: '', specialization: '' });
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || 'Failed to onboard doctor.');
    } finally { setLoading(false); }
  };

  const inputCls = "w-full px-3.5 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-slate-100 text-sm outline-none transition-all focus:border-accent/50 focus:bg-white/10 focus:ring-2 focus:ring-accent-glow placeholder:text-slate-500";

  return (
    <div className="max-w-[1100px] mx-auto animate-fade-in">
      <div className="mb-7">
        <h1 className="text-2xl font-bold text-slate-100 mb-1">➕ Onboard New Doctor</h1>
        <p className="text-slate-400 text-sm">Register a new doctor by linking an existing user account</p>
      </div>

      <div className="glass p-8 max-w-[550px]">
        {error && <div className="p-3 rounded-lg text-sm font-medium mb-4 bg-red-500/10 text-red-400 border border-red-500/20" id="onboard-error">{error}</div>}
        {success && <div className="p-3 rounded-lg text-sm font-medium mb-4 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" id="onboard-success">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="userId" className="text-xs font-medium text-slate-400 uppercase tracking-wide">User ID</label>
            <input id="userId" name="userId" type="number" placeholder="Enter the user's ID" value={form.userId} onChange={handleChange} required className={inputCls} />
            <span className="text-[0.78rem] text-slate-500">The existing user account ID to convert to a doctor</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="doctorName" className="text-xs font-medium text-slate-400 uppercase tracking-wide">Doctor Name</label>
            <input id="doctorName" name="name" type="text" placeholder="Enter doctor's full name" value={form.name} onChange={handleChange} required className={inputCls} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="specialization" className="text-xs font-medium text-slate-400 uppercase tracking-wide">Specialization</label>
            <select id="specialization" name="specialization" value={form.specialization} onChange={handleChange} required className={inputCls + " pr-9 cursor-pointer"}>
              <option value="">Select Specialization</option>
              {specializations.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <button type="submit" disabled={loading} className="w-full py-2.5 px-5 bg-gradient-to-br from-accent to-accent-dark text-white rounded-lg text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(99,102,241,0.4)] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center" id="onboard-btn">
            {loading ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : '🩺 Onboard Doctor'}
          </button>
        </form>
      </div>
    </div>
  );
}
