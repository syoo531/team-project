const { PopupStore, Image, User } = require("../models");

class PopupService {
  async createPopupStore(bodyData) {
    console.log("create popupstore", bodyData);
    const store = await PopupStore.create(bodyData);

    //각각 이미지에 대한 도큐먼트 생성 후 팝업스토어 컬렉션에 배열로 저장
    const { imageURL, mainURL } = bodyData;
    const imagePromises = imageURL.map(async (file) => {
      const newImage = await Image.create({
        ...file,
        popup_store: store._id,
      });
      store.images.push(newImage._id);
      return newImage;
    });

    //메인 이미지는 별도로 저장
    const mainImage = await Image.create({
      ...mainURL,
      popup_store: store._id,
    });
    store.mainImage = mainImage._id;

    await Promise.all(imagePromises);
    await store.save();
    return { store, imagePromises };
  }

  async getStore(id) {
    const storeData = await PopupStore.findById(id)
      .populate("mainImage")
      .populate("images");
    return storeData;
  }

  async getAllStores(reqQuery) {
    const { page, limit, search, category, start_date, end_date, status } =
      reqQuery;
    const limitPerPage = limit || 10; //기본 10개로 제한
    const skipCount = (Number(page) - 1) * limitPerPage;

    let query = {};
    if (search) {
      query = {
        $or: [
          { name: { $regex: new RegExp(search, "i") } },
          { brand: { $regex: new RegExp(search, "i") } },
        ],
      };
    }

    if (start_date) {
      query.start_date = { $gte: new Date(start_date) };
    }

    if (end_date) {
      query.end_date = { $lte: new Date(end_date) };
    }

    if (category) {
      query = { ...query, category };
    }

    if (status && status == "running") {
      query.start_date = { $lte: new Date() };
      query.end_date = { $gte: new Date() };
    }

    if (status && status == "closed") {
      query.end_date = { $lt: new Date() };
    }

    if (status && status == "scheduled") {
      query.start_date = { $gt: new Date() };
    }

    console.log(query);
    const data = await PopupStore.find(query)
      .sort({ _id: -1 })
      .limit(limitPerPage)
      .skip(skipCount)
      .populate("mainImage")
      .populate("images");

    const totalStores = await PopupStore.countDocuments(query);

    return {
      data,
      totalStores,
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(totalStores / limitPerPage),
    };
  }

  async updateStore(bodyData, storeId) {
    let popupStore = await PopupStore.findByIdAndUpdate(storeId, bodyData, {
      new: true,
    });

    //바디에 이미지가 있는 경우 이미지 업데이트
    const { newImageUrl, newMain } = bodyData;
    if (newImageUrl) {
      const imagePromises = newImageUrl.map(async (file) => {
        const newImage = await Image.create({
          ...file,
          popup_store: popupStore._id,
        });
        popupStore.images.push(newImage._id);
        return newImage;
      });
      await Promise.all(imagePromises);
    }

    if (newMain) {
      await Image.findByIdAndDelete(popupStore.mainImage);
      const mainImage = await Image.create({
        ...newMain,
        popup_store: popupStore._id,
      });
      popupStore.mainImage = mainImage._id;
    }

    await popupStore.save();
    return popupStore;
  }

  async deleteStore(id) {
    const allImages = await Image.find({ popup_store: id });

    const deleteImagePromises = allImages.map(async (image) => {
      await Image.findByIdAndDelete(image._id);
    });
    await Promise.all(deleteImagePromises);

    const deletedPopupStore = await PopupStore.findByIdAndDelete(id);
    return deletedPopupStore;
  }

  async deleteImage(id) {
    const deletedImage = await Image.findByIdAndDelete(id);
    console.log(deletedImage);

    //팝업스토어 이미지 배열에서 특정 이미지 삭제 (이미지 도큐먼트가 삭제되어도 배열에서는 삭제가 안되서 따로 pull해줘야함)
    const popupStore = await PopupStore.findOneAndUpdate(
      { images: id },
      { $pull: { images: id } },
      { new: true }
    );

    console.log(popupStore);
    return popupStore;
  }

  async getAllUsers(page, limit, search) {
    const limitPerPage = limit || 10; //기본 10개로 제한
    const skipCount = (Number(page) - 1) * limitPerPage;
    const totalUsers = await User.countDocuments({});

    let query = {};
    if (search) {
      query.name = { $regex: new RegExp(search, "i") };
    }

    const data = await User.find(query)
      .sort({ _id: -1 })
      .limit(limitPerPage)
      .skip(skipCount);

    //오늘 가입한 사용자 수
    const today = new Date().toDateString();
    const newUserToday = await User.find({
      createdAt: {
        $gte: today,
      },
    });

    return {
      data,
      newUserToday,
      totalUsers,
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(totalUsers / limitPerPage),
    };
  }
}

module.exports = PopupService;
