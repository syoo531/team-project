const { Router } = require("express");
const interestController = require("../controllers/interestController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.post("/", validateToken, interestController.addInterestPopupStore);

module.exports = router;
