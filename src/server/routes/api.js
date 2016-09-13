const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const Auth = require('../controllers/authentication');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.use(bodyParser.json({ type: '*/*' }));

router.post('/signin', requireSignin, Auth.signin);
router.post('/signup', Auth.signup);
router.post('/forgot', Auth.forgot);

module.exports = router;