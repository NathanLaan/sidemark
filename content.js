msg('content');

let visible = false;

let element = document.createElement('div'); 
element.style.background = "orange";
element.style.clear = "both";
element.style.display = "float";
element.style.height = "100%";
element.style.width = "300px";
element.style.position = "fixed";
element.style.top = "0px";
element.style.right = "0px";
element.style.zIndex = "9000000000000000000";
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



 