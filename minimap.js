javascript:
var minimap = document.body.cloneNode(true), scaleFactor;
[].forEach.call(minimap.getElementsByTagName('a'), function(link) {
  link.href = 'javascript:;';
});
minimap.style.position = 'fixed';
document.body.appendChild(minimap);
var scaleFactor;
if (minimap.offsetHeight > 10*innerHeight) {
  scale(innerHeight/minimap.offsetHeight);
}
else {
  scale(.1);
}
minimap.onmousedown = function(e) {
  document.body.scrollTop = e.clientY/scaleFactor-innerHeight/2;
  document.onmousemove = arguments.callee;
  document.onmouseup = function(){ document.onmousemove = null; };
  return false;
};
function scale(factor) {
  scaleFactor = factor;
  minimap.style.webkitTransform = 'scale('+factor+')';
  factor = factor/2 - .5;
  minimap.style.top = minimap.offsetHeight*factor+'px';
  minimap.style.right = minimap.offsetWidth*factor+'px';
}
function youAreNowHere() {
  youarehere.style.top = document.body.scrollTop * scaleFactor + "px";
}
var youarehere = document.createElement('div');
youarehere.style.position = 'fixed';
youarehere.style.right = 0;
youarehere.style.width = innerWidth * scaleFactor + "px";
youarehere.style.height = innerHeight * scaleFactor + "px";
youarehere.style.border = 'solid black 2px';
youAreNowHere();
document.body.appendChild(youarehere);
window.addEventListener('scroll',youAreNowHere);
