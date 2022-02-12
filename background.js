console.log('background');
// let setting = '';

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled');

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
  console.log('onStartup');
});

chrome.bookmarks.onChanged.addListener((id, info) => {
  console.log('bookmarks.onChanged: ' + JSON.stringify(info));
});

chrome.bookmarks.onCreated.addListener((id, bookmark) => {
  console.log('bookmarks.onCreated: ' + JSON.stringify(bookmark));
});

chrome.bookmarks.onRemoved.addListener((id, info) => {
  console.log('bookmarks.onRemoved: ' + JSON.stringify(info));
});

chrome.commands.onCommand.addListener((command) => {
  console.log(`Command: ${command}`);
});
