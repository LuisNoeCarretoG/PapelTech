import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, profileRequest, registerRequest } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('papeltech_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    profileRequest()
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem('papeltech_token');
        setToken(null);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = async (credentials) => {
    const res = await loginRequest(credentials);
    localStorage.setItem('papeltech_token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (data) => {
    const res = await registerRequest(data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('papeltech_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
