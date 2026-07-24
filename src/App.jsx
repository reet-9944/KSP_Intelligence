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
  const [userRole, setUserRole] = useState(''); // Default empty until logged in

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  // Basic Route Protection
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Role-Based Route Protection (Prevents manual URL typing access)
  const RoleProtectedRoute = ({ children, allowedRoles }) => {
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        {isAuthenticated && <Navbar userRole={userRole} onLogout={handleLogout} />}
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            
            <Route path="/" element={<ProtectedRoute><Home userRole={userRole} /></ProtectedRoute>} />
            
            <Route path="/geospatial" element={
              <RoleProtectedRoute allowedRoles={['Investigator', 'Analyst', 'Supervisor']}>
                <Geospatial userRole={userRole} />
              </RoleProtectedRoute>
            } />
            
            <Route path="/network" element={
              <RoleProtectedRoute allowedRoles={['Analyst']}>
                <Network userRole={userRole} />
              </RoleProtectedRoute>
            } />
            
            <Route path="/predictive" element={
              <RoleProtectedRoute allowedRoles={['Analyst', 'Supervisor', 'Policymaker']}>
                <Predictive userRole={userRole} />
              </RoleProtectedRoute>
            } />
            
            <Route path="/ai" element={
              <RoleProtectedRoute allowedRoles={['Investigator', 'Analyst', 'Policymaker']}>
                <InvestigatorAI userRole={userRole} />
              </RoleProtectedRoute>
            } />
            
            <Route path="/offender" element={
              <RoleProtectedRoute allowedRoles={['Investigator', 'Analyst', 'Supervisor']}>
                <OffenderProfile userRole={userRole} />
              </RoleProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
