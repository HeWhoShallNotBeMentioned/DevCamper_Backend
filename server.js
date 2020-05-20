const express = require('express');
const dotenv = require('dotenv');

//load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, message: 'Show all bootcamps.' });
});

app.get('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Display one bootcamp ${req.params.id}` });
});

app.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, message: 'Create new bootcamp.' });
});

app.put('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
});

app.delete('/api/v1/bootcamps/:id', (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`)
);
