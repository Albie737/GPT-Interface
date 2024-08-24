document.getElementById('sendMessage').addEventListener('click', async () => {
    const selectedApiKeyOption = document.querySelector('input[name="apiKeyOption"]:checked').value;
    const modelVersion = document.getElementById('modelVersion').value;
    const message = document.getElementById('chatInput').value;
    let apiKey = '';

    if (selectedApiKeyOption === 'userKey') {
        apiKey = document.getElementById('apiKey').value;
        if (!apiKey) {
            alert('Please enter your API Key.');
            return;
        }
    }

    const chatOutput = document.getElementById('chatOutput');
    const userMessageElement = document.createElement('div');
    userMessageElement.textContent = `You: ${message}`;
    chatOutput.appendChild(userMessageElement);

    // Scroll to the bottom
    chatOutput.scrollTop = chatOutput.scrollHeight;

    try {
        const response = await fetch('/api/sendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: modelVersion,
                message: message
            })
        });

        // Ensure the response is OK
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        // Parse the JSON response
        const data = await response.json();

        // Display ChatGPT response
        const botMessageElement = document.createElement('div');
        botMessageElement.textContent = `ChatGPT: ${data.response}`;
        chatOutput.appendChild(botMessageElement);

    } catch (error) {
        console.error('Fetch error:', error);

        const errorMessageElement = document.createElement('div');
        errorMessageElement.textContent = `Error: ${error.message}`;
        chatOutput.appendChild(errorMessageElement);
    }

    // Clear the input field
    document.getElementById('chatInput').value = '';
    chatOutput.scrollTop = chatOutput.scrollHeight;
});
