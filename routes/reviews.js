const router = require('express').Router({ mergeParams: true });

const {
  getReviews,
  getReview,
  createReview,
} = require('../controllers/reviews');

const { protect, authorize } = require('../middleware/auth');
const Review = require('../models/Review');
const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(proctect, authorize('user', 'admin'), createReview);

router.route('/:id').get(getReview);

module.exports = router;
