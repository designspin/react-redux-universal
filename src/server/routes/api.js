const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');

const Auth = require('../controllers/auth_controller');
const Post = require('../controllers/post_controller');

const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

router.use(bodyParser.json({ type: '*/*' }));

router.post('/signin', requireSignin, Auth.signin);
router.post('/signup', Auth.signup);
router.post('/signout', Auth.signout);
router.post('/forgot', Auth.forgot);

router.post('/addPost', requireAuth, Post.newPost);

module.exports = router;