document.getElementById('sendMessage').addEventListener('click', async () => {
    const selectedApiKeyOption = document.querySelector('input[name="apiKeyOption"]:checked').value;
    const modelVersion = selectedApiKeyOption === 'limited' ? 'gpt-4o-mini' : document.getElementById('modelVersion').value;
    const message = document.getElementById('chatInput').value;
    let apiKey = '';

    if (selectedApiKeyOption === 'userKey') {
        apiKey = document.getElementById('apiKey').value;
        if (!apiKey) {
            alert('Please enter your API Key.');
            return;
        }
    } else {
        // Use the rate-limited API key
        apiKey = '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';
    }

    const chatOutput = document.getElementById('chatOutput');
    const userMessageElement = document.createElement('div');
    userMessageElement.textContent = `You: ${message}`;
    chatOutput.appendChild(userMessageElement);

    chatOutput.scrollTop = chatOutput.scrollHeight;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelVersion,
                prompt: message,
                max_tokens: 150
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const botMessageElement = document.createElement('div');
        botMessageElement.textContent = `ChatGPT: ${data.choices[0].text.trim()}`;
        chatOutput.appendChild(botMessageElement);

    } catch (error) {
        console.error('Fetch error:', error);

        const errorMessageElement = document.createElement('div');
        errorMessageElement.textContent = `Error: ${error.message}`;
        chatOutput.appendChild(errorMessageElement);
    }

    document.getElementById('chatInput').value = '';
    chatOutput.scrollTop = chatOutput.scrollHeight;
});
