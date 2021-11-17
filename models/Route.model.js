const { Schema, model } = require("mongoose");

const climbSchema = new Schema(
  {
    imageUrl: {
      type: String,
    },
    name: {
      type: String,
      // required: true,
    },
    typeOfClimb: {
      type: String,
      // required: true,
    },
    stars: {
      type: String,
      // required: true,
    },
    grade: {
      type: String,
      // required: true,
    },
    location: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    comments: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Climb = model("Climb", climbSchema);

module.exports = Climb;
