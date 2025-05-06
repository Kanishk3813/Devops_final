//\backend\index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'feedbacks.json');
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// POST /feedback
app.post('/feedback', (req, res) => {
  const newFeedback = req.body;
  let data = [];

  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE);
    data = JSON.parse(raw);
  }

  data.push(newFeedback);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.status(201).send({ message: 'Feedback saved' });
});

// GET /feedbacks
app.get('/feedbacks', (req, res) => {
  if (!fs.existsSync(DATA_FILE)) return res.json([]);
  const raw = fs.readFileSync(DATA_FILE);
  const data = JSON.parse(raw);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
    