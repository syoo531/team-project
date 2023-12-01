const interestService = require("../services/interestService");

async function getInterestPopupStore(req, res) {
  const { id } = req.params;
  const userEmail = req.decoded.user.email;

  try {
    const result = await interestService.getInterestPopupStore({
      id,
      userEmail,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function addInterestPopupStore(req, res) {
  const { popupStoreId } = req.body;
  const userEmail = req.decoded.user.email;

  try {
    const result = await interestService.addInterestPopupStore({
      userEmail,
      popupStoreId,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function deleteInterestPopupStore(req, res) {
  const { id } = req.params;
  const userEmail = req.decoded.user.email;
  try {
    const result = await interestService.deleteInterestPopupStore({
      id,
      userEmail,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function getMyInterestPopupStore(req, res) {
  const userEmail = req.decoded.user.email;

  try {
    const result = await interestService.getMyInterestPopupStore({
      userEmail,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

module.exports = {
  getMyInterestPopupStore,
  addInterestPopupStore,
  getInterestPopupStore,
  deleteInterestPopupStore,
};
