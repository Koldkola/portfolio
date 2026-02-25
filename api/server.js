const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Simple proxy to OpenAI Chat completions. Expects {message: '...'} in body.
async function handleChat(req, res) {
  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'No message provided' });

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
      }
    });

    const reply = resp.data.choices?.[0]?.message?.content || 'Sorry, no reply.';
    res.json({ reply, source: 'openai' });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
}

app.post('/api/chat', handleChat);

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
