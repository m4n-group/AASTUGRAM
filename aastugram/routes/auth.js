const express = require("express");
const authController = require("../controllers/auth.js");

const router = express.Router();

router.post('/auth/register',  authController.register);
router.post('/auth/login', authController.login);
router.get('/auth/verify', authController.verify);
router.get('/auth/forgot', authController.forgot);

module.exports = router;
