const catererService = require("../services/catererService");

async function getCaterers(_req, res) {
  try {
    const caterers = await catererService.getAllCaterers();
    return res.json(caterers);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch caterers" });
  }
}

async function getCatererById(req, res) {
  try {
    const caterer = await catererService.getCatererById(req.params.id);
    return res.json(caterer);
  } catch (error) {
    if (error.status === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to fetch caterer" });
  }
}

async function createCaterer(req, res) {
  try {
    const caterer = await catererService.createCaterer(req.body);
    return res.status(201).json(caterer);
  } catch (error) {
    if (error.status === 400) {
      return res.status(400).json({
        message: error.message,
        errors: error.details,
      });
    }
    return res.status(500).json({ message: "Failed to create caterer" });
  }
}

module.exports = {
  getCaterers,
  getCatererById,
  createCaterer,
};
