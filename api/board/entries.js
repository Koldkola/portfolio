import { Redis } from '@upstash/redis';

let redis;
let fallbackMemory = [];
let useRedis = false;

// Initialize Upstash Redis (on Vercel) - wrap in try/catch
try {
  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (redisUrl && redisToken) {
    redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });
    useRedis = true;
    console.log('✓ Redis initialized');
  } else {
    console.warn('⚠ Redis env vars missing');
  }
} catch (err) {
  console.error('⚠ Redis init failed:', err.message);
}

// Sanitization functions
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '').substring(0, 500);
}

function sanitizePhotoData(photo) {
  if (!photo) return null;
  if (typeof photo !== 'string') return null;
  if (!photo.startsWith('data:image/')) return null;
  if (photo.length > 5 * 1024 * 1024) return null; // 5MB limit
  return photo;
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
      if (useRedis && redis) {
        try {
          const entries = await redis.get('board:entries');
          return res.status(200).json(Array.isArray(entries) ? entries : []);
        } catch (e) {
          console.error('Redis GET error:', e.message);
          return res.status(200).json(fallbackMemory);
        }
      }
      return res.status(200).json(fallbackMemory);
    }

    if (req.method === 'POST') {
      const { name, text, age, bgColor, textColor, photo, timestamp } = req.body || {};

      if (!name || !text || !timestamp) {
        return res.status(400).json({ error: 'Missing fields' });
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

      if (useRedis && redis) {
        try {
          const entries = (await redis.get('board:entries')) || [];
          entries.unshift(newEntry);
          await redis.set('board:entries', entries);
          return res.status(201).json({ id: newEntry.id, message: 'Saved' });
        } catch (e) {
          console.error('Redis POST error:', e.message);
          fallbackMemory.unshift(newEntry);
          return res.status(201).json({ id: newEntry.id, message: 'Saved (backup)' });
        }
      }

      fallbackMemory.unshift(newEntry);
      return res.status(201).json({ id: newEntry.id, message: 'Saved' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}
