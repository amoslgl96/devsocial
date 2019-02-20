const express = require("express");

const router = express.Router();

// this User object allows us to call mongoose methods to interact with DB
const User = require("../../models/User");

const gravatar = require("gravatar");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const keys = require("../../config/keys");

// @route GET api/users/test
// @desc Tests users route
// @access Public
router.get("/test", (req, res) =>
  res.json({
    msg: "users Works!!"
  })
);

// @route GET api/users/REGISTER
// @desc Register user
// @access Public (they can't be logged in to register. Hence public.)
router.post("/register", (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", //rating
        d: "mm" // Default
      });

      //generate 10 char longth salt
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }

          req.body.password = hash;

          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar
          });

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({
        email: "User not found"
      });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({
          password: "password is incorrect"
        });
      }

      // create payload
      const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar
      };

      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3000}, (err,token)=>{
          return res.json({
              success: true,
              token: 'Bearer ' + token 
          });
      });

    
    });
  });
});

module.exports = router;
