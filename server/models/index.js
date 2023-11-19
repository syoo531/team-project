const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const PopupStoreSchema = require("./schemas/popup_store");
const ImageSchema = require("./schemas/image");
const WaitingSchema = require("./schemas/waiting");

exports.User = mongoose.model("User", UserSchema);
exports.PopupStore = mongoose.model("PopupStore", PopupStoreSchema);
exports.Image = mongoose.model("Image", ImageSchema);
exports.Waiting = mongoose.model("Waiting", WaitingSchema);
