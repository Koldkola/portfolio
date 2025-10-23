const axios = require('axios');

module.exports = async (req, res) => {
  // Vercel serverless function handler
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'No message provided' });

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) {
    // fallback simple bot
    const reply = simpleBotReply(message);
    res.status(200).json({ reply, source: 'local' });
    return;
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
    res.status(200).json({ reply, source: 'openai' });
  } catch (err) {
    console.error('OpenAI request failed:', err?.response?.data || err.message || err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
};

function simpleBotReply(msg) {
  const lower = (msg || '').toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) 
    return "Hi! I'm a local helper bot. Ask me about the site or your projects.";

  if (lower.includes('project')) 
    return "I build web apps, interfaces, and small tools. Check the Projects page for examples.";

  if (lower.includes('contact')) 
    return "Use the Contact page or email me at: Kenechi596@example.com";

  if (lower.includes('year')) 
    return "It's 2025, and the tech world is evolving fast. Stay curious.";

  if (lower.includes('who')) 
    return "I'm Kenechi's helper bot—here to guide you through the portfolio and projects.";

  return "I'm not sure how to respond to that yet. Try asking about projects, contact, or the year.";
}
