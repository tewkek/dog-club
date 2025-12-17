const express = require('express');
const router = express.Router();
const pool = require('../db');

// ---------------------- BREEDS CRUD ----------------------

// Получить все породы
router.get('/breeds', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id AS "BreedId",
             name AS "BreedName",
             slug AS "Slug",
             description AS "Description",
             image_url AS "ImageUrl",
             group_name AS "GroupName",
             care_notes AS "CareNotes"
      FROM breeds
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка получения списка пород' });
  }
});

// Добавить породу
router.post('/breeds', async (req, res) => {
  try {
    const { name, slug, description, image, group, care } = req.body;
    await pool.query(
      'INSERT INTO breeds (name, slug, description, image_url, group_name, care_notes) VALUES ($1,$2,$3,$4,$5,$6)',
      [name, slug, description, image, group, care]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка добавления породы' });
  }
});

// Обновить породу
router.put('/breeds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image, group, care } = req.body;
    await pool.query(
      'UPDATE breeds SET name=$1, slug=$2, description=$3, image_url=$4, group_name=$5, care_notes=$6 WHERE id=$7',
      [name, slug, description, image, group, care, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка обновления породы' });
  }
});

// Удалить породу
router.delete('/breeds/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM breeds WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка удаления породы' });
  }
});

// ---------------------- MODELS CRUD ----------------------

// Получить все модели
router.get('/models', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM models ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка получения списка моделей' });
  }
});


// Добавить модель
router.post('/models', async (req, res) => {
  try {
    const { name, api_type, api_key, model_id, confidence, is_active } = req.body;
    await pool.query(
      'INSERT INTO models (name, api_type, api_key, model_id, confidence, is_active) VALUES ($1,$2,$3,$4,$5,$6)',
      [name, api_type || 'online', api_key, model_id, confidence || 0.5, is_active || false]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Ошибка добавления модели:", err);
    res.status(500).json({ error: 'Ошибка добавления модели' });
  }
});


// Обновить модель
router.put('/models/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, api_type, api_key, model_id, confidence, is_active } = req.body;
    await pool.query(
      'UPDATE models SET name=$1, api_type=$2, api_key=$3, model_id=$4, confidence=$5, is_active=$6 WHERE id=$7',
      [name, api_type, api_key, model_id, confidence, is_active, id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка обновления модели' });
  }
});

// Удалить модель
router.delete('/models/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM models WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка удаления модели' });
  }
});

module.exports = router;
