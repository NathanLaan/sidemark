
msg('popup');
var bookmarkListElement;

/**
 * Log the specified message in the background.js console
 * @param {string} m  Message to log.
 */
function msg(m) {
  chrome.runtime.sendMessage({message: m});
}

window.onload = function () {
  bookmarkListElement = document.getElementById('bookmarkList');
  chrome.bookmarks.getTree().then(function (bookmarkList) {
    loadTree(bookmarkList);
  }, onFailedGetTree);

  const elem = document.getElementById('bookmarkSearch');
  elem.addEventListener('input', function(e) {
    chrome.bookmarks.getTree().then(function (bookmarkList) {
      loadTree(bookmarkList, e.target.value.toLowerCase());
    }, onFailedGetTree);
  });

  elem.focus();
};

function onFailedGetTree(error) {
  msg(error);
}

function loadTree(bookmarkList, searchQuery) {
  bookmarkListElement.innerHTML = '';
  addNodeRecursive(bookmarkList[0], searchQuery);
}

/**
 * Add the specified bookmarkTreeNode and all child nodes. Filter if filterText is specified.
 * @param {chrome.bookmarks.BookmarkTreeNode} bookmarkTreeNode  The node to load and/or filter with filterText.
 * @param {string} filterText  The string to filter nodes or null if no filter.
 */
function addNodeRecursive(bookmarkTreeNode, filterText) {
  if(filterText && !bookmarkTreeNode.children) {
    if( bookmarkTreeNode.title && bookmarkTreeNode.title.toLowerCase().includes(filterText)) {
      bookmarkListElement.appendChild(createBookmarkElement(bookmarkTreeNode));
    }
  } else {
    if (bookmarkTreeNode.url) {
      bookmarkListElement.appendChild(createBookmarkElement(bookmarkTreeNode));
    } else if(bookmarkTreeNode.title) {
      bookmarkListElement.appendChild(createFolderElement(bookmarkTreeNode.title));
    }
    // TODO: Do not show node if no filtered children
    if (bookmarkTreeNode.children) {
      for (child of bookmarkTreeNode.children) {
        loadNode(child, filterText);
      }
    }
  }
}

/*
 * 
 * HTML element functions
 * 
 */

function createLinkElement(url, txt) {
  const link = document.createElement('a');
  link.href = url;
  link.title = txt;
  link.target = '_blank';
  link.appendChild(document.createTextNode(txt));
  return link;
}

function createFolderElement(txt) {
  const listElement = document.createElement('li');
  const divElement = document.createElement('div');
  const iElement = document.createElement('i');
  iElement.className = 'fa fa-folder';
  divElement.appendChild(iElement);
  divElement.appendChild(document.createTextNode(' ' + txt));
  listElement.appendChild(divElement);
  return listElement;
}

function createBookmarkElement(bookmark) {
  const listElement = document.createElement('li');
  listElement.appendChild(createLinkElement(bookmark.url, bookmark.title));
  return listElement;
}
