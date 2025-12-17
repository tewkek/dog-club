const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

// маршруты
const adminRoutes = require('./routes/admin');
const statsRoutes = require('./routes/stats');
const recognizeRoutes = require('./routes/recognize');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// подключение маршрутов
app.use('/api/admin', adminRoutes);     // CRUD для пород и моделей
app.use('/api/admin', statsRoutes);     // статистика
app.use('/api/recognize', recognizeRoutes); // распознавание


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

// проверка подключения к БД
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('DB connection error:', err));
