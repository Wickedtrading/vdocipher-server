const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const VDO_API_SECRET = process.env.VDO_API_SECRET;
const VIDEO_ID = process.env.VIDEO_ID;

app.post('/vdo-otp', async (req, res) => {
  const { user } = req.body;
  try {
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${VIDEO_ID}/otp`,
      {
        ttl: 300,
        userId: user.id,
        watermark: { text: `${user.name} (${user.email})` }
      },
      { headers: { Authorization: `Apisecret ${VDO_API_SECRET}` } }
    );
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to get OTP' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
