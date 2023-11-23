const { Router } = require("express");
const {
  createPopupStore,
  getPopupStore,
  getAllStores,
  updatePopupStore,
  deletePopupStore,
  deleteImage,
} = require("../controllers/popupStoreController");

const router = Router();

router.post("/", createPopupStore);
router.get("/:id", getPopupStore);
router.patch("/:id", updatePopupStore);
router.delete("/:id", deletePopupStore);
router.delete("/image/:id", deleteImage);
router.get("/", getAllStores);

module.exports = router;