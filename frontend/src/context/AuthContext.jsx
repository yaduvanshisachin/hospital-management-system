import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const response = await authAPI.login({ username, password });
    const { jwt, userId, roles } = response.data;

    // Use roles from response (backend now sends them directly)
    const userData = { userId, username, roles: roles || [] };
    setToken(jwt);
    setUser(userData);
    localStorage.setItem('token', jwt);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const signup = async (username, password, name, roles = ['PATIENT']) => {
    const response = await authAPI.signup({
      username,
      password,
      name,
      roles,
    });
    return response.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const hasRole = (role) => {
    if (!user?.roles) return false;
    return user.roles.some(
      (r) =>
        r === role ||
        r === `ROLE_${role}` ||
        r.replace('ROLE_', '') === role
    );
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
