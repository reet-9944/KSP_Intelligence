import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Geospatial from './pages/Geospatial';
import Network from './pages/Network';
import Predictive from './pages/Predictive';
import InvestigatorAI from './pages/InvestigatorAI';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/geospatial" element={<Geospatial />} />
            <Route path="/network" element={<Network />} />
            <Route path="/predictive" element={<Predictive />} />
            <Route path="/ai" element={<InvestigatorAI />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
