module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://modular.bond'); // Allow only your site to access
    res.setHeader('Access-Control-Allow-Methods', 'GET'); // Optional: Customize which methods are allowed
    // You might also need to handle pre-flight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        res.status(200).end();
        return;
    }

    const apiKey = process.env.youtubeAPI; // Access the YouTube API key securely
    // Your existing code to fetch from the YouTube API and respond...
};
