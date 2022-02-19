msg('content');

let visible = false;

let element = document.createElement('div');
element.id = 'bookmarkListDiv';
element.className = 'sidemark-sidebar';

function msg(m) {
  chrome.runtime.sendMessage({ message: m });
}

chrome.runtime.onMessage.addListener(function (message, sender, callback) {
  if(message === 'chrome.action.onClicked') {
    if (visible) {
      document.body.removeChild(element);
    } else {
      document.body.appendChild(element);
    }
    visible = !visible;
  }
});


chrome.runtime.sendMessage({ message: 'getBookmarks', function(response) {
  msg('getBookmarks');
} });


function loadTree(bookmarkList, searchQuery) {
  element.innerHTML = '';
  msg('loadTree');
}




