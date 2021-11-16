const { Schema, model } = require("mongoose");

const climbSchema = new Schema({
  image: {
    type: Image,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  stars: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
});

const Climb = model("Climb", climbSchema);

module.exports = climb;
