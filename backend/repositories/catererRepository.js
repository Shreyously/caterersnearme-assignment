const Caterer = require("../models/Caterer");

async function findAllSortedByName() {
  return Caterer.find().sort({ name: 1 });
}

async function findById(id) {
  return Caterer.findOne({ id });
}

async function create(catererData) {
  return Caterer.create(catererData);
}

async function count() {
  return Caterer.countDocuments();
}

async function insertMany(caterers) {
  return Caterer.insertMany(caterers);
}

async function findWithoutCustomId() {
  return Caterer.find({
    $or: [{ id: { $exists: false } }, { id: null }, { id: "" }],
  })
    .select("_id")
    .lean();
}

async function updateCustomIdByMongoId(mongoId, customId) {
  return Caterer.updateOne({ _id: mongoId }, { $set: { id: customId } });
}

module.exports = {
  findAllSortedByName,
  findById,
  create,
  count,
  insertMany,
  findWithoutCustomId,
  updateCustomIdByMongoId,
};
