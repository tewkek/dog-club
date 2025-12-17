import React, { useEffect, useState } from "react";
import axios from "axios";

function DataManager() {
  const [breeds, setBreeds] = useState([]);
  const [newBreed, setNewBreed] = useState({
    name: "", slug: "", description: "", image: "", group: "", care: ""
  });
  const [editing, setEditing] = useState(null);

  const loadBreeds = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/breeds");
    setBreeds(res.data);
  };
  useEffect(() => { loadBreeds(); }, []);

  const addBreed = async () => {
    await axios.post("http://localhost:5000/api/admin/breeds", newBreed);
    setNewBreed({ name: "", slug: "", description: "", image: "", group: "", care: "" });
    loadBreeds();
  };

  const deleteBreed = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/breeds/${id}`);
    loadBreeds();
  };

  const updateBreed = async () => {
    await axios.put(`http://localhost:5000/api/admin/breeds/${editing.BreedId}`, {
      name: editing.BreedName,
      slug: editing.Slug,
      description: editing.Description,
      image: editing.ImageUrl,
      group: editing.GroupName,
      care: editing.CareNotes
    });
    setEditing(null);
    loadBreeds();
  };

  return (
    <section className="section">
      <h2>Управление данными (Каталог пород)</h2>

      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="card-body">
          <h3>Добавить новую породу</h3>
          <input placeholder="Название" value={newBreed.name} onChange={(e)=>setNewBreed({...newBreed, name:e.target.value})}/>
          <input placeholder="Slug" value={newBreed.slug} onChange={(e)=>setNewBreed({...newBreed, slug:e.target.value})}/>
          <textarea placeholder="Описание" value={newBreed.description} onChange={(e)=>setNewBreed({...newBreed, description:e.target.value})}/>
          <input placeholder="URL изображения" value={newBreed.image} onChange={(e)=>setNewBreed({...newBreed, image:e.target.value})}/>
          <input placeholder="Группа" value={newBreed.group} onChange={(e)=>setNewBreed({...newBreed, group:e.target.value})}/>
          <textarea placeholder="Уход" value={newBreed.care} onChange={(e)=>setNewBreed({...newBreed, care:e.target.value})}/>
          <button className="btn btn-primary" onClick={addBreed}>Добавить</button>
        </div>
      </div>

      <h3>Список пород</h3>
      <div className="grid">
        {breeds.map((b) => (
          <div key={b.BreedId} className="card">
            <div className="card-img">
              <img src={b.ImageUrl} alt={b.BreedName} />
            </div>
            <div className="card-body">
              {editing?.BreedId === b.BreedId ? (
                <>
                  <input value={editing.BreedName} onChange={(e)=>setEditing({...editing, BreedName:e.target.value})}/>
                  <input value={editing.Slug} onChange={(e)=>setEditing({...editing, Slug:e.target.value})}/>
                  <textarea value={editing.Description} onChange={(e)=>setEditing({...editing, Description:e.target.value})}/>
                  <input value={editing.ImageUrl} onChange={(e)=>setEditing({...editing, ImageUrl:e.target.value})}/>
                  <input value={editing.GroupName} onChange={(e)=>setEditing({...editing, GroupName:e.target.value})}/>
                  <textarea value={editing.CareNotes} onChange={(e)=>setEditing({...editing, CareNotes:e.target.value})}/>
                  <button className="btn btn-primary" onClick={updateBreed}>Сохранить</button>
                  <button className="btn btn-outline" onClick={()=>setEditing(null)}>Отмена</button>
                </>
              ) : (
                <>
                  <h4>{b.BreedName}</h4>
                  <p style={{ color:'#777' }}>Slug: {b.Slug}</p>
                  <p>{b.Description}</p>
                  <p>Группа: {b.GroupName}</p>
                  <p>Уход: {b.CareNotes}</p>
                  <button className="btn btn-outline" onClick={()=>setEditing(b)}>Редактировать</button>
                  <button className="btn btn-accent" onClick={()=>deleteBreed(b.BreedId)}>Удалить</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
export default DataManager;
