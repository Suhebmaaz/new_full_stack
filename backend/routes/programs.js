const express = require("express");
const fs = require("fs");
const router = express.Router();

const DATA_FILE = "./data/data.json";

// GET /programs - Fetch all programs
router.get("/", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read data file" });
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData.programs);
  });
});

// POST /programs - Save a new program
router.post("/", (req, res) => {
  const newProgram = req.body;

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read data file" });
    }
    const jsonData = JSON.parse(data);
    newProgram.id = jsonData.programs.length + 1; // Auto-increment ID
    jsonData.programs.push(newProgram);

    fs.writeFile(DATA_FILE, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Unable to save program" });
      }
      res.status(201).json({ message: "Program saved successfully" });
    });
  });
});

module.exports = router;
