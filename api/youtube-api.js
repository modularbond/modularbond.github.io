// /api/youtube-api.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const apiKey = process.env.youtubeAPI; // Ensure this is set in your Vercel project settings
    const channelId = 'YOUR_CHANNEL_ID';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // Process and send back the data as needed
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data from YouTube API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};
