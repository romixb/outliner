function enableProxy(scope) {
    chrome.proxy.settings.set({
        scope: scope,
        value: {
            mode: 'fixed_servers',
            rules: {
                singleProxy: {
                    scheme: 'socks5',
                    host: '127.0.0.1',
                    port: 1080
                },
                bypassList: ['<local>']
            }
        }
    }, () => {
        console.log(`Proxy enabled for ${scope}`);
    });
}

function disableProxy(scope) {
    chrome.proxy.settings.clear({ scope: scope }, () => {
        console.log(`Proxy disabled for ${scope}`);
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleProxy') {
        if (message.enabled) {
            enableProxy(message.scope);
        } else {
            disableProxy(message.scope);
        }
    }
});