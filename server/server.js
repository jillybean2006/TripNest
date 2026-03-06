const express = require("express");
<<<<<<< HEAD
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/test", require("./routes/testProtected"));
app.use("/api/trip", require("./routes/tripRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));

app.get("/", (req, res) => {
  res.send("TripNest backend running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======

console.log("server file started");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend works");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> 8c97521e87be103f60ea6431101d3404b0cf7eff
