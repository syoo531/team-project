const { PopupStore } = require("../models/index");
const { User } = require("../models/index");

async function getAllPopUpList() {
  const popupStores = await PopupStore.find()
    .populate("mainImage")
    .populate("images");
  return popupStores;
}

async function seongsuPopUpList() {
  const currentDate = new Date();
  const popupStores = await PopupStore.find({
    address: { $regex: "성수", $options: "i" },
    end_date: { $gt: currentDate },
  })
    .populate("mainImage")
    .populate("images");

  return popupStores;
}

async function endSoonPopUpList() {
  const currentDate = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(currentDate.getDate() + 5);

  const query = {
    end_date: {
      $gte: currentDate,
      $lte: threeDaysLater,
    },
  };

  const popupStores = await PopupStore.find(query)
    .populate("mainImage")
    .populate("images");

  return popupStores;
}

async function recommendPopUpList(email) {
  const user = await User.find({ email });

  const popupStores = await PopupStore.find({
    category: { $in: user[0].category },
  })
    .populate("mainImage")
    .populate("images");

  return { user: user[0], popupStores };
}

async function pagingPopUpList({ pageNumber, limit }) {
  const skip = (Number(pageNumber) - 1) * Number(limit);
  const popupStores = await PopupStore.find()
    .skip(skip)
    .limit(Number(limit))
    .populate("mainImage")
    .populate("images");
  const documents = await PopupStore.countDocuments();
  const totalPages = Math.ceil(documents / Number(limit));

  return { totalPages, popupStores };
}

async function getPopUpStore(id) {
  const popupStore = await PopupStore.find({ _id: id })
    .populate("mainImage")
    .populate("images");

  return popupStore[0];
}

async function searchPopUpList({ pageNumber, limit, keyword }) {
  const skip = (Number(pageNumber) - 1) * Number(limit);
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
    .limit(Number(limit))
    .populate("mainImage")
    .populate("images");

  const documents = await PopupStore.countDocuments({
    $or: query,
  });

  const totalPages = Math.ceil(documents / Number(limit));

  return { totalPages, popupStores, documents };
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

  const skip = (Number(pageNumber) - 1) * Number(limit);
  const popupStores = await PopupStore.find(query)
    .skip(skip)
    .limit(Number(limit))
    .populate("mainImage")
    .populate("images");

  const documents = await PopupStore.countDocuments(query);

  const totalPages = Math.ceil(documents / Number(limit));

  return { totalPages, popupStores, documents };
}

async function sortingPopUpStore({ pageNumber, limit, order }) {
  const query = {};
  const currentDate = new Date();
  const skip = (Number(pageNumber) - 1) * Number(limit);

  if (order === "ongoing") {
    query.start_date = { $lte: currentDate };
    query.end_date = { $gte: currentDate };
  }

  if (order === "comingSoon") {
    query.start_date = { $gte: currentDate };
  }

  if (order === "close") {
    query.end_date = { $lte: currentDate };
  }

  const popupStores = await PopupStore.find(query)
    .skip(skip)
    .limit(Number(limit))
    .populate("mainImage")
    .populate("images");

  const documents = await PopupStore.countDocuments(query);

  const totalPages = Math.ceil(documents / Number(limit));

  return { totalPages, popupStores, documents };
}

module.exports = {
  getAllPopUpList,
  seongsuPopUpList,
  endSoonPopUpList,
  recommendPopUpList,
  pagingPopUpList,
  getPopUpStore,
  searchPopUpList,
  filterPopUpList,
  sortingPopUpStore,
};
