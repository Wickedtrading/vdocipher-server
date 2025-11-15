const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname))); // serve watch.html + assets

const VDO_API_SECRET = process.env.VDO_API_SECRET; // MUST be set in Render Env Vars

// ===============================
//     OTP ENDPOINT
// ===============================
app.post("/vdo-otp", async (req, res) => {
  const { user, videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ error: "Missing videoId" });
  }

  try {
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      {
        ttl: 300, // 5 minutes
        userId: user?.id || "unknown",
        watermark: {
          text: `${user?.name || "Guest"} (${user?.email || "N/A"})`,
        },
      },
      {
        headers: {
          Authorization: `Apisecret ${VDO_API_SECRET}`, // CORRECT format
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("❌ Error getting OTP:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

// ===============================
//       ROOT MESSAGE
// ===============================
app.get("/", (req, res) => {
  res.send("✅ VdoCipher server running with dynamic video playback!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
