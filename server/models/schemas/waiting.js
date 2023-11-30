const { Schema, SchemaTypes } = require("mongoose");

const waitingSchema = new Schema(
  {
    date: Date,
    people: Number,
    popup_store: {
      type: SchemaTypes.ObjectId,
      ref: "PopupStore",
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    is_enter: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = waitingSchema;
