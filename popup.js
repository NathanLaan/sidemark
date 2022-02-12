
msg('popup');
var bookmarkListElement;


function msg(m) {
  chrome.runtime.sendMessage({message: m});
}

window.onload = function () {
  msg("popup.onload");
  bookmarkListElement = document.getElementById('bookmarkList');
  chrome.bookmarks.getTree().then(loadTree, onFailedGetTree);
};

function onFailedGetTree(error) {
  chrome.runtime.sendMessage({message: error});
}

function loadTree(bookmarkList) {
  loadNode(bookmarkList[0]);
}

function loadNode(bookmarkNode) {
  if (bookmarkNode.url) {
    bookmarkListElement.appendChild(createBookmark(bookmarkNode));
  } else if(bookmarkNode.title) {
    bookmarkListElement.appendChild(createFolder(bookmarkNode.title));
  }
  if (bookmarkNode.children) {
    for (child of bookmarkNode.children) {
      loadNode(child);
    }
  }
}

/**
 * 
 * HTML element functions
 * 
 */

function createLink(url, txt) {
  const link = document.createElement('a');
  link.href = url;
  link.title = txt;
  link.target = '_blank';
  link.appendChild(document.createTextNode(txt));
  return link;
}

function createFolder(txt) {
  const listElement = document.createElement('li');
  const divElement = document.createElement('div');
  divElement.appendChild(document.createTextNode(txt));
  listElement.appendChild(divElement);
  return listElement;
}

function createBookmark(bookmark) {
  const listElement = document.createElement('li');
  listElement.appendChild(createLink(bookmark.url, bookmark.title));
  return listElement;
}
