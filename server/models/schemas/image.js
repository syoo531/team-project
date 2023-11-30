const { Schema, SchemaTypes } = require("mongoose");

const ImageSchema = new Schema(
  {
    url: String,
    Key: String,
    ContentType: String,
    popup_store: {
      type: SchemaTypes.ObjectId,
      ref: "PopupStore",
    },
  },
  { timestamps: true },
);

module.exports = ImageSchema;
