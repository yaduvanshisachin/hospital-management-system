import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-slate-400">
        <div className="w-10 h-10 border-[3px] border-white/[0.08] border-t-accent rounded-full animate-spin"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user.roles?.some(
    r => r === requiredRole || r === `ROLE_${requiredRole}` || r.replace('ROLE_', '') === requiredRole
  )) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
