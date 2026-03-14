const express = require("express");
const catererController = require("../controllers/catererController");

const router = express.Router();

router.get("/", catererController.getCaterers);
router.get("/:id", catererController.getCatererById);
router.post("/", catererController.createCaterer);

module.exports = router;
