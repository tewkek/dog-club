import React from 'react';
import { useParams } from 'react-router-dom';
import useBreeds from '../data/breeds';

function BreedDetail() {
  const { slug } = useParams();
  const { breeds, loading } = useBreeds();

  if (loading) return <p>Загрузка...</p>;

  const breed = breeds.find(b => b.Slug === slug);

  if (!breed) return <p>Порода не найдена</p>;

  return (
    <section className="section">
      <h2>{breed.BreedName}</h2>
      <img src={breed.ImageUrl} alt={breed.BreedName} />
      <p><strong>Группа:</strong> {breed.GroupName}</p>
      <p><strong>Описание:</strong> {breed.Description}</p>
      {breed.CareNotes && (
        <p><strong>Уход:</strong> {breed.CareNotes}</p>
      )}
    </section>
  );
}

export default BreedDetail;
