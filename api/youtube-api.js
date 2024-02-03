module.exports = async (req, res) => {
    // Set CORS headers for all responses
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allows any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Adjust based on the methods your API supports
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allows headers such as Content-Type

    // Handle pre-flight requests for CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    let fetch;
    try {
        fetch = (await import('node-fetch')).default;
    } catch (error) {
        console.error('Error importing node-fetch:', error);
        return res.status(500).json({ error: 'Failed to import node-fetch' });
    }

    const apiKey = process.env.youtubeAPI;
    const channelId = 'UCXwQ7RZ8pBb4KO-_MI2ff2w';
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

    try {
        const youtubeResponse = await fetch(apiUrl);
        const youtubeData = await youtubeResponse.json();
        res.json(youtubeData);
    } catch (error) {
        console.error('Error calling YouTube API:', error);
        res.status(500).json({ error: 'Failed to fetch data from YouTube API' });
    }
};
