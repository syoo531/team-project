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

module.exports = { addInterestPopupStore };
