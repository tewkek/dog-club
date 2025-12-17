import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ModelManager() {
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({
    name: '',
    api_type: 'online',
    api_key: '',
    model_id: '',
    confidence: 0.5,
    is_active: false
  });
  const [editing, setEditing] = useState(null);

  // загрузка моделей
  const loadModels = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/models');
    setModels(res.data);
  };
  useEffect(() => { loadModels(); }, []);

  // сохранить новую модель
  const saveModel = async () => {
    await axios.post('http://localhost:5000/api/admin/models', form);
    setForm({ name: '', api_type: 'online', api_key: '', model_id: '', confidence: 0.5, is_active: false });
    loadModels();
  };

  // обновить модель
  const updateModel = async () => {
    await axios.put(`http://localhost:5000/api/admin/models/${editing.id}`, editing);
    setEditing(null);
    loadModels();
  };

  // удалить модель
  const deleteModel = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/models/${id}`);
    loadModels();
  };

  return (
    <section className="section">
      <h2>Управление моделями</h2>

      {/* форма добавления */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="card-body">
          <h3>Добавить новую модель</h3>
          <input placeholder="Название" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
          <input placeholder="API type" value={form.api_type} onChange={e=>setForm({...form, api_type:e.target.value})}/>
          <input placeholder="API key" value={form.api_key} onChange={e=>setForm({...form, api_key:e.target.value})}/>
          <input placeholder="Model ID" value={form.model_id} onChange={e=>setForm({...form, model_id:e.target.value})}/>
          <input type="number" step="0.01" placeholder="Confidence" value={form.confidence} onChange={e=>setForm({...form, confidence: parseFloat(e.target.value)})}/>
          <label>
            Активна:
            <input type="checkbox" checked={form.is_active} onChange={e=>setForm({...form, is_active:e.target.checked})}/>
          </label>
          <button className="btn btn-primary" onClick={saveModel}>Сохранить модель</button>
        </div>
      </div>

      {/* список моделей */}
      <h3>Список моделей</h3>
      <div className="grid">
        {models.map(m => (
          <div key={m.id} className="card">
            <div className="card-body">
              {editing?.id === m.id ? (
                <>
                  <input value={editing.name} onChange={e=>setEditing({...editing, name:e.target.value})}/>
                  <input value={editing.api_type} onChange={e=>setEditing({...editing, api_type:e.target.value})}/>
                  <input value={editing.api_key} onChange={e=>setEditing({...editing, api_key:e.target.value})}/>
                  <input value={editing.model_id} onChange={e=>setEditing({...editing, model_id:e.target.value})}/>
                  <input type="number" step="0.01" value={editing.confidence} onChange={e=>setEditing({...editing, confidence: parseFloat(e.target.value)})}/>
                  <label>
                    Активна:
                    <input type="checkbox" checked={editing.is_active} onChange={e=>setEditing({...editing, is_active:e.target.checked})}/>
                  </label>
                  <button className="btn btn-primary" onClick={updateModel}>Сохранить</button>
                  <button className="btn btn-outline" onClick={()=>setEditing(null)}>Отмена</button>
                </>
              ) : (
                <>
                  <h4>{m.name}</h4>
                  <p>Тип: {m.api_type}</p>
                  <p>Model ID: {m.model_id}</p>
                  <p>Confidence: {m.confidence}</p>
                  <p>Активна: {m.is_active ? 'Да' : 'Нет'}</p>
                  <button className="btn btn-outline" onClick={()=>setEditing(m)}>Редактировать</button>
                  <button className="btn btn-accent" onClick={()=>deleteModel(m.id)}>Удалить</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ModelManager;
