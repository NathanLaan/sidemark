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

## Message Passing

- Content script loads.
- Content script chrome.runtime.sendMessage('get_bookmarks');

## References

- [Google Chrome extensions page for SideMark](https://chrome.google.com/webstore/detail/sidemark/mpmmbieakmohbhjidajegiehcbeagdcg)
- [Google Chrome Extension Bookmarks API](https://developer.chrome.com/docs/extensions/reference/bookmarks/)
- [Google Chrome Extension Runtime API](https://developer.chrome.com/docs/extensions/reference/runtime/)
- [Google Chrome Extension Commands API](https://developer.chrome.com/docs/extensions/reference/commands/)
- [Google Chrome Extension Message-Passing API](https://developer.chrome.com/docs/extensions/reference/runtime/#method-sendMessage)
- [Color Palette](https://coolors.co/124e78-f0f0c9-f2bb05-d74e09-6e0e0a)
- [Google Chrome chrome.action API](https://developer.chrome.com/docs/extensions/reference/action/#event-onClicked)
