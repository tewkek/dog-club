import React from 'react';
import { Link } from 'react-router-dom';

function AboutClub() {
  return (
    <section className="section">
      <h2>О клубе</h2>
      <p>«Клуб собаководства» — онлайн‑сообщество, где владельцы собак находят информацию о породах, делятся опытом и пользуются ИИ.</p>
      <p>Цель — объединить кинологические знания и технологии для помощи владельцам.</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to="/catalog" className="btn btn-primary">Перейти к породам</Link>
      </div>
    </section>
  );
}
export default AboutClub;
