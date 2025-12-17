import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recognize({ user }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [breeds, setBreeds] = useState([]);

  // загрузка моделей
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/models')
      .then(res => {
        setModels(res.data);
        const active = res.data.find(m => m.is_active);
        if (active) setSelectedModelId(active.id);
      });
  }, []);

  // загрузка каталога пород
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/breeds')
      .then(res => setBreeds(res.data));
  }, []);

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const toBase64Body = async () => preview.split(',')[1];

  const onRecognize = async () => {
    setError('');
    setResult(null);
    if (!file || !preview) {
      setError('Пожалуйста, выберите изображение.');
      return;
    }
    if (!selectedModelId) {
      setError('Не выбрана модель для распознавания.');
      return;
    }
    try {
      setLoading(true);
      const base64 = await toBase64Body();

      const res = await axios.post('http://localhost:5000/api/recognize', {
        modelId: selectedModelId,
        imageBase64: base64,
        userId: user?.id || null
      });

      const data = res.data;
      let topClass = data.topClass || 'unknown';
      let confidence = data.confidence || 0;

      // поиск совпадения в каталоге
      const match = breeds.find(b =>
        b.Slug === topClass.toLowerCase().replace(/\s+/g, '-') ||
        b.BreedName.toLowerCase() === topClass.toLowerCase()
      );

      setResult({ raw: data, topClass, confidence, matchedBreed: match || null });
    } catch (e) {
      console.error(e);
      setError(e.message || 'Ошибка распознавания');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="recognize section">
      <h2>Распознавание породы по фото</h2>

      <div>
        <label>Выберите модель:</label>
        <select value={selectedModelId || ''} onChange={e => setSelectedModelId(Number(e.target.value))}>
          <option value="">-- выберите модель --</option>
          {models.map(m => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div className="upload">
        <input type="file" accept="image/*" onChange={onFileChange} />
        <div className="upload-preview" style={{ marginTop: '.75rem' }}>
          {preview ? <img src={preview} alt="preview" /> : 'Предпросмотр изображения'}
        </div>
        <button className="btn btn-primary" onClick={onRecognize} disabled={loading}>
          {loading ? 'Распознаём...' : 'Распознать'}
        </button>
        {error && <div style={{ color: 'crimson', marginTop: '.5rem' }}>{error}</div>}
      </div>

      {result && (
        <div className="result">
          <div><strong>Порода:</strong> {result.topClass}</div>
          <div><strong>Вероятность:</strong> {result.confidence.toFixed(1)}%</div>
          {result.matchedBreed && (
            <div style={{ marginTop: '.75rem' }}>
              <div style={{ fontWeight: 700 }}>Совпадение в каталоге:</div>
              <div className="card" style={{ marginTop: '.5rem' }}>
                <div className="card-img">
                  <img src={result.matchedBreed.ImageUrl} alt={result.matchedBreed.BreedName} />
                </div>
                <div className="card-body">
                  <div className="card-title">{result.matchedBreed.BreedName}</div>
                  <div className="card-desc">{result.matchedBreed.Description}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Recognize;
