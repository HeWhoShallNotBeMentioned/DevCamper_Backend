const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcampsReply = await Bootcamp.find();
    res.status(200).json({
      success: true,
      message: 'Retreived all bootcamps',
      data: bootcampsReply,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  const numb = req.params.id;
  try {
    const bootcampReply = await Bootcamp.findById(numb);
    if (!bootcampReply) {
      throw new Error('There is no bootcamp with that id.');
    }

    res.status(200).json({
      success: true,
      message: `Return bootcamp id: ${numb}.`,
      data: bootcampReply,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Create single bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcampReply = await Bootcamp.create(req.body);
    res.status(201).json({ success: true, data: bootcampReply });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const numb = req.params.id;
    const bootcampReply = await Bootcamp.findByIdAndUpdate(numb, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcampReply) {
      throw new Error(`There is no bootcamp with id ${numb}.`);
    }
    res.status(200).json({
      success: true,
      data: bootcampReply,
      message: `Updated bootcamp ${numb}`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete single bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};
