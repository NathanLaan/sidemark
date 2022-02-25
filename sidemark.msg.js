
/**
 * Log the specified message in the background.js console.
 * @param {string} m  The message to log.
 */
msg = function(m) {
  chrome.runtime.sendMessage({ message: m });
}