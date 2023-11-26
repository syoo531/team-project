const { Router } = require("express");
const {
  createPopupStore,
  getPopupStore,
  getAllStores,
  updatePopupStore,
  deletePopupStore,
  deleteImage,
  getAllUsers,
} = require("../controllers/popupStoreController");

const router = Router();

router.get("/users", getAllUsers);
router.post("/", createPopupStore);
router.get("/:id", getPopupStore);
router.patch("/:id", updatePopupStore);
router.delete("/:id", deletePopupStore);
router.delete("/image/:id", deleteImage);
router.get("/", getAllStores);

module.exports = router;
