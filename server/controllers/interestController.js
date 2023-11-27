const interestService = require("../services/interestService");

async function addInterestPopupStore(req, res) {
  const { popupStoreId } = req.body;
  const userEmail = req.decoded.user.email;

  console.log(popupStoreId);
  console.log(userEmail);
  try {
    const result = await interestService.addInterestPopupStore({
      userEmail,
      popupStoreId,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

module.exports = { addInterestPopupStore };
