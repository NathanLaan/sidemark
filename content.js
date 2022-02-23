sidemark.msg('CONTENT run');

let option_left = true;
let visible = false;

function createElement(type, className = undefined, id = undefined) {
  const element = document.createElement(type);
  if(className) {
    element.className = className; 
  }
  if(id) {
    element.id = id; 
  }
  return element;
}

function setupSidebarElementStyle(options) {
  if(options.sidebarLocation == 'left'){
    sidebarElement.style.removeProperty('right');
    sidebarElement.style.left = '0px';
  } else {
    sidebarElement.style.removeProperty('left');
    sidebarElement.style.right = '0px';
  }
  sidebarElement.style.position = "fixed";
  sidebarElement.style.top = '0px';
  sidebarElement.style.width = options.sidebarWidth;
  sidebarElement.style.height = options.sidebarHeight;
}

const sidebarElement = createElement('div', 'sidemark sidebarWrapper', 'sidebarElement');
const sidebarInnerElement = createElement('div', 'sidebar');
sidebarElement.appendChild(sidebarInnerElement);
const bookmarkListElement = document.createElement('ul');
sidebarInnerElement.appendChild(bookmarkListElement);

// async function loadHTML() {
//   let url = chrome.runtime.getURL('bookmarks.html');
//   sidebarElement.innerHTML = await (await fetch(url)).text();
// }
// loadHTML();

chrome.runtime.onMessage.addListener(function (message, sender, callback) {
  if(message === 'sidemark_onclicked') {
    if (visible) {
      document.body.removeChild(sidebarElement);
      visible = !visible;
    } else {
      getOptions(function(options) {
        setupSidebarElementStyle(options);
        document.body.appendChild(sidebarElement);
        visible = !visible;
      });
    }
  }
});

chrome.runtime.sendMessage({message: "sidemark_get_bookmarks"}, (response) => {
  sidemark.msg('CONTENT sendMessage.response: ' + response);
  loadTree(response);
});

function loadTree(bookmarkList, searchQuery = undefined) {
  //bookmarkListElement.innerHTML = '';
  sidemark.msg('CONTENT loadTree');
  //bookmarkListElement = document.getElementById('bookmarkList');
  //bookmarkListElement = sidebarElement.childNodes.item('bookmarkList;')[0];
  //msg('CONTENT loadTree.sidebarElement.childNodes: ' + JSON.stringify(sidebarElement.childNodes));
  sidemark.msg('CONTENT loadTree.bookmarkListElement: ' + bookmarkListElement);
  addNodeRecursive(bookmarkList[0], searchQuery);
}


/**
 * Add the specified bookmarkTreeNode and all child nodes. Filter if filterText is specified.
 * @param {chrome.bookmarks.BookmarkTreeNode} bookmarkTreeNode  The node to load and/or filter with filterText.
 * @param {string} filterText  The string to filter nodes or null if no filter.
 */
function addNodeRecursive(bookmarkTreeNode, filterText = undefined) {
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
        addNodeRecursive(child, filterText);
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
