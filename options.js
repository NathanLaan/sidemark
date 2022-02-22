
function saveOptions() {
  const val = document.getElementById('sidebarLocationSelect').value;
  sidemark.setSidebarLocation(val, function() {
    sidemark.msg('OPTIONS saveOptionsCB sidebarLocation: ' + val);
    // Notify the user on successful save
    let status = document.getElementById('statusDiv');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function loadOptions() {
  sidemark.getSidebarLocation(function(sidebarLocation) {
    document.getElementById('sidebarLocationSelect').value = sidebarLocation;
    sidemark.msg('OPTIONS loadOptionsCB sidebarLocation: ' + sidebarLocation);
  });
}

/*
 * Use 'DOMContentLoaded' as it fires after document 
 * load & parse, before other resources have been loaded.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
 */
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('saveButton').addEventListener('click', saveOptions);