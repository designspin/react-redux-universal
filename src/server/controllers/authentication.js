const User = require('../../shared/models/user');
const jwtSimple = require('jwt-simple');
const config = require('../config');
const crypto = require('crypto');
const mail = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwtSimple.encode({
		sub: user.id,
		iat: timestamp
	}, config.secret );
}

exports.forgot = function(req, res, next) {
	crypto.randomBytes(20, function(err, buf) {
		const token = buf.toString('hex');

		User.findOne({ email: req.body.email}, function(err, user) {
			if(err) { return next(err); }

			if(!user) {
				res.send({ error: 'No account with that email address exists'});
			}

			user.resetPasswordToken = token;
			user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

			user.save(function(err) {
				if(err) { return next(err); }

				const smtpTransport = mail.createTransport(smtp({
					host: config.authMailHost,
					port: 587,
					secure: false,
					tls: {
						rejectUnauthorized: false
					},
					auth: {
						user: config.authEmailSend,
						pass: config.authEmailPass
					}
				}));

				const mailOptions = {
					to: user.email,
					from: 'noreply@demo.com',
					subject: 'API Password reset',
					text: 'You are receiving this email because you have requested a password reset on your account.\n\n' +
						'Please click on the following link, or paste into your browser address bar to complete the process:\n\n' +
						'http://' + req.headers.host + '/reset/' + token + '\n\n' +
						'If you did not request this, please ignore this email and your password will remain unchanged.\n'
				};

				smtpTransport.sendMail(mailOptions, function(err) {
					if(err) { return next(err); }

					res.send({ success: 'An email has been sent to the email address, with reset instructions'})
				})
			})
		})
	})
};

//Post Method for signin
exports.signin = function(req, res, next) {
	res.send({ token: tokenForUser(req.user)});
};

//Post Method for signup
exports.signup = function(req, res, next) {

	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(422).send({
			error: "You must provide an email and a password to login"
		});
	}

	User.findOne({ email: email }, function(err, existingUser) {

		if(err) { 
			return next(err); 
		}
		if(existingUser) {
			return res.status(422).send({
				error: "Email is already in use"
			})
		}
		const user = new User({
			email: email,
			password: password
		});

		user.save(function(err) {
			if(err) {
				return next(err);
			}
			res.json({ token: tokenForUser(user)});
		});
	})
};