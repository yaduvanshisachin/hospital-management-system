import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r border-white/[0.08] flex flex-col fixed top-0 left-0 bottom-0 z-50 animate-slide-left">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🏥</span>
            <span className="text-xl font-extrabold text-gradient">MediCare</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 overflow-y-auto flex flex-col gap-0.5">
          <NavLink to="/dashboard" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-slate-400 text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 transition-all" id="nav-dashboard">
            <span className="text-lg w-6 text-center">📊</span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/doctors" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-slate-400 text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 transition-all" id="nav-doctors">
            <span className="text-lg w-6 text-center">👨‍⚕️</span>
            <span>Doctors</span>
          </NavLink>

          {hasRole('ADMIN') && (
            <>
              <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500 px-3 pt-4 pb-1">Admin</div>
              <NavLink to="/admin/patients" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-slate-400 text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 transition-all" id="nav-patients">
                <span className="text-lg w-6 text-center">🧑‍🤝‍🧑</span>
                <span>Patients</span>
              </NavLink>
              <NavLink to="/admin/onboard-doctor" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-slate-400 text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 transition-all" id="nav-onboard">
                <span className="text-lg w-6 text-center">➕</span>
                <span>Onboard Doctor</span>
              </NavLink>
            </>
          )}

          {hasRole('DOCTOR') && (
            <>
              <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500 px-3 pt-4 pb-1">Doctor</div>
              <NavLink to="/doctor/appointments" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-slate-400 text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 transition-all" id="nav-doc-appointments">
                <span className="text-lg w-6 text-center">📅</span>
                <span>My Appointments</span>
              </NavLink>
            </>
          )}

          {hasRole('PATIENT') && (
            <>
              <div className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-500 px-3 pt-4 pb-1">Patient</div>
              <NavLink to="/patient/book-appointment" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-slate-400 text-sm font-medium hover:bg-white/[0.08] hover:text-slate-100 transition-all" id="nav-book">
                <span className="text-lg w-6 text-center">📝</span>
                <span>Book Appointment</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent-dark text-white flex items-center justify-center font-bold text-sm shrink-0">
              {user?.username?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[0.82rem] font-semibold text-slate-100 truncate">{user?.username || 'User'}</span>
              <span className="text-[0.72rem] text-slate-500 uppercase tracking-wide">
                {user?.roles?.map(r => r.replace('ROLE_', '')).join(', ') || 'User'}
              </span>
            </div>
          </div>
          <button
            className="w-full py-2 px-3 bg-red-500/[0.08] border border-red-500/[0.15] text-red-400 rounded-lg text-[0.82rem] font-medium cursor-pointer hover:bg-red-500/[0.15] hover:border-red-500/30 transition-all"
            onClick={handleLogout}
            id="logout-btn"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen bg-bg-primary">
        <Outlet />
      </main>
    </div>
  );
}
