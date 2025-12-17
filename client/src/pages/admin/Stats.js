import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/stats').then(res => setStats(res.data));
  }, []);

  return (
    <section className="section">
      <h2>Статистика использования</h2>
      {!stats ? <p>Загрузка...</p> : (
        <div>
          <p>Всего запросов: {stats.totalRequests}</p>
          <p>Средняя точность: {stats.avgConfidence}%</p>
          <h3>Топ‑10 пород</h3>
          <div className="grid">
            {stats.topBreeds.length === 0 ? (
  <p>Нет данных для отображения</p>
) : (
  stats.topBreeds.map(b => (
    <div key={b.BreedName} className="card">
      <div className="card-body">
        <div className="card-title">{b.BreedName}</div>
        <div className="card-desc">{b.RequestCount} запросов</div>
      </div>
    </div>
  ))
)}

          </div>
        </div>
      )}
    </section>
  );
}
export default Stats;
