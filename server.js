const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

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
app.use(express.static('public'));

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

// PDF Resume with blurred phone number
const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');

app.get('/api/resume/download', async (req, res) => {
  try {
    const resumePath = path.join(__dirname, 'public', 'assets', 'resume.pdf');
    
    // Check if file exists
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    // Read the original PDF
    const pdfBuffer = fs.readFileSync(resumePath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    
    // Get first page
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    
    // Draw a white blur box at the top of the page (where phone number typically is)
    // Position: top 80px area (phone/contact info typically here)
    firstPage.drawRectangle({
      x: 0,
      y: height - 80, // Start from top
      width: width,
      height: 80,
      color: rgb(1, 1, 1), // White
      opacity: 1
    });
    
    // Optional: Add "Contact: Kenechi596@gmail.com" or "Email only" in the blurred area
    firstPage.drawText('Contact: Kenechi596@gmail.com', {
      x: 20,
      y: height - 50,
      size: 10,
      color: rgb(0, 0, 0)
    });
    
    // Save modified PDF
    const modifiedPdf = await pdfDoc.save();
    
    // Send as download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(Buffer.from(modifiedPdf));
    
  } catch (err) {
    console.error('Resume PDF error:', err.message || err);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

// View resume with blur (inline view)
app.get('/api/resume/view', async (req, res) => {
  try {
    const resumePath = path.join(__dirname, 'public', 'assets', 'resume.pdf');
    
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    const pdfBuffer = fs.readFileSync(resumePath);
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();
    
    // Draw white box to blur phone number
    firstPage.drawRectangle({
      x: 0,
      y: height - 80,
      width: width,
      height: 80,
      color: rgb(1, 1, 1),
      opacity: 1
    });
    
    // Add contact text
    firstPage.drawText('Contact: Kenechi596@gmail.com', {
      x: 20,
      y: height - 50,
      size: 10,
      color: rgb(0, 0, 0)
    });
    
    const modifiedPdf = await pdfDoc.save();
    
    // Send as inline view
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="resume.pdf"');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.send(Buffer.from(modifiedPdf));
    
  } catch (err) {
    console.error('Resume view error:', err.message || err);
    res.status(500).json({ error: 'Failed to process resume' });
  }
});

function simpleBotReply(msg) {
  const lower = (msg || '').toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return "Hi! I'm a local helper bot. Ask me about the site or your projects.";
  if (lower.includes('project')) return "I build web apps, interfaces, and small tools. Check the Projects page for examples.";
  if (lower.includes('contact')) return "Use the Contact page or email me at: Kenechi596@gmail.com";
  return "Nice question! I don't have an OpenAI key configured, so I'm replying with a canned response. Provide OPENAI_API_KEY to enable full AI chat.";
}

// Export handler for serverless platforms that `require()` this file (optional)
module.exports = {
  app,
  handleChat
};

if (require.main === module) {
  app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
}
