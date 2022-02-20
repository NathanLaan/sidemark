msg('CONTENT run');

let visible = false;

let element = document.createElement('div');
element.id = 'bookmarkListDiv';
element.className = 'sidemark-sidebar';

function msg(m) {
  chrome.runtime.sendMessage({ message: m });
}

chrome.runtime.onMessage.addListener(function (message, sender, callback) {
  if(message === 'sidemark_onclicked') {
    if (visible) {
      document.body.removeChild(element);
    } else {
      document.body.appendChild(element);
    }
    visible = !visible;
  }
});

chrome.runtime.sendMessage({message: "sidemark_get_bookmarks"}, (response) => {
  msg('CONTENT sendMessage.response: ' + JSON.stringify(response));
  //
  // load bookmarks
  //
});

function loadTree(bookmarkList, searchQuery) {
  element.innerHTML = '';
  msg('loadTree');
}
