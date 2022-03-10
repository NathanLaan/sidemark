
class SidemarkOptions {
  /**
   * 
   * @param {String}  sidebarLocation 
   * @param {String}  sidebarWidth 
   * @param {String}  sidebarHeight 
   * @param {String}  bookmarkTarget 
   * @param {boolean} showPageOverlay
   */
  constructor(sidebarLocation, sidebarWidth, sidebarHeight, bookmarkTarget, showPageOverlay) {
    this.sidebarLocation = sidebarLocation || 'left';
    this.sidebarWidth = sidebarWidth || '300px';
    this.sidebarHeight = sidebarHeight || '100%';
    this.bookmarkTarget = bookmarkTarget || '_blank';
    this.showPageOverlay = showPageOverlay || true;
  }
}

function saveDefaultOptions(callback) {
  let options = new SidemarkOptions();
  chrome.storage.sync.clear(function() {
    saveOptions(options, callback);
  });
}

/**
 * 
 * @param {SidemarkOptions} options 
 * @param {Function} callback 
 */
function saveOptions(options, callback) {
  chrome.storage.sync.set({'sidemark_options': options}, callback());
  return true;
}

/**
 * 
 * @param {Function} callback   A function with {SidemarkOptions} as parameter.
 */
function getOptions(callback) {
  let options = new SidemarkOptions();
  chrome.storage.sync.get({'sidemark_options': options}, function (items) {
    callback(items['sidemark_options']);
  });
  // NOT NEEDED??? return true;
}
