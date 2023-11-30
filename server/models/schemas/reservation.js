const { Schema, SchemaTypes } = require("mongoose");

const reservationSchema = new Schema(
  {
    date: Date,
    hour: String,
    people: Number,
    status: {
      type: String,
      default: "대기중",
    },
    popup_store: {
      type: SchemaTypes.ObjectId,
      ref: "PopupStore",
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

module.exports = reservationSchema;
