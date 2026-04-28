const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple rule-based classifier
function analyzeAd(text) {
  const lower = text.toLowerCase();

  const spamSignals = [
    "limited time",
    "act now",
    "guaranteed",
    "100% profit",
    "click here",
    "free money",
    "urgent",
    "winner",
    "no risk"
  ];

  let score = 0;
  let reasons = [];
  let highlights = [];

  spamSignals.forEach(word => {
    if (lower.includes(word)) {
      score += 1;
      reasons.push(`Contains suspicious phrase: "${word}"`);
      highlights.push(word);
    }
  });

  let classification = "Safe";
  let risk = "Low";

  if (score >= 3) {
    classification = "Malicious";
    risk = "High";
  } else if (score === 2) {
    classification = "Suspicious";
    risk = "Medium";
  }

  return {
    classification,
    confidence: Math.min(0.5 + score * 0.15, 0.95),
    risk_level: risk,
    reasons,
    highlighted_text: highlights
  };
}

app.post("/analyze", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  const result = analyzeAd(text);
  res.json(result);
});

app.listen(5000, () => console.log("Server running on port 5000"));
