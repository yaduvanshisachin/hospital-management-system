import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';

export default function AdminPatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 10;

  useEffect(() => { fetchPatients(); }, [page]);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getAllPatients(page, pageSize);
      setPatients(response.data || []);
    } catch { setError('Failed to load patients.'); }
    finally { setLoading(false); }
  };

  const fmtBlood = (bg) => bg ? bg.replace('_POSITIVE', '+').replace('_NEGATIVE', '-') : '—';

  return (
    <div className="max-w-[1100px] mx-auto animate-fade-in">
      <div className="flex justify-between items-start mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">🧑‍🤝‍🧑 Patient Records</h1>
          <p className="text-slate-400 text-sm">View and manage all registered patients</p>
        </div>
        <div className="flex flex-col items-center bg-white/[0.04] border border-white/[0.08] px-6 py-3 rounded-xl">
          <span className="text-2xl font-extrabold text-accent-light">{patients.length}</span>
          <span className="text-[0.72rem] text-slate-500 uppercase tracking-wide">This Page</span>
        </div>
      </div>

      {error && <div className="p-3 rounded-lg text-sm font-medium mb-4 bg-red-500/10 text-red-400 border border-red-500/20">{error}</div>}

      {loading ? (
        <div className="p-4 space-y-2">
          {[1,2,3,4,5].map(i => <div key={i} className="h-14 rounded-lg animate-shimmer"></div>)}
        </div>
      ) : patients.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-5xl block mb-4 opacity-50">🧑‍🤝‍🧑</span>
          <h3 className="text-lg text-slate-100 mb-1.5">No Patients Found</h3>
          <p className="text-slate-400 text-sm">No patients registered yet on this page.</p>
        </div>
      ) : (
        <div className="glass overflow-x-auto">
          <table className="w-full border-collapse" id="patients-table">
            <thead>
              <tr>
                {['ID', 'Name', 'Gender', 'Birth Date', 'Blood Group'].map(h => (
                  <th key={h} className="text-left px-5 py-3.5 text-[0.78rem] font-semibold uppercase tracking-wide text-slate-500 border-b border-white/[0.08] bg-white/[0.02]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-white/[0.08] transition-colors" id={`patient-row-${p.id}`}>
                  <td className="px-5 py-3.5 text-sm"><span className="text-accent-light font-semibold">#{p.id}</span></td>
                  <td className="px-5 py-3.5 text-sm text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark text-white flex items-center justify-center font-semibold text-xs shrink-0">{p.name?.charAt(0)?.toUpperCase() || 'P'}</div>
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{p.gender || '—'}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{p.birthDate || '—'}</td>
                  <td className="px-5 py-3.5 text-sm">
                    <span className="inline-block px-2.5 py-0.5 bg-red-500/10 text-red-400 rounded-full text-xs font-semibold border border-red-500/15">{fmtBlood(p.bloodGroup)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="px-4 py-2 bg-transparent text-slate-400 border border-white/[0.08] rounded-lg text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all" id="prev-page-btn">← Previous</button>
        <span className="text-sm text-slate-400 font-medium">Page {page + 1}</span>
        <button onClick={() => setPage(p => p + 1)} disabled={patients.length < pageSize} className="px-4 py-2 bg-transparent text-slate-400 border border-white/[0.08] rounded-lg text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all" id="next-page-btn">Next →</button>
      </div>
    </div>
  );
}
