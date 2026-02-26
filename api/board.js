let db;

// Only use better-sqlite3 in development (local/Node.js environment)
if (process.env.VERCEL !== '1') {
  const Database = require('better-sqlite3');
  const path = require('path');
  
  const dbPath = path.join(process.cwd(), 'data', 'portfolio.db');
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS board_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      text TEXT NOT NULL,
      age INTEGER,
      bgColor TEXT,
      textColor TEXT,
      photo TEXT,
      timestamp TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_timestamp ON board_entries(timestamp);
  `);
}

// In-memory fallback for Vercel (temporary storage, resets on deployment)
let entries = [];

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

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      if (db) {
        // Development: Use SQLite
        const allEntries = db.prepare('SELECT * FROM board_entries ORDER BY timestamp DESC').all();
        return res.status(200).json(allEntries);
      } else {
        // Vercel: Use in-memory storage
        return res.status(200).json(entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch entries',
        details: error.message 
      });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, text, age, bgColor, textColor, photo, timestamp } = req.body;

      // Validate required fields
      if (!name || !text || !timestamp) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          details: 'name, text, and timestamp are required'
        });
      }

      // Sanitize inputs
      const sanitizedName = sanitizeInput(name);
      const sanitizedText = sanitizeInput(text);
      const sanitizedPhoto = sanitizePhotoData(photo);

      if (db) {
        // Development: Use SQLite
        const stmt = db.prepare(`
          INSERT INTO board_entries (name, text, age, bgColor, textColor, photo, timestamp)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
          sanitizedName,
          sanitizedText,
          age || null,
          bgColor || null,
          textColor || null,
          sanitizedPhoto,
          timestamp
        );

        return res.status(201).json({ 
          id: result.lastInsertRowid,
          message: 'Entry saved successfully'
        });
      } else {
        // Vercel: Use in-memory storage
        const id = entries.length + 1;
        entries.push({
          id,
          name: sanitizedName,
          text: sanitizedText,
          age: age || null,
          bgColor: bgColor || null,
          textColor: textColor || null,
          photo: sanitizedPhoto,
          timestamp,
          created_at: new Date().toISOString()
        });

        return res.status(201).json({ 
          id,
          message: 'Entry saved successfully'
        });
      }
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        error: 'Failed to save entry',
        details: error.message 
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
