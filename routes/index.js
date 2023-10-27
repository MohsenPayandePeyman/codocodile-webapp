var express = require('express');
var router = express.Router();

// Require controller modules.
const user_controller = require("../controllers/userController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/main')
});

//Sign In

router.get('/sign-in', user_controller.sign_in_get);

router.post('/sign-in', user_controller.sign_in_post);

router.get('/sign-out', user_controller.sign_out_get);

// Sign Up

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

// Forget Password

router.get('/forgot-password', user_controller.forgot_password_get);

router.post('/forgot-password', user_controller.forgot_password_post);

// Account Activation

router.get('/activation', user_controller.activation_get);

module.exports = router;
