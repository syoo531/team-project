const { Schema, SchemaTypes } = require("mongoose");

const waitingSchema = new Schema(
  {
    date: Date,
    waiting_queue: Array,
    popup_store: {
      type: SchemaTypes.ObjectId,
      ref: "PopupStore",
    },
    complete_waiting: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = waitingSchema;
