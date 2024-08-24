// Toggle settings modal
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeButton = document.querySelector('.close');

settingsButton.onclick = function () {
    settingsModal.style.display = 'block';
}

closeButton.onclick = function () {
    settingsModal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target === settingsModal) {
        settingsModal.style.display = 'none';
    }
}

// Handling the chat input and sending messages
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
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatOutput.appendChild(messageElement);

    // Scroll to the bottom
    chatOutput.scrollTop = chatOutput.scrollHeight;

    // Simulating API response
    const responseElement = document.createElement('div');
    responseElement.textContent = "Response: [This is where the model's response will go]";
    chatOutput.appendChild(responseElement);

    chatOutput.scrollTop = chatOutput.scrollHeight;

    document.getElementById('chatInput').value = '';
});
