// User routes to handle user registration and login

const express = require('express');
const { registerUser, loginUser } = require('../controllers/user.controller');
const router = express.Router();
const {registerValidation, loginValidation} = require('../validation/user.validation')

router.post('/sign-up', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);


module.exports = router;