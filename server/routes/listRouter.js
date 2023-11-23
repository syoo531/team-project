const { Router } = require("express");
const listController = require("../controllers/listController");

const router = Router();

router.get("/", listController.getPopUpList);

module.exports = router;
