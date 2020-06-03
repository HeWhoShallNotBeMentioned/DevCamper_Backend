const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

//load models
const Bootcamp = require('./models/Bootcamp');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    const replyNotUsed = await Bootcamp.create(bootcamps);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete from DB
const deleteData = async () => {
  try {
    const replyNotUsed = await Bootcamp.deleteMany();
    console.log('Data Deleted...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Import or Export Data
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
