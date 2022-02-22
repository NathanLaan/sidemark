(function() {

  window.sidemark = window.sidemark || {}

  /**
   * Log the specified message in the background.js console.
   * @param {string} m  The message to log.
   */
  sidemark.msg = function(m) {
    chrome.runtime.sendMessage({ message: m });
  }

})();