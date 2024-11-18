const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const categoriesRoutes = require("./routes/categories");
const programsRoutes = require("./routes/programs");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/categories", categoriesRoutes);
app.use("/programs", programsRoutes);
app.post("/api/combos", (req, res) => {
  const newCombo = req.body;

  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) return res.status(500).json({ message: "Error reading data" });

    const jsonData = JSON.parse(data);
    jsonData.combos.push(newCombo);

    fs.writeFile("./data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error saving data" });

      res.status(201).json({ message: "Combo saved successfully" });
    });
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
