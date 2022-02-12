
console.log('popup');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(request, sender, sendResponse);
  sendResponse('message: '+JSON.stringify(request));
});

window.onload = function () {
  console.log('window.onload');
};



function createImgElement(url) {
  var img = document.createElement('img');
  img.src = '/img/link-icons/' + url;
  return img;
}

function loadLinkArray(linkArray, containerName) {
  var element = document.getElementById(containerName);
  linkArray.forEach(function(pageLinkItem) {
    var link = document.createElement('a');
    link.setAttribute('class', pageLinkItem.css);
    link.href = pageLinkItem.url;
    link.title = pageLinkItem.txt;
    link.appendChild(createImgElement(pageLinkItem.img));
    link.appendChild(document.createElement('br'));
    link.appendChild(document.createTextNode(pageLinkItem.txt));
    element.appendChild(link);
    element.appendChild(document.createTextNode('\u00A0'));
  });
}
