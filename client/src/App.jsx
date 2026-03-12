import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const ComingSoon = ({ title }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex-1 flex flex-col lg:ml-60 min-w-0 overflow-hidden">
        <Navbar title={title} onMenuClick={() => setMobileMenuOpen(true)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-2">This module is coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const placeholderRoutes = [
  { path: '/customers', title: 'Customers' },
  { path: '/campaigns', title: 'Campaigns' },
  { path: '/campaign-logs', title: 'Campaign Logs' },
  { path: '/analytics', title: 'Analytics' },
  { path: '/settings', title: 'Settings' },
];

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {placeholderRoutes.map(({ path, title }) => (
            <Route
              key={path}
              path={path}
              element={
                <ProtectedRoute>
                  <ComingSoon title={title} />
                </ProtectedRoute>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
