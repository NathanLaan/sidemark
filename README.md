# SideMark Google Chrome Extension

A Google Chrome extension for viewing bookmarks.

## Roadmap

- [x] Function to reset settings in options page.
- [ ] Fade out the active page when sidebar is shown (overlay transparent div).
- [ ] Sidemark CSS overriding page CSS and vice-versa.
  - [x] https://amazon.ca
  - [x] https://blog.mollywhite.net/blockchains-are-not-what-they-say/ (Any site with ".sidebar" style)
- [x] Fix sidebar to window so it does not move if the user scrolls.
- [x] Display bookmarks in "sidebar" on the page.
- [ ] Editable bookmarks.
- [x] Keyboard shortcut.
- [ ] [User Options](https://developer.chrome.com/docs/extensions/mv3/options/):
  - [x] Sidebar location (left/right).
  - [x] Sidebar width.
  - [x] Sidebar height.
  - [ ] Sidebar font size.
  - [x] Open bookmark in current or new window.
  - [ ] Editable keyboard shortcut?
  - [ ] Toggle between sidebar and popup window?
- [ ] Language support.
- [ ] Update bookmarks on events.
- [ ] Better icon.
- [ ] Screenshots.
- [ ] Website.
- [x] Give focus to search box on popup load.
- [ ] Save search box text between popup load.
- [ ] Do not show folder names for empty folders on search.
- [ ] About page with link to source code?
- [x] Disable text wrapping on bookmarks and folders.
- [ ] Search feature!
- [ ] Ability to "minimize" folders.
- [ ] Window theming.
- [ ] Window dark/light mode support.

## Message Passing

- Content script loads
- Content script calls chrome.runtime.sendMessage('sidemark_get_bookmarks')
- Background script onMessage listener receives message
- Background script calls getBookmarks() with response callback from content script
- Background script calls chrome.bookmarks.getTree() with anonymous callback function
- Background script anonymous callback function calls content script response callback function
- Content script response callback function calls loadTree() to load bookmarks tree

## Links

- [Google Chrome extensions page for SideMark](https://chrome.google.com/webstore/detail/sidemark/mpmmbieakmohbhjidajegiehcbeagdcg)
- [Color Palette](https://coolors.co/124e78-f0f0c9-f2bb05-d74e09-6e0e0a)

## API References

- [Google Chrome Extension User Options](https://developer.chrome.com/docs/extensions/mv3/options/)
- [Google Chrome Extension Bookmarks API](https://developer.chrome.com/docs/extensions/reference/bookmarks/)
- [Google Chrome Extension Runtime API](https://developer.chrome.com/docs/extensions/reference/runtime/)
- [Google Chrome Extension Commands API](https://developer.chrome.com/docs/extensions/reference/commands/)
- [Google Chrome Extension Message-Passing API](https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage)
- [Google Chrome Extension chrome.action API](https://developer.chrome.com/docs/extensions/reference/action/#event-onClicked)
