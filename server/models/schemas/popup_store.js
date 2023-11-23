const { Schema, SchemaTypes } = require("mongoose");

const PopupStoreSchema = new Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    summary: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    notice: {
      type: String,
      require: true,
    },
    start_date: {
      type: Date,
      require: true,
    },
    end_date: {
      type: Date,
      require: true,
    },
    image: {
      type: SchemaTypes.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
);

module.exports = PopupStoreSchema;
