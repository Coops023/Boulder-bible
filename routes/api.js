var express = require("express");
var router = express.Router();

const Climb = require("../models/Route.model");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const fileUploader = require("../config/cloudinary");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

/* GET users listing. */
router.get("/climbs", function (req, res, next) {
  res.send("respond with a resource");
});

// POST '/api/upload' => Route that will receive an image, send it to Cloudinary via the fileUploader and return the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file);

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ secure_url: req.file.path });
});

// POST '/api/climb/create' => for saving a new climb in the database
router.post("/create", async (req, res, next) => {
  console.log("body: ", req.body);
  // ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.location,
      limit: 1,
    })
    .send();

  // console.log(geoData.body.features[0].geometry.coordinates);

  Climb.create({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    geometry: geoData.body.features[0].geometry,
  })
    .then((newClimb) => {
      res.status(200).json(newClimb);
    })
    .catch((err) => next(err));
});

module.exports = router;
