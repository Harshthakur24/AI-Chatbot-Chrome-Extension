document.addEventListener("DOMContentLoaded", function () {
    const apiKeyInput = document.getElementById("apiKey");
    const saveButton = document.getElementById("saveButton");
    const statusMessage = document.getElementById("statusMessage");

    chrome.storage.local.get("geminiApiKey", function (data) {
        if (data.geminiApiKey) {
            apiKeyInput.value = data.geminiApiKey;
        }
    }); 

    saveButton.addEventListener("click", function () {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            chrome.storage.local.set({ geminiApiKey: apiKey }, function () {
                statusMessage.textContent = "API Key saved successfully!";
                statusMessage.style.color = "green";
                setTimeout(() => {
                    statusMessage.textContent = "";
                }, 2000);
            });
        } else {
            statusMessage.textContent = "Please enter a valid API Key!";
            statusMessage.style.color = "red";
        }
    });
});
