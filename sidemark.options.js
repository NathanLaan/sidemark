(function() {

  window.sidemark = window.sidemark || {}

  /**
   * Load sidebarLocation from storage and pass it to the callback function.
   * 
   * @param {*} callback    The function to be called with sidebarLocation.
   */
  sidemark.getSidebarLocation = function(callback) {
    chrome.storage.sync.get({'sidebar_location': 'left'}, function(items) {
      callback(items['sidebar_location']);
    });
  }
  
  /**
   * Save sidebarLocation to storage.
   * 
   * @param {*} sidebarLocation 
   * @param {*} callback 
   */
  sidemark.setSidebarLocation = function(sidebarLocation, callback) {
    chrome.storage.sync.set({'sidebar_location': sidebarLocation}, callback() );
  }

})();