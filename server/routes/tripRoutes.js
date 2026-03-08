const express = require("express");
const router = express.Router();

const {
  createTrip,
  getUserTrips,
  getTripById,
  deleteTrip,
  updateTrip,
} = require("../controllers/tripController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/create", authMiddleware, createTrip);


router.get("/my-trips", authMiddleware, getUserTrips);



router.get("/:id", authMiddleware, getTripById);



router.put("/:id", authMiddleware, updateTrip);


router.delete("/:id", authMiddleware, deleteTrip);

module.exports = router;