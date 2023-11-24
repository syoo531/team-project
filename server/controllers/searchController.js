const searchService = require("../services/searchService");

async function getSearchWord(req, res) {
  try {
    const popularKeywords = await searchService.getSearchWord();
    res.status(200).json(popularKeywords);
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

async function createKeyword(req, res) {
  try {
    await searchService.createKeyword(req.body);
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ message: "failed" });
  }
}

module.exports = { getSearchWord, createKeyword };
