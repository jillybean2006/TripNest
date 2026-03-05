const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { createProxyMiddleware } = require("http-proxy-middleware");


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
  res.send("TravelMate Backend Running");
});

app.use(
  "/",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
  })
);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));