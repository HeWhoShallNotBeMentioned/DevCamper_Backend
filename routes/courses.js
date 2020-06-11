const router = require('express').Router({ mergeParams: true });

const { getCourses, getCourse } = require('../controllers/courses');

router.route('/').get(getCourses);
router.route('/:id').get(getCourse);

module.exports = router;
