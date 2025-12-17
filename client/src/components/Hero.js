import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero section">
      <div className="hero-text">
        <h1>Добро пожаловать в Клуб собаководства</h1>
        <p>Каталог пород, советы по уходу и распознавание породы по фото — всё в одном месте.</p>
        <div className="cta-group">
          <Link to="/catalog" className="btn btn-primary">Перейти к каталогу</Link>
          <Link to="/recognize" className="btn btn-accent">Распознать породу</Link>
          <Link to="/care" className="btn btn-outline">Советы по уходу</Link>
        </div>
      </div>
      <div className="hero-img" aria-label="dogs-hero-image"></div>
    </section>
  );
}
export default Hero;
