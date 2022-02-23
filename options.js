
function setupOptionsUI() {
  getOptions(function(options) {
    document.getElementById('sidebarLocation').value = options.sidebarLocation;
    document.getElementById('sidebarWidth').value = options.sidebarWidth;
    document.getElementById('sidebarHeight').value = options.sidebarHeight;
  });
}

/*
 * Use 'DOMContentLoaded' as it fires after document 
 * load & parse, before other resources have been loaded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
 */
document.addEventListener('DOMContentLoaded', setupOptionsUI);

document.getElementById('saveButton').addEventListener('click', function() {
  let options = new SidemarkOptions();
  options.sidebarLocation = document.getElementById('sidebarLocation').value;
  options.sidebarWidth = document.getElementById('sidebarWidth').value;
  options.sidebarHeight = document.getElementById('sidebarHeight').value;
  saveOptions(options, function() {
    const status = document.getElementById('statusDiv');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2500);
  });
});

document.getElementById('defaultButton').addEventListener('click', function() {
  saveDefaultOptions(function() {
    setupOptionsUI();
  });
});