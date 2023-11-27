const { PopupStore } = require("../models/index");
const { User } = require("../models/index");

async function getAllPopUpList() {
  const popupStores = await PopupStore.find()
    .populate("mainImage")
    .populate("images");
  return popupStores;
}

async function endSoonPopUpList() {
  const currentDate = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(currentDate.getDate() + 3);

  const query = {
    end_date: {
      $gte: currentDate,
      $lte: threeDaysLater,
    },
  };

  const popupStores = await PopupStore.find(query);

  return popupStores;
}

async function recommendPopUpList(email) {
  const user = await User.find({ email });

  const popupStores = await PopupStore.find({
    category: { $in: user[0].category },
  });

  return { user: user[0], popupStores };
}

async function pagingPopUpList({ pageNumber, limit }) {
  const skip = (pageNumber - 1) * limit;
  const popupStores = await PopupStore.find().skip(skip).limit(limit);
  const documents = await PopupStore.countDocuments();
  const totalPages = Math.ceil(documents / limit);

  return { totalPages, popupStores };
}

async function searchPopUpList({ pageNumber, limit, keyword }) {
  const skip = (pageNumber - 1) * limit;
  const query = [
    { brand: { $regex: keyword, $options: "i" } },
    { name: { $regex: keyword, $options: "i" } },
    { category: { $regex: keyword, $options: "i" } },
    { address: { $regex: keyword, $options: "i" } },
  ];

  const popupStores = await PopupStore.find({
    $or: query,
  })
    .skip(skip)
    .limit(limit);

  const documents = await PopupStore.countDocuments({
    $or: query,
  });

  const totalPages = Math.ceil(documents / limit);

  return { totalPages, popupStores };
}

async function filterPopUpList({ pageNumber, limit, area, category, date }) {
  const query = {};

  if (area) {
    query.address = { $regex: area, $options: "i" };
  }

  if (category) {
    query.category = { $regex: category, $options: "i" };
  }

  if (date) {
    const selectDate = new Date(date);
    query.start_date = { $lte: selectDate };
    query.end_date = { $gte: selectDate };
  }

  const skip = (pageNumber - 1) * limit;
  const popupStores = await PopupStore.find(query).skip(skip).limit(limit);
  const totalPages = Math.ceil(popupStores.length / limit);

  return { totalPages, popupStores };
}

module.exports = {
  getAllPopUpList,
  endSoonPopUpList,
  recommendPopUpList,
  pagingPopUpList,
  searchPopUpList,
  filterPopUpList,
};
