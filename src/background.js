try {
  importScripts(['sidemark.options.js']);
} catch (error) {
  clog(error);
}

function clog(m) {
  const d = new Date();
  console.log(`${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} LOG: ${m}`);
}

chrome.runtime.onInstalled.addListener(function() {
  saveDefaultOptions(function() {});
});

chrome.action.onClicked.addListener(function (tab) {
  try {
    chrome.tabs.sendMessage(tab.id, 'sidemark_onclicked');
  } catch(err) {
    clog(err);
  }
  // NOT NEEDED return true;
});


chrome.runtime.onMessage.addListener((request, sender, callback) => {
  switch (request.message) {
    case 'sidemark_get_bookmarks':
      getBookmarks(callback);
      break;
    default:
      clog(request.message);
  }
  /*
   * Return true to keep response function in scope for async calls
   * https://stackoverflow.com/questions/20077487/
   */
  return true;
});

/**
 * 
 * TODO: DESIGN CHANGE. NEED TO SAVE BOOKMARKS HERE. RELOAD 
 * BOOKMARKS ON BOOKMARK CHANGE EVENT. CHANGE CONTENT SCRIPT
 * TO CALL FUNCTION TO GET BOOKMARKS WHEN SHOWING BOOKMARKS.
 * 
 * @param {Function} callback 
 */
function getBookmarks(callback) {
  chrome.bookmarks.getTree().then((bookmarkList) => {
    if (bookmarkList) {
      callback(bookmarkList);
    }
  }, function (error) {
    clog(error);
  });
  // NOT NEEDED??? return true;
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
