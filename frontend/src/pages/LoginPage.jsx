import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[1000px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/[0.08] min-h-[580px]">
        {/* Visual Side */}
        <div className="hidden md:flex bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#3730a3] p-12 items-center relative overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_60%)]"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold leading-tight mb-4 text-white">
              Welcome to <span className="text-gradient">MediCare</span>
            </h1>
            <p className="text-white/70 text-[0.95rem] leading-relaxed mb-7">
              Your complete hospital management solution. Manage patients, doctors, and appointments seamlessly.
            </p>
            <div className="flex flex-wrap gap-2">
              {['🏥 Hospital Management', '📅 Smart Scheduling', '👨‍⚕️ Doctor Portal', '🔒 Secure Access'].map(pill => (
                <span key={pill} className="bg-white/10 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs text-white/85 border border-white/10">{pill}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-bg-secondary p-12 flex items-center justify-center">
          <div className="w-full max-w-[380px]">
            <div className="text-center mb-7">
              <div className="text-4xl mb-3">🏥</div>
              <h2 className="text-2xl font-bold text-slate-100 mb-1.5">Sign In</h2>
              <p className="text-slate-400 text-sm">Enter your credentials to access your account</p>
            </div>

            {error && (
              <div className="p-3 rounded-lg text-sm font-medium mb-3 bg-red-500/10 text-red-400 border border-red-500/20" id="login-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="username" className="text-xs font-medium text-slate-400 uppercase tracking-wide">Email / Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="px-3.5 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-slate-100 text-sm outline-none transition-all focus:border-accent/50 focus:bg-white/10 focus:ring-2 focus:ring-accent-glow placeholder:text-slate-500"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-medium text-slate-400 uppercase tracking-wide">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="px-3.5 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-lg text-slate-100 text-sm outline-none transition-all focus:border-accent/50 focus:bg-white/10 focus:ring-2 focus:ring-accent-glow placeholder:text-slate-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-5 bg-gradient-to-br from-accent to-accent-dark text-white rounded-lg text-sm font-semibold shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:-translate-y-px hover:shadow-[0_6px_28px_rgba(99,102,241,0.4)] active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                id="login-btn"
                disabled={loading}
              >
                {loading ? <span className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Sign In'}
              </button>
            </form>

            <p className="text-center mt-5 text-slate-400 text-sm">
              Don't have an account? <Link to="/signup" className="text-accent-light hover:text-accent transition-colors">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
