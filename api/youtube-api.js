module.exports = async (req, res) => {
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
