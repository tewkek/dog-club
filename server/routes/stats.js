const express = require('express');
const router = express.Router();
const pool = require('../db');

// ---------------------- STATS ----------------------

// Получить общую статистику
router.get('/stats', async (req, res) => {
  try {
    const totalRequests = await pool.query('SELECT COUNT(*) FROM model_usage_logs');
    const avgConfidence = await pool.query('SELECT AVG(confidence) FROM model_usage_logs');
    const topBreeds = await pool.query(`
      SELECT COALESCE(b.name, 'Неизвестно') AS "BreedName", COUNT(*) AS "RequestCount"
      FROM model_usage_logs l
      LEFT JOIN breeds b ON l.breed_id = b.id
      GROUP BY COALESCE(b.name, 'Неизвестно')
      ORDER BY "RequestCount" DESC
      LIMIT 10
    `);

    res.json({
      totalRequests: Number(totalRequests.rows[0]?.count || 0),
      avgConfidence: Number(avgConfidence.rows[0]?.avg || 0),
      topBreeds: topBreeds.rows || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка получения статистики' });
  }
});

// Логировать использование модели
router.post('/stats/log', async (req, res) => {
  try {
    const { modelId, userId, breedId, confidence, source } = req.body;
    await pool.query(
      'INSERT INTO model_usage_logs (model_id, user_id, breed_id, confidence, source) VALUES ($1,$2,$3,$4,$5)',
      [modelId, userId, breedId, confidence, source]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка логирования использования модели' });
  }
});

module.exports = router;
