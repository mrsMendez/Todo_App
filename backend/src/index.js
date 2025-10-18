const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

// GET /tasks
app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
  res.status(200).json(result.rows);
});

// POST /tasks
app.post('/tasks', async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *',
    [title]
  );
  res.status(201).json(result.rows[0]);
});

// PUT /tasks/:id
app.put('/tasks/:id', async (req, res) => {
  const { completed } = req.body;
  const result = await pool.query(
    'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *',
    [completed, req.params.id]
  );
  res.status(200).json(result.rows[0]);
});

// DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  res.status(204).send();
});

// Inicializar DB y arrancar servidor
const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      completed BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const startServer = async () => {
  await initDB();
  app.listen(3000, () => {
    console.log('Servidor backend corriendo en puerto 3000');
  });
};

startServer();

