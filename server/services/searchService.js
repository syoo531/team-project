const { Search } = require("../models/index");

async function getSearchWord() {
  const popularKeywords = await Search.find().sort({ searchCount: -1 });
  return popularKeywords;
}

async function createKeyword(keyword) {
  const check = await Search.findOne(keyword);
  if (check) {
    await Search.findOneAndUpdate(keyword, { $inc: { searchCount: 1 } });
    return;
  }
  const newKeyword = await Search.create(keyword);
  return newKeyword;
}

module.exports = { getSearchWord, createKeyword };
