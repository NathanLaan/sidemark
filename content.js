msg('content');

let visible = false;

let element = document.createElement('div'); 
element.className = 'sidemark-sidebar';

function msg(m) {
  chrome.runtime.sendMessage({message: m});
}

chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  if(visible) {
    document.body.removeChild(element);
  } else{
    document.body.appendChild(element);
  }
  visible = !visible;
});



 