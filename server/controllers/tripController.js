const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
  try {
    const userId = req.user.id;
    const { from, to, days, travelers } = req.body;

    if (!from || !to || !days || !travelers) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const trip = await Trip.create({
      from,
      to,
      days,
      travelers,
      userId,
    }); 

    res.json({ message: 'Trip created successfully', trip });
    } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id })
        .sort({ createdAt: -1 })

    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

