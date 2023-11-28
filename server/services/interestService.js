const { User } = require("../models/index");
const { Interest } = require("../models/index");

async function getInterestPopupStore({ id, userEmail }) {
  const user = await User.find({ email: userEmail });
  const interest = await Interest.find({ popup_store: id, user: user[0]._id });
  return interest;
}

async function addInterestPopupStore({ userEmail, popupStoreId }) {
  const user = await User.find({ email: userEmail });
  const interestPopupStore = await Interest.create({
    user: user[0]._id,
    popup_store: popupStoreId,
  });

  return interestPopupStore;
}

async function deleteInterestPopupStore({ id, userEmail }) {
  const user = await User.find({ email: userEmail });
  const deleted = await Interest.deleteOne({
    popup_store: id,
    user: user[0]._id,
  });
  return deleted;
}

module.exports = {
  getInterestPopupStore,
  addInterestPopupStore,
  deleteInterestPopupStore,
};
