import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useBreeds() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/breeds')
      .then(res => setBreeds(res.data))
      .catch(err => console.error('Ошибка загрузки пород:', err))
      .finally(() => setLoading(false));
  }, []);

  return { breeds, loading };
}
