const passport = require("passport");
const Group = require("../models/Group"); //user group all users have their own group at begining
const validator = require("validator");
const User = require("../models/User"); //new user gets put in user collection

/// get login
exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/repair"); // already authenticated send user to
  }
  res.render("login", {
    title: "Login",
  });
};

// exports.apiLogout = (req, res, next) => {
//   req.logout((err) => {
//     if (err) return next(err);

//     console.log("User has logged out.");
//     req.session.destroy((err) => {
//       if (err)
//         console.log(
//           "Error : Failed to destroy the session during logout.",
//           err
//         );
//       req.user = null;
//       res.redirect("/");
//     });
//   });
// };

// exports.apiLogin = (req, res, next) => {
//   const validationErrors = [];
//   if (!validator.isEmail(req.body.email)) {
//     console.log("invalid email");
//     validationErrors.push("Please enter a valid email address.");
//   }
//   if (validator.isEmpty(req.body.password)) {
//     console.log("empty password");

//     validationErrors.push("Password cannot be blank.");
//   }

//   if (validationErrors.length) {
//     console.log("setting errors in flash");
//     req.flash("errors", validationErrors);
//     // console.log("req flash is", locals.messages);
//     // return res.redirect("/login");
//   }
//   req.body.email = validator.normalizeEmail(req.body.email, {
//     gmail_remove_dots: false,
//   });

//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       console.error("authen failed");
//       res.send({ message: "login failed", login: "failed" });
//       return;
//     }
//     if (info) {
//       console.log("**********info", info);
//       req.flash("errors", ["Not authorized check credentials"]);
//       res.send({ message: "login failed", login: "failed" });
//       return;
//     }
//     if (!user) {
//       req.flash("errors", ["Not authorized check credentials"]);
//       console.error("no user found");
//       res.send({ message: "login failed", login: "failed" });
//       return;
//     }
//     req.logIn(user, (err) => {
//       if (err) {
//         req.flash("errors", ["Not authorized check credentials"]);
//         res.send({ message: "login failed", login: "failed" });
//         return;
//       }

//       //strip the password from the user document
//       const { password, ...cleanUserData } = user._doc;
//       console.log("req.sessions at api login", req.sessions);
//       // console.log("sucess login");
//       // req.flash("success", { msg: "Success! You are logged in." });

//       res.send({ message: cleanUserData, login: "success" });
//     });
//   })(req, res, next);
// };

///POST LOGIN

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  const returnTo = req.session.returnTo;
  req.session.returnTo = null;

  if (!validator.isEmail(req.body.email)) {
    console.log("invalid email");
    validationErrors.push("Please enter a valid email address.");
  }
  if (validator.isEmpty(req.body.password)) {
    console.log("empty password");

    validationErrors.push("Password cannot be blank.");
  }

  if (validationErrors.length) {
    console.log("setting errors in flash");
    req.flash("errors", validationErrors);
    // console.log("req flash is", locals.messages);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("authen failed");
      return next(err);
    }
    if (info) {
      console.log("**********info", info);
      req.flash("errors", ["Not authorized check credentials"]);
      res.redirect("/login");
      return;
    }
    if (!user) {
      req.flash("errors", ["Not authorized check credentials"]);
      console.error("no user found");
      res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        req.flash("errors", ["Not authorized check credentials"]);
        return next(err);
      }
      console.log("sucess login post");
      // req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(returnTo || "/repair");
    });
  })(req, res, next);
};

/// logout
exports.logout = (req, res) => {
  console.log(`logout route`);

  req.logout((err) => {
    if (err) return next(err);

    console.log("User has logged out.");
    req.session.destroy((err) => {
      if (err)
        console.log(
          "Error : Failed to destroy the session during logout.",
          err
        );
      req.user = null;
      res.redirect("/");
    });
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

/// signup
exports.postSignup = async (req, res, next) => {
  //checking to see if password ect match

  console.log(`signup body`, req.body);
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push("password must be atleast 8 characters");
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push("Passwords do not match");

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    //new User is our user model, we grab username,email, password from request body of the form to create a new user
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { username: req.body.username }] },
    async (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", ["email already in use"]);
        return res.redirect("../signup");
      }
      const result = await user.save(async (err, createdUser) => {
        //save the new user model to create a new user in our users collection
        if (err) {
          return next(err);
        }
        const foundGroup = await Group.findOne({
          name: createdUser.username,
        });
        console.log(`found group`, foundGroup);
        if (!foundGroup) {
          console.log(`user created: `, createdUser);
          ///no group found make one
          const newGroup = await Group.create({
            name: user.username,
            members: [
              {
                userid: createdUser._id,
                username: createdUser.username,
                role: "3",
              },
            ],
            createdBy: createdUser._id,
          });
          console.log("group made: ", newGroup);
        }

        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }

          res.redirect("/repair"); //last thing it does is redirect us to the dashboard
        });
      });
    }
  );
};

function validateInput(req) {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push("password must be atleast 8 characters");
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push("Passwords do not match");

  return validationErrors;
}
