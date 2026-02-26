// Serverless function for weekly highlights - shared across all users
const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const REDIS_KEY = 'weekly:highlights';

// Fetch highlights from Redis
async function getRedisHighlights() {
  if (!REDIS_URL || !REDIS_TOKEN) {
    console.error('Redis credentials missing');
    return null;
  }
  
  try {
    const response = await fetch(`${REDIS_URL}/get/${REDIS_KEY}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
    });
    
    const data = await response.json();
    if (data.result) {
      return JSON.parse(data.result);
    }
    return null;
  } catch (error) {
    console.error('Error fetching from Redis:', error);
    return null;
  }
}

// Save highlights to Redis
async function setRedisHighlights(highlights) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    console.error('Redis credentials missing');
    return false;
  }
  
  try {
    const response = await fetch(`${REDIS_URL}/set/${REDIS_KEY}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(JSON.stringify(highlights))
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error saving to Redis:', error);
    return false;
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // GET - fetch weekly highlights
    if (req.method === 'GET') {
      const highlights = await getRedisHighlights();
      return res.status(200).json({ highlights: highlights || [] });
    }
    
    // POST - save weekly highlights (admin only - verified client-side)
    if (req.method === 'POST') {
      const { highlights } = req.body || {};
      
      if (!highlights || !Array.isArray(highlights)) {
        return res.status(400).json({ error: 'Invalid highlights data' });
      }
      
      const saved = await setRedisHighlights(highlights);
      
      if (saved) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(500).json({ error: 'Failed to save highlights' });
      }
    }
    
    // PUT - update specific highlight item
    if (req.method === 'PUT') {
      const { weekIndex, itemIndex, item } = req.body || {};
      
      let highlights = await getRedisHighlights() || [];
      
      if (highlights[weekIndex] && highlights[weekIndex].items[itemIndex]) {
        highlights[weekIndex].items[itemIndex] = item;
        const saved = await setRedisHighlights(highlights);
        
        if (saved) {
          return res.status(200).json({ success: true });
        }
      }
      
      return res.status(400).json({ error: 'Invalid update request' });
    }
    
    // DELETE - remove specific highlight item
    if (req.method === 'DELETE') {
      const { weekIndex, itemIndex } = req.body || {};
      
      let highlights = await getRedisHighlights() || [];
      
      if (highlights[weekIndex] && highlights[weekIndex].items[itemIndex] !== undefined) {
        highlights[weekIndex].items.splice(itemIndex, 1);
        const saved = await setRedisHighlights(highlights);
        
        if (saved) {
          return res.status(200).json({ success: true });
        }
      }
      
      return res.status(400).json({ error: 'Invalid delete request' });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
