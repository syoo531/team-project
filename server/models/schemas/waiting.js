const { Schema, SchemaTypes } = require("mongoose");

const waitingSchema = new Schema(
  {
    date: Date,
    popup_store: {
      type: SchemaTypes.ObjectId,
      ref: "PopupStore",
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
    complete_waiting: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = waitingSchema;
