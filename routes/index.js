const express = require('express');
const router = express.Router();

router.use('/users', require('./userRouter'));
router.use('/admin/users', require('./adminRoutes'))

module.exports = router;