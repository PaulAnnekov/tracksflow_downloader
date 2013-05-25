var injectedData = {
  i18n: {
    downloadButtonTitle: chrome.i18n.getMessage('downloadButtonTitle'),
    playlistPlayWarn: chrome.i18n.getMessage('playlistPlayWarn')
  }
};

var doc = document.head||document.documentElement;

var injectScriptData = document.createElement('script');
injectScriptData.textContent = 'var tfdData=' + JSON.stringify(injectedData);
doc.appendChild(injectScriptData);

var injectScript = document.createElement('script');
injectScript.src = chrome.extension.getURL("js/tfd-inject.js");
doc.appendChild(injectScript);

var injectStyle = document.createElement('link');
injectStyle.type = 'text/css';
injectStyle.rel = 'stylesheet';
injectStyle.href = chrome.extension.getURL("css/tfd-inject.css");
injectStyle.media = 'screen';
doc.appendChild(injectStyle);

document.addEventListener("tfd-localize", function(e) {
  var from = e.target;
  if (from) {
    // Deserialize the string
    var transferredData = JSON.parse(from.value);
    // Trigger callback, to finish the event, so that the temporary element can be removed
    var o_event = document.createEvent('Events');
    o_event.initEvent('action', true, false);
    from.value = "Example. Test. This is the response";
    from.dispatchEvent(o_event);
  }
}, true);



