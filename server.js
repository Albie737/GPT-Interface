const express = require('express');
const fetch = require('node-fetch');
const rateLimit = require('express-rate-limit');
const app = express();
const port = 3000;

// Rate limiting setup (adjust as needed)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

// Apply rate limiting to routes using your API key
app.use('/api/chat/myKey', limiter);

app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { apiKey, modelVersion, message, useMyApiKey } = req.body;

    try {
        const url = `https://api.openai.com/v1/engines/${modelVersion}/completions`;
        const headers = {
            'Content-Type': 'application/json'
        };

        if (useMyApiKey) {
            // Use your API key here
            headers['Authorization'] = `Bearer YOUR_API_KEY`;
        } else {
            headers['Authorization'] = `Bearer ${apiKey}`;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                prompt: message,
                max_tokens: 150
            }),
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get response from API' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
