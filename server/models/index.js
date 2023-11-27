const mongoose = require("mongoose");

const UserSchema = require("./schemas/user");
const PopupStoreSchema = require("./schemas/popup_store");
const ImageSchema = require("./schemas/image");
const WaitingSchema = require("./schemas/waiting");
const Reservation = require("./schemas/reservation");
const SearchSchema = require("./schemas/search");
const ReviewSchema = require("./schemas/review");
const InterestSchema = require("./schemas/interest");

exports.User = mongoose.model("User", UserSchema);
exports.PopupStore = mongoose.model("PopupStore", PopupStoreSchema);
exports.Reservation = mongoose.model("Reservation", Reservation);
exports.Image = mongoose.model("Image", ImageSchema);
exports.Waiting = mongoose.model("Waiting", WaitingSchema);
exports.Waiting = mongoose.model("Waiting", WaitingSchema);
exports.Search = mongoose.model("Search", SearchSchema);
exports.Review = mongoose.model("Review", ReviewSchema);
exports.Interest = mongoose.model("Interest", InterestSchema);
