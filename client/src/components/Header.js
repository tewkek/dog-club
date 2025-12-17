import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="brand">
        <div className="brand-logo">🐾</div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Клуб собаководства</div>
          <div style={{ fontSize: '.9rem', opacity: .9 }}>Сообщество и база знаний</div>
        </div>
      </div>
      <nav>
        <NavLink to="/" end>Главная</NavLink>
        <NavLink to="/catalog">Каталог пород</NavLink>
        <NavLink to="/recognize">Распознавание</NavLink>
        <NavLink to="/care">Советы</NavLink>
        <NavLink to="/about">О клубе</NavLink>
        <NavLink to="/admin">Админ</NavLink>
      </nav>
    </header>
  );
}
export default Header;
