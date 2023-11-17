const { Schema, SchemaTypes } = require("mongoose");

const PopupStoreSchema = new Schema(
  {
    name: String,
    brand: String,
    category: String,
    address: String,
    location: String,
    summary: String,
    description: String,
    start_date: Date,
    end_date: Date,
    notice: String,
    image: {
      type: SchemaTypes.ObjectId,
      ref: "Image",
    },
  },
  { timestamps: true }
);

module.exports = PopupStoreSchema;
