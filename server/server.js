const express = require("express");

console.log("server file started");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend works");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});