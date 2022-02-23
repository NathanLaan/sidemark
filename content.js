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

const pageOverlay = createElement('div', 'sidemark-overlay');
const sidebarElement = createElement('div', 'sidemark sidemark-wrapper');
const sidebarInnerElement = createElement('div', 'sidemark-sidebar');
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
      if(document.body.contains(pageOverlay)) {
        document.body.removeChild(pageOverlay);
      }
      visible = !visible;
    } else {
      getOptions(function(options) {
        setupSidebarElementStyle(options);
        document.body.appendChild(sidebarElement);
        if(options.showPageOverlay) {
          document.body.appendChild(pageOverlay);
        }
        visible = !visible;
      });
    }
  }
});

chrome.runtime.sendMessage({message: "sidemark_get_bookmarks"}, (response) => {
  sidemark.msg('CONTENT sendMessage.response: ' + response);
  getOptions(function(options) {
    loadTree(response, options);
    setupSidebarElementStyle(options);
  });
});

function loadTree(bookmarkList, options, searchQuery = undefined) {
  sidemark.msg('CONTENT loadTree.bookmarkListElement: ' + bookmarkListElement);
  sidemark.msg('CONTENT loadTree.options: ' + JSON.stringify(options));
  addNodeRecursive(bookmarkList[0], options, searchQuery);
}


/**
 * Add the specified bookmarkTreeNode and all child nodes. Filter if filterText is specified.
 * @param {chrome.bookmarks.BookmarkTreeNode} bookmarkTreeNode  The node to load and/or filter with filterText.
 * @param {string} filterText  The string to filter nodes or null if no filter.
 */
function addNodeRecursive(bookmarkTreeNode, options, filterText = undefined) {
  if(filterText && !bookmarkTreeNode.children) {
    if( bookmarkTreeNode.title && bookmarkTreeNode.title.toLowerCase().includes(filterText)) {
      bookmarkListElement.appendChild(createBookmarkElement(bookmarkTreeNode, options));
    }
  } else {
    if (bookmarkTreeNode.url) {
      bookmarkListElement.appendChild(createBookmarkElement(bookmarkTreeNode, options));
    } else if(bookmarkTreeNode.title) {
      bookmarkListElement.appendChild(createFolderElement(bookmarkTreeNode.title, options));
    }
    // TODO: Do not show node if no filtered children
    if (bookmarkTreeNode.children) {
      for (child of bookmarkTreeNode.children) {
        addNodeRecursive(child, options, filterText);
      }
    }
  }
}

/*
 * 
 * HTML element functions
 * 
 */

function createLinkElement(url, txt, options) {
  const link = document.createElement('a');
  link.href = url;
  link.title = txt;
  link.target = options.bookmarkTarget;
  link.appendChild(document.createTextNode(txt));
  return link;
}

function createFolderElement(txt, options) {
  const listElement = document.createElement('li');
  const divElement = document.createElement('div');
  const iElement = document.createElement('i');
  iElement.className = 'fa fa-folder';
  divElement.appendChild(iElement);
  divElement.appendChild(document.createTextNode(' ' + txt));
  listElement.appendChild(divElement);
  return listElement;
}

function createBookmarkElement(bookmark, options) {
  const listElement = document.createElement('li');
  listElement.appendChild(createLinkElement(bookmark.url, bookmark.title, options));
  return listElement;
}
