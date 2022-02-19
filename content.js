msg('content');

let visible = false;

let element = document.createElement('div'); 
element.className = 'sidemark-sidebar';
element.frameBorder = "none";

function msg(m) {
  chrome.runtime.sendMessage({message: m});
}

chrome.runtime.onMessage.addListener(function(message, sender, callback) {
  msg('onMessage.function(): ' + message);
  if(visible) {
    document.body.removeChild(element);
  } else{
    document.body.appendChild(element);
  }
  visible = !visible;
});



 