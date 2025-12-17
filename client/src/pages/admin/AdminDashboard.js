import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <section className="section">
      <h2>Админ‑панель</h2>
      <div className="grid">
        <Link to="/admin/models" className="btn btn-primary">Управление моделями</Link>
        <Link to="/admin/data" className="btn btn-accent">Управление данными</Link>
        <Link to="/admin/stats" className="btn btn-outline">Статистика</Link>
      </div>
    </section>
  );
}
export default AdminDashboard;
