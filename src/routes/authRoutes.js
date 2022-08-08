const express = require('express');
const router = express.Router();
const authHttpHandler = require('../libs/auth/auth');

router.route('/login').post(authHttpHandler.loginUser);
router.route('/register').post(authHttpHandler.createUser);

exports.router = router;