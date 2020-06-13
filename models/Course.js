const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title.'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description.'],
  },
  weeks: {
    type: String,
    required: [true, 'Please add number of weeks.'],
  },
  tuition: {
    type: Number,
    required: [true, 'Please add a tuition cost.'],
  },
  minimumSkill: {
    type: String,
    required: [true, 'please add a minimum skill.'],
    enum: ['beginner', 'intermediate', 'advanced'],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost -
  async function (bootcampId) {
    console.log('Calculating avg cost,,,'.blue);

    const obj = await this.aggregate([
      {
        $match: { bootcamp: bootcampId },
      },
      {
        $group: { _id: '$bootcampId', averageCost: { $avg: 'tuiton' } },
      },
    ]);
    console.log('averageCost Obj -----', obg);
  };

// Call getAverageCost after save
CourseSchema.post('save', function () {});

// Call getAverageCost before remove
CourseSchema.post('remove', function () {});

module.exports = mongoose.model('Course', CourseSchema);
