const User = require("../models/user");
const Account = require("../models/accounts");
var bcrypt = require("bcrypt");
var passport = require("passport");
const jwt = require("jsonwebtoken");
var LocalStrategy = require("passport-local").Strategy;
var JWTStrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;

/***********************************************************************************
 signup (회원가입)
***********************************************************************************/
module.exports.signup = (req, res) => {
	User.findOne({ email: req.body.email }, function (err, user) {
		if (err) {
			console.log(3);
			req.flash("error", "There is an error : " + err);
			// res.redirect("/signup/fail");
			res.status(409).send("fail");
		}
		if (user) {
			req.flash("error", "There is the email : " + user.email);
			// res.redirect("/signup/fail");
			res.status(409).send("There is the email : " + user.email);
		} else {
			bcrypt.hash(req.body.password, (saltRounds = 10), function (err, hash) {
				if (err) {
					req.flash("error", "bcrypt hash error " + err);
					res.status(409).send("fail");
				}

				var userData = {
					email: req.body.email,
					password: hash,
					name: req.body.name,
				};

				var newUser = new User(userData);
				newUser.save(function (err, user) {
					if (err) {
						req.flash("error", "new user save error : " + err);
						// res.redirect("/signup/fail");
						res.status(409).send("fail");
					}

					req.flash("success", "Welcome");
					// res.redirect("/signup/success");
					// res.status(200).send("success");
					// res.status(200).json({
					// 	status: "success",
					// 	email: userData.email,
					// });
					res.status(200).json({
						message: "success",
					});
				});
			});
		}
	});
};

/***********************************************************************************
 signin (로그인)
***********************************************************************************/
passport.serializeUser(function (user, done) {
	console.log("serializeUser");
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	console.log("deserializeUser");
	done(null, user);
});

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		function (username, password, done) {
			console.log("Authorization : Local", username, password);
			User.findOne({ email: username }, function (err, user) {
				// console.log(1);
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				// console.log(2);
				bcrypt.compare(password, user.password, function (err, result) {
					if (err) {
						return done(err);
					}
					// console.log(3);
					if (result) {
						// console.log(4);
						return done(null, user, { message: "Welcome" });
					} else {
						return done(null, false);
					}
				});
			});
		}
	)
);

// module.exports.signin = passport.authenticate("local", {
// 	// successRedirect: "/signin/success",
// 	failureRedirect: "/signin/failure",
// });

// module.exports.signinFailure = (req, res) => {
// 	res.status(401).json({ message: "Unathorized" });
// };

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_SECRET,
		},
		function (jwtPayload, done) {
			// console.log("JWTStrategy", jwtPayload);
			return User.findOne({ email: jwtPayload.email })
				.then((user) => {
					Account.findOne({ email: user.email }, (err, account) => {
						console.log("account", account);
						console.log("user", user);

						// JSON.parse user.userID = account.userID;
						user.userID = account.userID;

						console.log("user", user);

						const userInfo = {
							_id: user._id,
							email: user.email,
							password: user.password,
							name: user.name,
							userID: account.userID,
						};

						console.log(userInfo);
						return done(null, userInfo);
					});
				})
				.catch((err) => {
					return done(err);
				});
		}
	)
);

module.exports.JWTAuthenticated = passport.authenticate("jwt", { session: false });

exports.JWTcreate = function (req, res, next) {
	passport.authenticate("local", { session: false }, (err, userInfo) => {
		if (err || !userInfo) {
			return res.status(400).json({
				message: "Something is not right",
				user: user,
			});
		}
		req.login(userInfo, { session: false }, async (err) => {
			if (err) {
				res.send(err);
			}

			Account.findOne({ email: userInfo.email }, (err, account) => {
				if (err) {
					return res.status(400).json({
						message: "Something is not right",
						user: user,
					});
				}
				console.log(99, account);
				var user = {
					email: userInfo.email,
					name: userInfo.name,
					userID: account.userID,
				};
				console.log(199, user);
				// jwt.sign('token내용', 'JWT secretkey')
				const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 240 });
				return res.json({ user, accessToken });
			});

			// var user = {
			// 	email: userInfo.email,
			// 	name: userInfo.name,
			// };
			// // jwt.sign('token내용', 'JWT secretkey')
			// const accessToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 60 * 240 });
			// return res.json({ user, accessToken });
		});
	})(req, res);
};
