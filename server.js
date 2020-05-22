const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');

//load env variables
dotenv.config({ path: './config/config.env' });

//MongoDB Connection
connectDB();

// routefile imports
const bootcampsRouter = require('./routes/bootcamps');

const app = express();

//middleware
if (process.env.NODE_ENV === 'development') {
  // logger middleware
  app.use(morgan('dev'));
}

//create routes
app.use('/api/v1/bootcamps', bootcampsRouter);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT} in ${process.env.NODE_ENV} mode.`.magenta
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.white.underline);
  //Stop server
  server.close(() => process.exit(1));
});
