import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, hasRole } = useAuth();

  const stats = [];
  if (hasRole('ADMIN')) {
    stats.push(
      { icon: '🧑‍🤝‍🧑', label: 'Patients', desc: 'Manage all patients', link: '/admin/patients', color: '#6366f1' },
      { icon: '➕', label: 'Onboard Doctor', desc: 'Add new doctors', link: '/admin/onboard-doctor', color: '#10b981' },
      { icon: '👨‍⚕️', label: 'All Doctors', desc: 'View doctor directory', link: '/doctors', color: '#f59e0b' },
    );
  }
  if (hasRole('DOCTOR')) {
    stats.push(
      { icon: '📅', label: 'My Appointments', desc: 'View your schedule', link: '/doctor/appointments', color: '#6366f1' },
      { icon: '👨‍⚕️', label: 'All Doctors', desc: 'View colleagues', link: '/doctors', color: '#10b981' },
    );
  }
  if (hasRole('PATIENT')) {
    stats.push(
      { icon: '📝', label: 'Book Appointment', desc: 'Schedule a visit', link: '/patient/book-appointment', color: '#6366f1' },
      { icon: '👨‍⚕️', label: 'Find a Doctor', desc: 'Browse specialists', link: '/doctors', color: '#10b981' },
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 mb-1">
            Welcome back, <span className="text-gradient">{user?.username || 'User'}</span>
          </h1>
          <p className="text-slate-400 text-sm">
            {hasRole('ADMIN') && 'Manage your hospital operations from one dashboard'}
            {hasRole('DOCTOR') && 'View your appointments and manage your schedule'}
            {hasRole('PATIENT') && 'Book appointments and manage your health'}
          </p>
        </div>
        <div className="flex gap-2">
          {user?.roles?.map((role, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-xs font-semibold bg-accent/[0.12] text-accent-light border border-accent/20">{role.replace('ROLE_', '')}</span>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <a
            href={stat.link}
            key={index}
            className="flex items-center gap-3.5 p-5 bg-white/[0.04] border border-white/[0.08] rounded-xl transition-all hover:border-accent-glow hover:bg-white/[0.08] hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden group"
            id={`stat-card-${index}`}
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-sm" style={{ background: stat.color }}></div>
            <span className="text-3xl shrink-0">{stat.icon}</span>
            <div>
              <h3 className="text-[0.95rem] font-semibold text-slate-100">{stat.label}</h3>
              <p className="text-xs text-slate-400">{stat.desc}</p>
            </div>
            <span className="ml-auto text-lg text-slate-500 group-hover:text-accent-light group-hover:translate-x-1 transition-all">→</span>
          </a>
        ))}
      </div>

      {/* Welcome Card */}
      <div className="glass p-7">
        <h2 className="text-lg font-semibold text-slate-100 mb-2.5">🏥 Hospital Management System</h2>
        <p className="text-slate-400 text-sm leading-relaxed mb-5">
          This platform provides a comprehensive solution for managing hospital operations.
          Use the sidebar navigation to access different features based on your role.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: '📊', text: 'Real-time Data' },
            { icon: '🔒', text: 'Secure Access' },
            { icon: '⚡', text: 'Fast & Reliable' },
            { icon: '📱', text: 'Responsive' },
          ].map(f => (
            <div key={f.text} className="flex flex-col items-center gap-1.5 p-3.5 bg-white/[0.04] rounded-lg border border-white/[0.08] text-xs text-slate-400">
              <span className="text-xl">{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
