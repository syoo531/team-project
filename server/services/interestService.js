const { User } = require("../models/index");
const { Interest } = require("../models/index");

async function addInterestPopupStore({ userEmail, popupStoreId }) {
  const user = await User.find({ email: userEmail });
  const interestPopupStore = await Interest.create({
    user: user[0]._id,
    popup_store: popupStoreId,
  });

  return interestPopupStore;
}

async function getInterestPopupStore({ userEmail }) {
  const user = await User.findOne({ email: userEmail }).select("_id");

  const interestPopupStore = await Interest.find({
    user: user._id,
  }).populate({
    path: "popup_store",
    select: ["name", "mainImage"],
    populate: {
      path: "mainImage",
      select: ["url"],
    },
  });

  return interestPopupStore;
}

module.exports = { addInterestPopupStore, getInterestPopupStore };
