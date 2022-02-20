clog('BGROUND run');
// let setting = '';

function clog(message) {
  const d = new Date();
  console.log(d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+' LOG: '+message);
}

chrome.runtime.onInstalled.addListener(() => {
  clog('BGROUND onInstalled');
  //
  // TODO: Save default settings.
  //
});

chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, 'sidemark_onclicked');
});

/**
 * 
 * Need to return true in order to be able to send data to response function
 * https://stackoverflow.com/questions/20077487/
 * 
 */
chrome.runtime.onMessage.addListener((request, sender, response) => {
  if(request.message == 'sidemark_get_bookmarks') {
    getBookmarks(response);
    return true;
  } else {
    clog(request.message);
    return false;
  }
});

function getBookmarks(callback) {
  chrome.bookmarks.getTree().then((bookmarkList) => {
    if(bookmarkList) {
      callback(bookmarkList);
    }
  }, function (error) {
    clog(error);
  });
}

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
  clog(`BGROUND Command: ${command}`);
});
