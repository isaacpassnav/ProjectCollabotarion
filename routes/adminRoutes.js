const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.get('/', verifyToken, authorizeAdmin, adminController.getAllUsers);
router.get('/:id', verifyToken, authorizeAdmin, adminController.getUserById);
router.put('/:id', verifyToken, authorizeAdmin, adminController.updateUserAsAdmin);
router.delete('/:id', verifyToken, authorizeAdmin, adminController.deleteUserAsAdmin);

module.exports = router;
