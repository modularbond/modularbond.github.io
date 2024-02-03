// Import the fetch API for Node.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Retrieve the YouTube API key from environment variables
    const apiKey = process.env.youtubeAPI;
    const channelId = 'UCXwQ7RZ8pBb4KO-_MI2ff2w'; // Your YouTube Channel ID
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if there are any live broadcasts
        if (data.items && data.items.length > 0) {
            // Respond with the live broadcast details
            res.status(200).json({ live: true, data: data.items });
        } else {
            // Respond indicating the channel is not currently live
            res.status(200).json({ live: false });
        }
    } catch (error) {
        console.error('Error fetching YouTube API:', error);
        res.status(500).json({ error: 'Failed to fetch data from YouTube API' });
    }
};
