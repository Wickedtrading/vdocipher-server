const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const VDO_API_SECRET = process.env.VDO_API_SECRET; // from environment
const VIDEO_ID = process.env.VIDEO_ID; // from environment

app.post("/vdo-otp", async (req, res) => {
  const { user } = req.body;
  try {
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${VIDEO_ID}/otp`,
      {
        ttl: 300,
        userId: user?.id || "unknown",
        watermark: {
          text: `${user?.name || "Guest"} (${user?.email || "N/A"})`,
        },
      },
      {
        headers: {
          // ✅ Correct header format:
          Authorization: `Apisecret ${VDO_API_SECRET}`,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Error getting OTP:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ VdoCipher tracking + OTP server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
