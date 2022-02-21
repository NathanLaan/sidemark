# SideMark Google Chrome Extension

A Google Chrome extension for viewing bookmarks.

## Roadmap

- [x] Display bookmarks in "sidebar" on the page.
- [ ] Editable bookmarks.
- [x] Keyboard shortcut.
- [ ] Settings:
  - [ ] Popup/sidebar size.
  - [ ] Open bookmark in current or new window.
  - [ ] Editable keyboard shortcut?
  - [ ] Toggle between sidebar and popup window.
- [ ] Settings:
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

- [Google Chrome Extension Bookmarks API](https://developer.chrome.com/docs/extensions/reference/bookmarks/)
- [Google Chrome Extension Runtime API](https://developer.chrome.com/docs/extensions/reference/runtime/)
- [Google Chrome Extension Commands API](https://developer.chrome.com/docs/extensions/reference/commands/)
- [Google Chrome Extension Message-Passing API](https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage)
- [Google Chrome chrome.action API](https://developer.chrome.com/docs/extensions/reference/action/#event-onClicked)
