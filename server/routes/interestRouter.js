const { Router } = require("express");
const interestController = require("../controllers/interestController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.post("/", validateToken, interestController.addInterestPopupStore);
router.get("/", validateToken, interestController.getMyInterestPopupStore);

router.get("/:id", validateToken, interestController.getInterestPopupStore);

router.delete(
  "/:id",
  validateToken,
  interestController.deleteInterestPopupStore,
);

module.exports = router;
