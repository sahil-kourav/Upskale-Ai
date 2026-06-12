const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');
const router = express.Router();


/**
 * @route POST /api/auth/register
 * @desc Register a new user with phone, fullName, email and password in the request body
 * @access Public
 */
router.post('/register', authController.registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login a user with email and password
 * @access Public
 */
router.post('/login', authController.loginUser);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user by clearing the token cookie and adding the token to the blacklist
 * @access Public
 */
router.post('/logout', authController.logoutUser);

/**
 * @route GET /api/auth/get-me
 * @desc Get the currently logged in user's information
 * @access Private
 */
router.get('/get-me', authMiddleware.authUser, authController.getUser);

module.exports = router;