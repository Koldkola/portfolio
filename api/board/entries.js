let fallbackMemory = [];

// Sanitization functions
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').substring(0, 500);
}

function sanitizePhotoData(photo) {
  if (!photo) return null;
  if (typeof photo !== 'string') return null;
  if (!photo.startsWith('data:image/')) return null;
  if (photo.length > 5 * 1024 * 1024) return null;
  return photo;
}

// Use HTTP REST API for Upstash instead of SDK
async function getRedisEntries() {
  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!url || !token) {
      console.log('Redis credentials missing');
      return fallbackMemory;
    }

    const response = await fetch(`${url}/get/board:entries`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error('Redis GET failed:', response.status);
      return fallbackMemory;
    }

    const data = await response.json();
    return data.result ? JSON.parse(data.result) : [];
  } catch (err) {
    console.error('Redis GET error:', err.message);
    return fallbackMemory;
  }
}

async function setRedisEntries(entries) {
  try {
    const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!url || !token) {
      console.log('Redis credentials missing');
      return false;
    }

    const response = await fetch(`${url}/set/board:entries`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entries)
    });

    if (!response.ok) {
      console.error('Redis SET failed:', response.status);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Redis SET error:', err.message);
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const entries = await getRedisEntries();
      return res.status(200).json(entries);
    }

    if (req.method === 'POST') {
      const { name, text, age, bgColor, textColor, photo, timestamp } = req.body || {};

      if (!name || !text || !timestamp) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const newEntry = {
        id: Date.now(),
        name: sanitizeInput(name),
        text: sanitizeInput(text),
        age: age || null,
        bgColor: bgColor || null,
        textColor: textColor || null,
        photo: sanitizePhotoData(photo),
        timestamp,
        created_at: new Date().toISOString()
      };

      // Try Redis first
      let entries = await getRedisEntries();
      entries.unshift(newEntry);
      const saved = await setRedisEntries(entries);

      if (!saved) {
        // Fallback to memory
        console.log('Using fallback memory');
        fallbackMemory.unshift(newEntry);
      }

      return res.status(201).json({ 
        id: newEntry.id, 
        message: 'Entry saved'
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
}
