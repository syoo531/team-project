const { Schema } = require("mongoose");

const SearchSchema = new Schema(
  {
    keyword: {
      type: String,
      require: true,
    },
    searchCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = SearchSchema;
