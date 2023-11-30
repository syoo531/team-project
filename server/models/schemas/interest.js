const { Schema, SchemaTypes } = require("mongoose");

const InterestSchema = new Schema(
  {
    popup_store: {
      type: SchemaTypes.ObjectId,
      ref: "PopupStore",
      require: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      require: true,
    },
  },
  { timestamps: true },
);

module.exports = InterestSchema;
