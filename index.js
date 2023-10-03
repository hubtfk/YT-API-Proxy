const express = require('express');
const cors = require("cors")
const axios = require('axios');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

// Replace with your YouTube Data API URL and API key
const youtubeApiUrl =
  'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC03O7iCHrdm19HZHUxylVTQ&key=AIzaSyCKFSg6HbNMrzu0pdNK077gUSFzez_MkWQ';

let youtubeData = null;

// Fetch data from YouTube Data API and store it
async function fetchData() {
  try {
    const response = await axios.get(youtubeApiUrl);
    youtubeData = response.data;
    console.log('YouTube Data fetched and stored.');
  } catch (error) {
    console.error('Error fetching YouTube Data:', error.message);
  }
}

// Fetch data initially on server start
fetchData();

// Serve the stored YouTube Data
app.get('/api/youtube-data', (req, res) => {
  if (youtubeData) {
    res.json(youtubeData);
  } else {
    res.status(500).json({ error: 'YouTube Data not available' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
