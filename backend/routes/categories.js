const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./data/data.json";

// GET /categories - Fetch all categories
router.get("/", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read data file" });
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData.categories);
  });
});

module.exports = router;
