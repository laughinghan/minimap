javascript:
var minimap = document.body.cloneNode(true), scaleFactor;
[].forEach.call(minimap.getElementsByTagName('a'), function(link) {
  link.href = 'javascript:;';
});
minimap.style.position = 'fixed';
document.body.appendChild(minimap);
if (minimap.offsetHeight > 10*innerHeight) {
  scaleFactor = innerHeight/minimap.offsetHeight;
}
else {
  scaleFactor = .1;
}
scale();
minimap.onmousedown = function(e) {
  document.body.scrollTop = e.clientY/scaleFactor-innerHeight/2;
  document.onmousemove = arguments.callee;
  document.onmouseup = function(){ document.onmousemove = null; };
  return false;
};
function scale() {
  minimap.style.webkitTransform = 'scale('+scaleFactor+')';
  minimap.style.top = minimap.offsetHeight*(scaleFactor/2 - .5)+'px';
  minimap.style.right = minimap.offsetWidth*(scaleFactor/2 - .5)+'px';
}
