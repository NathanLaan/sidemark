
msg('popup');
var bookmarkListElement;


function msg(m) {
  chrome.runtime.sendMessage({message: m});
}

window.onload = function () {
  msg("popup.onload");
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
  loadNode(bookmarkList[0], searchQuery);
}

function loadNode(bookmarkNode, searchQuery) {
  if(searchQuery && !bookmarkNode.children) {
    if( bookmarkNode.title && bookmarkNode.title.toLowerCase().includes(searchQuery)) {
      bookmarkListElement.appendChild(createBookmark(bookmarkNode));
    }
  } else {
    if (bookmarkNode.url) {
      bookmarkListElement.appendChild(createBookmark(bookmarkNode));
    } else if(bookmarkNode.title) {
      bookmarkListElement.appendChild(createFolder(bookmarkNode.title));
    }
    if (bookmarkNode.children) {
      for (child of bookmarkNode.children) {
        loadNode(child, searchQuery);
      }
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
  const iElement = document.createElement('i');
  iElement.className = 'fa fa-folder';
  divElement.appendChild(iElement);
  divElement.appendChild(document.createTextNode(' ' + txt));
  listElement.appendChild(divElement);
  return listElement;
}

function createBookmark(bookmark) {
  const listElement = document.createElement('li');
  listElement.appendChild(createLink(bookmark.url, bookmark.title));
  return listElement;
}
