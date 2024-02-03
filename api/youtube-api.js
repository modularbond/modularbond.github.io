const allowCors = fn => async (req, res) => {
    // Dynamically set the allowed origin based on the request origin
    const allowedOrigins = ['https://www.modular.bond', 'https://www.modularbond-github-o3hgd4j9m-yosephlin.vercel.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  
    // Set other CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    
    // Handle pre-flight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  
    return await fn(req, res);
  };
  
  // Your handler function here
  const handler = async (req, res) => {
    // Your existing logic...
  };
  
  module.exports = allowCors(handler);
  