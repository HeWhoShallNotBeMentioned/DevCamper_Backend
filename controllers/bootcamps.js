const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcampsReply = await Bootcamp.find();
  res.status(200).json({
    success: true,
    message: 'Retreived all bootcamps',
    count: bootcampsReply.length,
    data: bootcampsReply,
  });
});

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const numb = req.params.id;

  const bootcampReply = await Bootcamp.findById(numb);
  // For properly formatted id but not in the database
  if (!bootcampReply) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: `Return bootcamp id: ${numb}.`,
    data: bootcampReply,
  });
});

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcampReply = await Bootcamp.create(req.body);
  res.status(201).json({ success: true, data: bootcampReply });
});

// @desc    Update single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const numb = req.params.id;
  const bootcampReply = await Bootcamp.findByIdAndUpdate(numb, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcampReply) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: bootcampReply,
    message: `Updated bootcamp ${numb}`,
  });
});

// @desc    Delete single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const numb = req.params.id;

  const bootcampReply = await Bootcamp.findByIdAndDelete(numb);

  if (!bootcampReply) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcampReply,
    message: `Successfully deleted bootcamp with ID: ${numb}`,
  });
});
