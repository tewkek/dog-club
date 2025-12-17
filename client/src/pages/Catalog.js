import React from 'react';
import useBreeds from '../data/breeds';
import BreedCard from '../components/BreedCard';

function Catalog() {
  const { breeds, loading } = useBreeds();

  return (
    <section className="section">
      <h2>Каталог пород</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid">
          {breeds.length === 0 ? (
            <p>Каталог пуст. Добавьте породы в админ‑панели.</p>
          ) : (
            breeds.map((b) => (
              <BreedCard key={b.BreedId} breed={b} />
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Catalog;
