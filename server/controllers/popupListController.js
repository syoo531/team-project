const popupListService = require("../services/popupListService");

async function getAllPopUpList(req, res) {
  try {
    const result = await popupListService.getAllPopUpList();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function endSoonPopUpList(req, res) {
  try {
    const result = await popupListService.endSoonPopUpList();
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function recommendPopUpList(req, res) {
  try {
    const result = await popupListService.recommendPopUpList(
      req.decoded.user.email
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function pagingPopUpList(req, res) {
  try {
    const result = await popupListService.pagingPopUpList(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function getPopUpStore(req, res) {
  const { id } = req.params;
  console.log(1);
  try {
    const result = await popupListService.getPopUpStore(id);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function searchPopUpList(req, res) {
  try {
    const result = await popupListService.searchPopUpList(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function filterPopUpList(req, res) {
  try {
    const result = await popupListService.filterPopUpList(req.query);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

module.exports = {
  getAllPopUpList,
  pagingPopUpList,
  getPopUpStore,
  searchPopUpList,
  filterPopUpList,
  endSoonPopUpList,
  recommendPopUpList,
};
