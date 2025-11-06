const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// 🧠 When VdoCipher sends playback or analytics data, it will hit this route:
app.post("/vdocipher-webhook", (req, res) => {
  const event = req.body;
  console.log("🎬 Received VdoCipher webhook event:", event);

  // You could later save this to a database, match user IDs, etc.
  res.sendStatus(200);
});

// Test route for your browser
app.get("/", (req, res) => {
  res.send("✅ VdoCipher tracking server is running and ready for webhooks!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
