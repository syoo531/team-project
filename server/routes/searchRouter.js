const { Router } = require("express");
const searchController = require("../controllers/searchController");

const router = Router();

router.get("/", searchController.getSearchWord);

router.post("/", searchController.createKeyword);

module.exports = router;
