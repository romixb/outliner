function updateUI(regularEnabled, incognitoEnabled) {
    const regularToggle = document.getElementById('regularToggle');
    const regularStatus = document.getElementById('regularStatus');
    const incognitoToggle = document.getElementById('incognitoToggle');
    const incognitoStatus = document.getElementById('incognitoStatus');

    regularToggle.checked = regularEnabled;
    regularStatus.textContent = regularEnabled ? 'Proxy is ON' : 'Proxy is OFF';

    incognitoToggle.checked = incognitoEnabled;
    incognitoStatus.textContent = incognitoEnabled ? 'Proxy is ON' : 'Proxy is OFF';
}

chrome.storage.sync.get(['regularProxyEnabled', 'incognitoProxyEnabled'], (data) => {
    const regularEnabled = data.regularProxyEnabled || false;
    const incognitoEnabled = data.incognitoProxyEnabled || false;
    updateUI(regularEnabled, incognitoEnabled);
});

document.getElementById('regularToggle').addEventListener('change', (event) => {
    const isProxyEnabled = event.target.checked;

    chrome.storage.sync.set({ regularProxyEnabled: isProxyEnabled }, () => {
        // Notify the background script to update the proxy settings
        chrome.runtime.sendMessage({ action: 'toggleProxy', scope: 'regular', enabled: isProxyEnabled });
        updateUI(isProxyEnabled, document.getElementById('incognitoToggle').checked);
    });
});


document.getElementById('incognitoToggle').addEventListener('change', (event) => {
    const isProxyEnabled = event.target.checked;

    chrome.storage.sync.set({ incognitoProxyEnabled: isProxyEnabled }, () => {
        chrome.runtime.sendMessage({ action: 'toggleProxy', scope: 'incognito_persistent', enabled: isProxyEnabled });

        updateUI(document.getElementById('regularToggle').checked, isProxyEnabled);
    });
});