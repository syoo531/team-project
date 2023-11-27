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
const validateServiceAdmin = require("../middlewares/validateServiceAdmin");

const router = Router();

router.get("/users", validateServiceAdmin, getAllUsers);
router.post("/", validateServiceAdmin, createPopupStore);
router.get("/:id", getPopupStore);
router.patch("/:id", validateServiceAdmin, updatePopupStore);
router.delete("/:id", validateServiceAdmin, deletePopupStore);
router.delete("/image/:id", validateServiceAdmin, deleteImage);
router.get("/", getAllStores);

module.exports = router;
