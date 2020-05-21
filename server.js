const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// routefile imports
const bootcampsRouter = require('./routes/bootcamps');

//load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

//middleware
if (process.env.NODE_ENV === 'development') {
  // logger middleware
  app.use(morgan('dev'));
}

//create routes
app.use('/api/v1/bootcamps', bootcampsRouter);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`)
);
