const Trip = require("../models/Trip");


const createTrip = async (req, res) => {
  try {
    const { from, to, days, travelers } = req.body;

    if (!from || !to || !days || !travelers) {
      return res.status(400).json({
        message: "from, to, days, and travelers are required",
      });
    }

    const trip = await Trip.create({
      from,
      to,
      days: Number(days),
      travelers: Number(travelers),
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Trip created successfully",
      trip,
    });
  } catch (error) {
    console.error("CREATE TRIP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


const getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    return res.json({ trips });
  } catch (error) {
    console.error("GET USER TRIPS ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.json({ trip });
  } catch (error) {
    console.error("GET TRIP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


const updateTrip = async (req, res) => {
  try {
    const { from, to, days, travelers } = req.body;

    const trip = await Trip.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      {
        from,
        to,
        days: Number(days),
        travelers: Number(travelers),
      },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.json({
      message: "Trip updated successfully",
      trip,
    });
  } catch (error) {
    console.error("UPDATE TRIP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};


const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    return res.json({
      message: "Trip deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TRIP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTrip,
  getUserTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};