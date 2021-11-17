var express = require("express");
var router = express.Router();

const Climb = require("../models/Route.model");

const fileUploader = require("../config/cloudinary");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// POST '/api/upload' => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ secure_url: req.file.path });
});

// POST '/api/climb/create' => for saving a new climb in the database
router.post("/climb/create", (req, res, next) => {
  const {
    imageUrl,
    name,
    typeOfClimb,
    stars,
    grade,
    location,
    description,
    comments,
  } = req.body;
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method

  Climb.create({
    imageUrl,
    name,
    typeOfClimb,
    stars,
    grade,
    location,
    description,
    comments,
  })
    .then((newClimb) => {
      // console.log('Created new movie: ', newlyCreatedMovieFromDB);
      res.status(200).json(newClimb);
    })
    .catch((err) => next(err));
});

module.exports = router;
