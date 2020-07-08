const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

//load env variables
dotenv.config({ path: './config/config.env' });

//MongoDB Connection
connectDB();

// routefile imports
const bootcampsRouter = require('./routes/bootcamps');
const coursesRouter = require('./routes/courses');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const reviewRouter = require('./routes/reviews');

const app = express();

//middleware

//body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

//logger
if (process.env.NODE_ENV === 'development') {
  // logger middleware
  app.use(morgan('dev'));
}

// File Uploading
app.use(fileUpload());

// Sanitize Data
app.use(mongoSanitize());

// Set Security Headers
app.use(helmet());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//create routes
app.use('/api/v1/bootcamps', bootcampsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.use(errorHandler);

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
