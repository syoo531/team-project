const { Router } = require("express");
const listController = require("../controllers/listController");

const router = Router();

router.get("/search", listController.getPopUpList);

module.exports = router;
