import React from 'react';
function CareTips() {
  return (
    <section className="section">
      <h2>Уход и советы по собаководству</h2>
      <div className="grid">
        <div className="card"><div className="card-body"><div className="card-title">Питание</div><div className="card-desc">Сбалансируйте рацион: белки, жиры, клетчатка. Следите за весом.</div></div></div>
        <div className="card"><div className="card-body"><div className="card-title">Активность</div><div className="card-desc">Ежедневные прогулки, игры, занятия на послушание и нюх.</div></div></div>
        <div className="card"><div className="card-body"><div className="card-title">Гигиена</div><div className="card-desc">Вычесывание, уход за зубами, когтями, ушами и глазами.</div></div></div>
        <div className="card"><div className="card-body"><div className="card-title">Социализация</div><div className="card-desc">Знакомьте собаку с людьми, животными и средами.</div></div></div>
      </div>
    </section>
  );
}
export default CareTips;
