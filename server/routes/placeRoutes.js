const express = require("express");
const router = express.Router();
const { searchPlaces, getPlacesToVisit } = require("../controllers/placeController");

router.get("/search", searchPlaces);
router.get("/visit", getPlacesToVisit);

module.exports = router;