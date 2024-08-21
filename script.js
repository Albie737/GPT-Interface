document.getElementById('useMyApiKey').addEventListener('change', () => {
    document.getElementById('userApiKeySection').style.display = 'none';
});

document.getElementById('useUserApiKey').addEventListener('change', () => {
    document.getElementById('userApiKeySection').style.display = 'block';
});

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
    chatOutput.textContent = 'Loading...';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apiKey: apiKey,
                modelVersion: modelVersion,
                message: message,
                useMyApiKey: selectedApiKeyOption === 'myKey'
            }),
        });

        const result = await response.json();
        chatOutput.textContent = result.reply || 'No response from API.';
    } catch (error) {
        chatOutput.textContent = 'Error: ' + error.message;
    }
});
