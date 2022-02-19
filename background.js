clog('background');
// let setting = '';


function clog(message) {
  const d = new Date();
  console.log(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+' LOG: '+message);
}

// https://stackoverflow.com/questions/18694538/sending-message-from-popup-js-in-chrome-extension-to-background-js
chrome.runtime.onMessage.addListener(function (request) {
  clog(request.message);
});

chrome.runtime.onInstalled.addListener(() => {
  clog('onInstalled');

  chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, 'chrome.action.onClicked');
  });

  //
  // TODO: Save default settings.
  //

  //
  // Testing message-passing functions
  //

  /*
  chrome.runtime.sendMessage({ message: 'sendMessage:onInstalled' },
    function (response) {
      console.log(JSON.stringify(response));
    });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'chrome.tabs.query:onInstalled' },
      function (response) {
        console.log(response);
      });
  });
  */

});

chrome.runtime.onStartup.addListener(() => {
  clog('onStartup');
});

chrome.bookmarks.onChanged.addListener((id, info) => {
  clog('bookmarks.onChanged: ' + JSON.stringify(info));
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  clog('bookmarks.onCreated: ' + JSON.stringify(bookmark));
});

chrome.bookmarks.onRemoved.addListener((id, info) => {
  clog('bookmarks.onRemoved: ' + JSON.stringify(info));
});

chrome.commands.onCommand.addListener((command) => {
  clog(`Command: ${command}`);
});
