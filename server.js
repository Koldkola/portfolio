const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Database = require('better-sqlite3');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST"]
  }
});
const port = process.env.PORT || 3000;

// Initialize SQLite database
const dbPath = path.join(__dirname, 'data', 'portfolio.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL'); // Enable WAL mode for better concurrency

// Create tables if they don't exist
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

// Security middleware
app.use(helmet());

// Strict Content Security Policy to prevent XSS and unauthorized script execution
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "data:", "https:"],
    connectSrc: ["'self'", "https://api.openai.com"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    objectSrc: ["'none'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"]
  }
}));

// Prevent MIME type sniffing
app.use(helmet.noSniff());

// Prevent clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Disable client-side caching for sensitive data
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Rate limiting for password attempts (admin endpoints)
const passwordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many password attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.method !== 'POST' || !req.path.includes('admin')
});

app.use(passwordLimiter);

// Limit CORS to specific origins in production
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '5mb' })); // Limit JSON payload size

// API routes MUST be defined before static file serving
// This ensures /api/* routes are not caught by the static middleware

// Simple proxy to OpenAI Chat completions. Expects {message: '...'} in body.
async function handleChat(req, res) {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'No message provided' });
  if (typeof message !== 'string' || message.length > 1000) {
    return res.status(400).json({ error: 'Invalid message format or length' });
  }

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    const reply = simpleBotReply(message);
    return res.json({ reply, source: 'local' });
  }

  try {
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: message }],
      max_tokens: 300
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    const reply = resp.data.choices?.[0]?.message?.content || 'Sorry, no reply.';
    res.json({ reply, source: 'openai' });
  } catch (err) {
    console.error('Chat error:', err.message || err);
    res.status(500).json({ error: 'Request failed. Please try again.' });
  }
}

app.post('/api/chat', handleChat);

// Get all board entries from database
app.get('/api/board/entries', (req, res) => {
  try {
    const entries = db.prepare('SELECT * FROM board_entries ORDER BY timestamp DESC').all();
    res.json({ entries: entries });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to retrieve entries' });
  }
});

// Add new board entry to database
app.post('/api/board/entries', (req, res) => {
  const { name, text, age, bgColor, textColor, photo, timestamp } = req.body;
  
  // Validate input
  if (!name || !text) {
    return res.status(400).json({ error: 'Name and text are required' });
  }
  
  try {
    // Sanitize input
    const sanitizedEntry = {
      name: sanitizeInput(name),
      text: sanitizeInput(text),
      age: age ? parseInt(age) : null,
      bgColor: bgColor || '#ffd97d',
      textColor: textColor || '#333',
      photo: photo ? sanitizePhotoData(photo) : null,
      timestamp: timestamp || new Date().toISOString()
    };
    
    // Insert into database
    const stmt = db.prepare(`
      INSERT INTO board_entries (name, text, age, bgColor, textColor, photo, timestamp)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      sanitizedEntry.name,
      sanitizedEntry.text,
      sanitizedEntry.age,
      sanitizedEntry.bgColor,
      sanitizedEntry.textColor,
      sanitizedEntry.photo,
      sanitizedEntry.timestamp
    );
    
    res.status(201).json({ 
      success: true, 
      entry: {
        ...sanitizedEntry,
        id: result.lastInsertRowid
      }
    });
  } catch (error) {
    console.error('Database error:', error.message || error);
    res.status(500).json({ 
      error: 'Failed to save entry',
      details: error.message 
    });
  }
});

// Delete board entry (admin only - requires password)
app.delete('/api/board/entries/:id', (req, res) => {
  // This endpoint requires admin authentication
  // For now, we're not implementing delete functionality
  res.status(403).json({ error: 'Unauthorized' });
});

// Sanitize text input
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 500) // Limit length
    .trim();
}

// Sanitize photo data (base64 validation)
function sanitizePhotoData(photo) {
  if (typeof photo !== 'string') return null;
  // Ensure it looks like valid base64 image data
  if (!photo.startsWith('data:image/')) return null;
  if (photo.length > 5000000) return null; // Limit to ~5MB
  return photo;
}

function simpleBotReply(msg) {
  const lower = (msg || '').toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return "Hi! I'm a local helper bot. Ask me about the site or your projects.";
  if (lower.includes('project')) return "I build web apps, interfaces, and small tools. Check the Projects page for examples.";
  if (lower.includes('contact')) return "Use the Contact page or email me at: Kenechi596@gmail.com";
  return "Nice question! I don't have an OpenAI key configured, so I'm replying with a canned response. Provide OPENAI_API_KEY to enable full AI chat.";
}

// Serve static files - MUST be after API routes
app.use(express.static('public'));

// Export handler for serverless platforms that `require()` this file (optional)
module.exports = {
  app,
  handleChat,
  db
};

if (require.main === module) {
  server.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  
  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    server.close(() => {
      db.close();
      console.log('Database connection closed');
      process.exit(0);
    });
  });
}

// WebRTC Signaling Server
const rooms = new Map(); // Store active rooms and their participants

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(socket.id);
    
    // Notify existing users in the room
    const roomUsers = Array.from(rooms.get(roomId));
    socket.to(roomId).emit('user-joined', { userId: socket.id, totalUsers: roomUsers.length });
    
    // Send current room info to the new user
    socket.emit('room-joined', { roomId, totalUsers: roomUsers.length, users: roomUsers });
    
    console.log(`User ${socket.id} joined room ${roomId}. Total users: ${roomUsers.length}`);
  });

  // WebRTC signaling: offer
  socket.on('offer', ({ offer, roomId, targetId }) => {
    console.log(`Offer from ${socket.id} to ${targetId} in room ${roomId}`);
    io.to(targetId).emit('offer', { offer, senderId: socket.id });
  });

  // WebRTC signaling: answer
  socket.on('answer', ({ answer, roomId, targetId }) => {
    console.log(`Answer from ${socket.id} to ${targetId} in room ${roomId}`);
    io.to(targetId).emit('answer', { answer, senderId: socket.id });
  });

  // WebRTC signaling: ICE candidate
  socket.on('ice-candidate', ({ candidate, roomId, targetId }) => {
    console.log(`ICE candidate from ${socket.id} to ${targetId}`);
    io.to(targetId).emit('ice-candidate', { candidate, senderId: socket.id });
  });

  // Leave room
  socket.on('leave-room', (roomId) => {
    if (rooms.has(roomId)) {
      rooms.get(roomId).delete(socket.id);
      if (rooms.get(roomId).size === 0) {
        rooms.delete(roomId);
      }
      socket.to(roomId).emit('user-left', { userId: socket.id });
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Clean up rooms
    rooms.forEach((users, roomId) => {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        socket.to(roomId).emit('user-left', { userId: socket.id });
        if (users.size === 0) {
          rooms.delete(roomId);
        }
      }
    });
  });
});

module.exports = app;
