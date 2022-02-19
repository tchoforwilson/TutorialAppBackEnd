const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tutorial must have a title"],
      unique: true,
      trim: true,
      maxlenght: [40, "Tutorial title too long"],
      maxlenght: [10, "Tutorial title too short"],
    },
    description: {
      type: String,
      required: [true, "Tutorial must have a description"],
      unique: true,
      trim: true,
      maxlenght: [300, "Tutorial description too long"],
      maxlenght: [40, "Tutorial description too short"],
    },
    published: Boolean,
  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Tutorial = mongoose.model("Tutorial", tutorialSchema);

module.exports = Tutorial;
