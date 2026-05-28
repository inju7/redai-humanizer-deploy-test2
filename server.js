import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;
const GROQ_API_URL = process.env.GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/api/groq', async (req, res) => {
  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not set on the server.' });
  }

  try {
    const apiRes = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const responseText = await apiRes.text();

    if (!apiRes.ok) {
      return res.status(apiRes.status).send(responseText);
    }

    try {
      const json = JSON.parse(responseText);
      return res.status(apiRes.status).json(json);
    } catch {
      return res.status(apiRes.status).send(responseText);
    }
  } catch (error) {
    console.error('Groq proxy error:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
});

app.listen(PORT, () => {
  console.log(`Groq proxy running at http://localhost:${PORT}`);
});
