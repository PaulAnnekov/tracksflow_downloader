var injectedData = {
  i18n: {
    downloadButtonTitle: chrome.i18n.getMessage('downloadButtonTitle'),
    playlistPlayWarn: chrome.i18n.getMessage('playlistPlayWarn')
  }
};

var doc = document.head||document.documentElement;

// Inject vars.
var injectScriptData = document.createElement('script');
injectScriptData.textContent = 'var tfdData=' + JSON.stringify(injectedData);
doc.appendChild(injectScriptData);

// Inject script.
var injectScript = document.createElement('script');
injectScript.src = chrome.extension.getURL("js/tfd-inject.js");
doc.appendChild(injectScript);

// Inject style.
var injectStyle = document.createElement('link');
injectStyle.type = 'text/css';
injectStyle.rel = 'stylesheet';
injectStyle.href = chrome.extension.getURL("css/tfd-inject.css");
injectStyle.media = 'screen';
doc.appendChild(injectStyle);



