import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import BreedDetail from './pages/BreedDetail';
import Recognize from './pages/Recognize';
import CareTips from './pages/CareTips';
import AboutClub from './pages/AboutClub';

import AdminDashboard from './pages/admin/AdminDashboard';
import ModelManager from './pages/admin/ModelManager';
import DataManager from './pages/admin/DataManager';
import Stats from './pages/admin/Stats';

function App() {
  return (
    <Router>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/breeds/:slug" element={<BreedDetail />} />
          <Route path="/recognize" element={<Recognize />} />
          <Route path="/care" element={<CareTips />} />
          <Route path="/about" element={<AboutClub />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/models" element={<ModelManager />} />
          <Route path="/admin/data" element={<DataManager />} />
          <Route path="/admin/stats" element={<Stats />} />
          
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
