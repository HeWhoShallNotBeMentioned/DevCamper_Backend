const router = require('express').Router();

// Include other resource routers
const courseRouter = require('./courses');

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require('../controllers/bootcamps');

const { protect } = require('../middleware/auth');

const Bootcamp = require('../models/Bootcamp');

const advancedResults = require('../middleware/advancedResults');

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route(`/:id/photo`).put(protect, bootcampPhotoUpload);

module.exports = router;
