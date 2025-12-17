const express = require('express');
const router = express.Router();
const pool = require('../db');
const axios = require('axios');

// вызов внешнего API (например Roboflow)
async function callRoboflow(api_key, model_id, imageBase64) {
  // правильный URL
  const url = `https://detect.roboflow.com/${model_id}?api_key=${api_key}`;
  
  const res = await axios.post(url, imageBase64, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return res.data;
}


router.post('/', async (req, res) => {
  try {
    const { modelId, imageBase64, userId } = req.body;

    // достаём модель из БД
    const modelRes = await pool.query('SELECT * FROM models WHERE id=$1 AND is_active=true', [modelId]);
    if (!modelRes.rows.length) {
      return res.status(400).json({ error: 'Модель не найдена или не активна' });
    }

    const model = modelRes.rows[0];

    // вызываем API
    const data = await callRoboflow(model.api_key, model.model_id, imageBase64);

    // определяем topClass и confidence
    let topClass = 'unknown';
    let confidence = 0;
    if (data?.predictions?.length) {
      const best = data.predictions.sort((a, b) => (b.confidence || 0) - (a.confidence || 0))[0];
      topClass = best.class || best.label || 'unknown';
      confidence = (best.confidence || 0) * 100;
    }

    // сопоставляем породу
    let breedId = null;
    if (topClass) {
      const b = await pool.query('SELECT id FROM breeds WHERE slug=$1 OR LOWER(name)=$2', [
        topClass.toLowerCase().replace(/\s+/g, '-'),
        topClass.toLowerCase()
      ]);
      breedId = b.rows[0]?.id || null;
    }

    // логируем использование
    await pool.query(
      'INSERT INTO model_usage_logs (model_id, user_id, breed_id, confidence, source) VALUES ($1,$2,$3,$4,$5)',
      [modelId, userId || null, breedId, confidence, 'web']
    );

    res.json({ topClass, confidence, raw: data });
  } catch (err) {
    console.error('Ошибка распознавания:', err);
    res.status(500).json({ error: 'Ошибка распознавания' });
  }
});

module.exports = router;
