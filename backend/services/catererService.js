const catererRepository = require("../repositories/catererRepository");
const seedCaterers = require("../data/seedCaterers");
const validateCatererPayload = require("../utils/validateCatererPayload");
const getUuidV4 = require("../utils/getUuidV4");

function createServiceError(status, message, details) {
  return {
    status,
    message,
    details,
  };
}

async function getAllCaterers() {
  return catererRepository.findAllSortedByName();
}

async function getCatererById(id) {
  if (!id || typeof id !== "string") {
    throw createServiceError(404, "Caterer not found");
  }

  const caterer = await catererRepository.findById(id);
  if (!caterer) {
    throw createServiceError(404, "Caterer not found");
  }

  return caterer;
}

async function createCaterer(payload) {
  const { valid, errors, data } = validateCatererPayload(payload);
  if (!valid) {
    throw createServiceError(400, "Validation failed", errors);
  }

  return catererRepository.create(data);
}

async function seedIfEmpty() {
  const count = await catererRepository.count();
  if (count === 0) {
    await catererRepository.insertMany(seedCaterers);
    // eslint-disable-next-line no-console
    console.log("Seeded initial caterers");
  }
}

async function backfillCustomIds() {
  const docsWithoutCustomId = await catererRepository.findWithoutCustomId();
  if (docsWithoutCustomId.length === 0) {
    return;
  }

  await Promise.all(
    docsWithoutCustomId.map((doc) =>
      catererRepository.updateCustomIdByMongoId(doc._id, getUuidV4())
    )
  );

  // eslint-disable-next-line no-console
  console.log(`Backfilled custom ids for ${docsWithoutCustomId.length} caterers`);
}

module.exports = {
  getAllCaterers,
  getCatererById,
  createCaterer,
  seedIfEmpty,
  backfillCustomIds,
};
