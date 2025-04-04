const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./duaas.db", (err) => {
    if (err) {
        console.error("Failed to connect to database:", err.message);
    } else {
        console.log("Connected to SQLite database");
    }
});

// Enhanced keyword matching for full sentences
app.get("/search", (req, res) => {
    const rawInput = req.query.q || "";
    const stopWords = new Set([
      "i", "me", "my", "you", "your", "he", "she", "it", "we", "they",
      "a", "an", "the", "and", "or", "but", "if", "in", "on", "at", "of", "for", "to", "from",
      "feel", "am", "is", "are", "was", "were", "be", "being", "been", "have", "has", "had",
      "do", "does", "did", "with", "without", "about", "that", "this", "so", "such"
  ]);
  const words = rawInput
  .toLowerCase()
  .split(/\s+/)
  .filter(word => word && !stopWords.has(word)); // filter out empty and common words

if (words.length === 0) {
  return res.json([]);
}

const placeholders = words.map(() => "keywords LIKE ?").join(" OR ");
const values = words.map(word => `%${word}%`);

const query = `SELECT * FROM duaas WHERE ${placeholders}`;

db.all(query, values, (err, rows) => {
  if (err) {
      res.status(500).json({ error: err.message });
  } else {
      res.json(rows);
  }
});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

