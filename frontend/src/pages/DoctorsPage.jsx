import { useState, useEffect } from 'react';
import { publicAPI } from '../services/api';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => { fetchDoctors(); }, []);

  const fetchDoctors = async () => {
    try {
      const response = await publicAPI.getAllDoctors();
      setDoctors(response.data || []);
    } catch { setError('Failed to load doctors. Please try again.'); }
    finally { setLoading(false); }
  };

  const specColors = { Cardiology: '#ef4444', Neurology: '#8b5cf6', Orthopedics: '#10b981', Pediatrics: '#f59e0b', Dermatology: '#ec4899', General: '#6366f1' };
  const getColor = (s) => specColors[s] || '#6366f1';

  return (
    <div className="max-w-[1100px] mx-auto animate-fade-in">
      <div className="flex justify-between items-start mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">👨‍⚕️ Our Doctors</h1>
          <p className="text-slate-400 text-sm">Meet our expert medical professionals</p>
        </div>
        <div className="flex flex-col items-center bg-white/[0.04] border border-white/[0.08] px-6 py-3 rounded-xl">
          <span className="text-2xl font-extrabold text-accent-light">{doctors.length}</span>
          <span className="text-[0.72rem] text-slate-500 uppercase tracking-wide">Total Doctors</span>
        </div>
      </div>

      {error && <div className="p-3 rounded-lg text-sm font-medium mb-4 bg-red-500/10 text-red-400 border border-red-500/20">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-36 rounded-xl animate-shimmer"></div>)}
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4 opacity-50">👨‍⚕️</span>
          <h3 className="text-lg text-slate-100 mb-1.5">No Doctors Found</h3>
          <p className="text-slate-400 text-sm">No doctors have been onboarded yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map(doctor => (
            <div key={doctor.id} className="glass p-6 flex flex-col items-center text-center gap-3.5 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg transition-all" id={`doctor-${doctor.id}`}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ background: `linear-gradient(135deg, ${getColor(doctor.specialization)}, ${getColor(doctor.specialization)}88)` }}>
                {doctor.name?.charAt(0)?.toUpperCase() || 'D'}
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-100 mb-1">{doctor.name}</h3>
                <span className="text-xs font-semibold" style={{ color: getColor(doctor.specialization) }}>{doctor.specialization || 'General'}</span>
                {doctor.email && <p className="text-xs text-slate-500 mt-1">📧 {doctor.email}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
