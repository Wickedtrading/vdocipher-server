const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 3000;
const VDO_API_SECRET = process.env.VDO_API_SECRET;
const VIDEO_ID = process.env.VIDEO_ID;

app.use(express.json());

// 🧠 Webhook endpoint: logs playback/analytics events from VdoCipher
app.post("/vdocipher-webhook", (req, res) => {
  const event = req.body;
  console.log("🎬 Received VdoCipher webhook event:", event);
  res.sendStatus(200);
});

// 🔐 OTP generation endpoint: creates one-time playback tokens
app.post("/vdo-otp", async (req, res) => {
  const { user } = req.body;

  try {
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${VIDEO_ID}/otp`,
      {
        ttl: 300, // valid for 5 minutes
        userId: user?.id || "unknown",
        watermark: { text: `${user?.name || "Guest"} (${user?.email || "N/A"})` }
      },
      { headers: { Authorization: `Apisecret ${VDO_API_SECRET}` } }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Error getting OTP:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get OTP" });
  }
});

// 🧪 Test route for browser
app.get("/", (req, res) => {
  res.send("✅ VdoCipher tracking + OTP server is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
