// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// File to store feedback
const FEEDBACK_FILE = 'feedback.json';

// Submit feedback
app.post('/submit-feedback', (req, res) => {
  const { name, email, feedback } = req.body;

  const newFeedback = {
    name,
    email,
    feedback,
    timestamp: new Date().toISOString(),
  };

  // Read existing data
  let feedbackData = [];
  if (fs.existsSync(FEEDBACK_FILE)) {
    feedbackData = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  }

  // Add new feedback and save
  feedbackData.push(newFeedback);
  fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackData, null, 2));

  res.send('Feedback submitted and saved!');
});

// View all feedback
app.get('/feedbacks', (req, res) => {
  if (!fs.existsSync(FEEDBACK_FILE)) {
    return res.json([]);
  }
  const feedbackData = JSON.parse(fs.readFileSync(FEEDBACK_FILE));
  res.json(feedbackData);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
