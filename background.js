console.log('background');
// let setting = '';

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled');
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
