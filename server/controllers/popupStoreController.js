const { PopupStore } = require("../models");
const { Image } = require("../models");

//! CREATE STORE
const createPopupStore = async (req, res) => {
  console.log(req.body);
  try {
    //팝업스토어 정보 저장
    const newStore = new PopupStore(req.body);
    const storeData = await newStore.save();

    //이미지 DB에 팝업스토어 이미지 저장
    const { main_image_url, thumbnail_image_url, detail_image_url } = req.body;
    const images = new Image({
      main_image_url,
      thumbnail_image_url,
      detail_image_url,
      popup_store: storeData._id,
    });
    const savedImages = await images.save();

    storeData.image = savedImages._id;
    await storeData.save();

    res.status(200).json({ storeData, savedImages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! GET ONE STORE
const getPopupStore = async (req, res) => {
  const { id } = req.params;
  try {
    const storeData = await PopupStore.findById(id).populate("image");

    if (!storeData) {
      return res.status(404).json({ message: "Popup Store not found" });
    }

    res.status(200).json(storeData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! GET ALL STORES
const getAllStores = async (req, res) => {
  try {
    const { page, limit } = req.query;

    const limitPerPage = limit || 10; //기본 10개로 제한
    const skipCount = (Number(page) - 1) * limitPerPage;
    const totalStores = await PopupStore.countDocuments({});

    const data = await PopupStore.find()
      .sort({ _id: -1 })
      .limit(limitPerPage)
      .skip(skipCount)
      .populate("image");

    res.status(200).json({
      data,
      totalStores,
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(totalStores / limitPerPage),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! UPDATE STORE DATA
const updatePopupStore = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  try {
    const imageProperties = [
      "main_image_url",
      "thumbnail_image_url",
      "detail_image_url",
    ];
    //바디에 이미지 데이터가 있는 경우 이미지 DB 업데이트
    if (imageProperties.some((prop) => req.body[prop] !== undefined || null)) {
      const images = await Image.findOne({ popup_store: id });

      if (!images) {
        return res.status(404).json({ message: "Image collection not found" });
      }

      for (const prop of imageProperties) {
        if (req.body[prop]) images[prop] = req.body[prop];
      }
      await images.save();
    }

    const popupStore = await PopupStore.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("image");

    if (!popupStore) {
      return res.status(404).json({ message: "Popup Store not found" });
    }

    res.status(200).json(popupStore);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//! DELETE STORE DATA
const deletePopupStore = async (req, res) => {
  const { id } = req.params;

  try {
    const { image } = await PopupStore.findById(id).populate("image");

    const [deletedPopupStore, deletedImage] = await Promise.all([
      PopupStore.findByIdAndDelete(id),
      Image.findByIdAndDelete(image._id),
    ]);

    if (!deletedPopupStore && !deletedImage) {
      return res.status(404).json({ message: "Error during deletion" });
    }

    res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createPopupStore,
  getPopupStore,
  getAllStores,
  updatePopupStore,
  deletePopupStore,
};
