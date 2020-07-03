const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/auth/users/
// @access  Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json({ ...res.advancedResults, message: 'Retrieved all users.' });
});

// @desc    Get one user
// @route   GET /api/v1/auth/users/:id
// @access  Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: `Retrieved user ${req.params.id}.`,
    data: user,
  });
});
