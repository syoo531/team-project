const { Router } = require("express");
const popupListController = require("../controllers/popupListController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.get("/", popupListController.getAllPopUpList);

router.get("/endSoon", popupListController.endSoonPopUpList);

router.get("/recommend", validateToken, popupListController.recommendPopUpList);

router.get("/all/:id", popupListController.getPopUpStore);

router.get("/all", popupListController.pagingPopUpList);

router.get("/search", popupListController.searchPopUpList);

router.get("/filter", popupListController.filterPopUpList);

module.exports = router;
