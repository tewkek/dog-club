import React from 'react';
import Hero from '../components/Hero';

function Home() {
  return (
    <>
      <Hero />
      <section className="section">
        <h2>Что вы найдёте в клубе</h2>
        <div className="grid">
          <div className="card"><div className="card-body"><div className="card-title">Каталог пород</div><div className="card-desc">Характер, уход, фотографии.</div></div></div>
          <div className="card"><div className="card-body"><div className="card-title">Распознавание породы</div><div className="card-desc">Загрузите фото — получите предполагаемую породу.</div></div></div>
          <div className="card"><div className="card-body"><div className="card-title">Советы по уходу</div><div className="card-desc">Питание, активность, гигиена.</div></div></div>
        </div>
      </section>
    </>
  );
}
export default Home;
