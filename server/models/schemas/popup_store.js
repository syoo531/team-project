const { Schema, SchemaTypes } = require("mongoose");

const PopupStoreSchema = new Schema(
  {
    brand: {
      type: String,
    },
    name: {
      type: String,
    },
    category: {
      type: String,
    },
    address: {
      type: String,
    },
    detail_address: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    location: {
      type: String,
    },
    summary: {
      type: String,
    },
    description: {
      type: String,
    },
    notice: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    mainImage: {
      type: SchemaTypes.ObjectId,
      ref: "Image",
    },
    images: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Image",
      },
    ],
  },
  { timestamps: true },
);

module.exports = PopupStoreSchema;
