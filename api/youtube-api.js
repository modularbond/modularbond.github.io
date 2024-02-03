const fetch = require('node-fetch');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Consider tightening this for production
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

const handler = async (req, res) => {
    const apiKey = process.env.youtubeAPI; // Make sure to define this in your Vercel project settings
    const channelId = 'UCXwQ7RZ8pBb4KO-_MI2ff2w';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

    try {
        const youtubeResponse = await fetch(apiUrl);
        const youtubeData = await youtubeResponse.json();
        res.status(200).json(youtubeData);
    } catch (error) {
        console.error('YouTube API call failed:', error);
        res.status(500).json({ error: 'Failed to fetch data from YouTube' });
    }
};

module.exports = allowCors(handler);
