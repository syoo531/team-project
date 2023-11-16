const { Schema, SchemaTypes } = require("mongoose");

const ImageSchema = new Schema(
  {
    main_image_url: String,
    thumbnail_image_url: String,
    detail_image_url: String,
    popup_store: {
      type: SchemaTypes.ObjectId,
      ref: "PopupStore",
    },
  },
  { timestamps: true }
);

module.exports = ImageSchema;