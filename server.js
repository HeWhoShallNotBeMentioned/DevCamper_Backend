const express = require('express');
const dotenv = require('dotenv');

//route files
const bootcampsRouter = require('./routes/bootcamps');

//load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//create routes
app.use('/api/v1/bootcamps', bootcampsRouter);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`)
);
