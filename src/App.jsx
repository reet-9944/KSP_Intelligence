import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Geospatial from './pages/Geospatial';
import Network from './pages/Network';
import Predictive from './pages/Predictive';
import InvestigatorAI from './pages/InvestigatorAI';
import Login from './pages/Login';
import OffenderProfile from './pages/OffenderProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar userRole={userRole} onLogout={handleLogout} />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/geospatial" element={<ProtectedRoute><Geospatial /></ProtectedRoute>} />
            <Route path="/network" element={<ProtectedRoute><Network /></ProtectedRoute>} />
            <Route path="/predictive" element={<ProtectedRoute><Predictive /></ProtectedRoute>} />
            <Route path="/ai" element={<ProtectedRoute><InvestigatorAI /></ProtectedRoute>} />
            <Route path="/offender" element={<ProtectedRoute><OffenderProfile /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
