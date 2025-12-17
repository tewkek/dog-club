import React from 'react';
import { Link } from 'react-router-dom';

function BreedCard({ breed }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={breed.ImageUrl} alt={breed.BreedName} />
      </div>
      <div className="card-body">
        <div className="card-title">{breed.BreedName}</div>
        <div className="card-desc">{breed.Description}</div>
        <div style={{ marginTop: '.75rem' }}>
          <Link className="btn btn-outline" to={`/breeds/${breed.Slug}`}>Подробнее</Link>
        </div>
      </div>
    </div>
  );
}

export default BreedCard;
