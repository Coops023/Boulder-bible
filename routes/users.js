var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Service = require("../services/service");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const jwt = require("jsonwebtoken");

/* GET list of Users. */
router.get("/", (req, res) => {
  User.find().then((users) => res.json({ title: "Express", users }));
});

/* Fill all the Users CRUD Routes */
//User Create route
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  // Check if email or password or name are provided as empty string
  if (username === "" || email === "" || password === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }
  // Use regex to validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }
  // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }
  // Check the users collection if a user with the same email already exists
  User.findOne({ email })

    .then((foundUser) => {
      // If the user with the same email already exists, send an error response
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }
      // If email is unique, proceed to hash the password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      // Create the new user in the database
      // We return a pending promise, which allows us to chain another `then`
      return User.create({ username, email, password: hashedPassword });
    })
    .then((createdUser) => {
      console.log("line 59 user routes. payload", req.payload);
      // Deconstruct the newly created user object to omit the password
      // We should never expose passwords publicly
      const { username, email, _id } = createdUser;
      // Create a new object that doesn't expose the password
      const user = { username, email, _id };
      // Send a json response containing the user object
      res.status(201).json({ user: user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error", err });
    });
});

//Get user by specific id
router.get("/find/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findById(userId)

    .then((user) => res.status(200).json(user))
    .catch((error) => res.json(error));
});

//Put route to update a specific user
router.put("/user/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRound);
  const hashPassword = bcrypt.hashSync(password, salt);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  if (!password) {
    User.findByIdAndUpdate(
      userId,
      { username: username, email: email },
      { new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((error) => res.json(error));
  } else {
    User.findByIdAndUpdate(
      userId,
      {
        username: username,
        email: email,
        password: hashPassword,
      },
      { new: true }
    )
      .then((updatedUser) => res.json(updatedUser))
      .catch((error) => res.json(error));
  }
});

//Deletes a specified user by id
router.delete("/delete/:userId", isAuthenticated, (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findByIdAndRemove(userId)
    .then(() =>
      res.json({ message: `User with ${userId} is removed successfully.` })
    )
    .catch((error) => res.json(error));
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  //  console.log("line 122", email, password)
  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      // console.log('line 132', foundUser)
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, username, email } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, username, email };

        // Create and sign the token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/verify", isAuthenticated, (req, res, next) => {
  // <== CREATE NEW ROUTE

  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  // console.log(`172 verify req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;
