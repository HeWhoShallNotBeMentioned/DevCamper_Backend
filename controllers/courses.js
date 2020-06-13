const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;
  res.status(200).json({
    success: true,
    message: 'Retrieved courses.',
    count: courses.length,
    data: courses,
  });
});

// @desc    Get a single course
// @route   GET /api/v1/courses/:id
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with id:   ${req.params.id}.`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: 'Retrieved course.',
    data: course,
  });
});

// @desc    Add a single course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`No bootcamp with id:   ${req.params.bootcampId}.`, 404)
    );
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Course Created.',
    data: course,
  });
});

// @desc    Update a single course
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;

  let course = await Course.findById(courseId);

  if (!course) {
    return next(new ErrorResponse(`No course with id:   ${courseId}.`, 404));
  }

  course = await Course.findByIdAndUpdate(courseId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    message: 'Course Updated.',
    data: course,
  });
});

// @desc    Delete a single course
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;

  const course = await Course.findById(courseId);

  if (!course) {
    return next(new ErrorResponse(`No course with id:   ${courseId}.`, 404));
  }

  const courseDeleted = await course.remove();

  res.status(201).json({
    success: true,
    message: 'Course  Deleted.',
    data: courseDeleted,
  });
});
