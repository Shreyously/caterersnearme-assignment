const mongoose = require("mongoose");
const getUuidV4 = require("../utils/getUuidV4");

const catererSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: getUuidV4,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    pricePerPlate: {
      type: Number,
      required: true,
      min: 0,
    },
    cuisines: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "cuisines must be a non-empty array",
      },
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

catererSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model("Caterer", catererSchema);
