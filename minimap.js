javascript:
var minimap = document.body.cloneNode(true);
[].forEach.call(minimap.getElementsByTagName('a'), function(link) {
  link.href = 'javascript:;';
});
minimap.style.position = 'fixed';
document.body.appendChild(minimap);
if (minimap.offsetHeight > 10*innerHeight) {
  scale(innerHeight/minimap.offsetHeight);
}
else {
  scale(.1);
}
minimap.onmousedown = function(e) {
  document.body.scrollTop = 10*e.clientY-innerHeight/2;
  document.onmousemove = arguments.callee;
  document.onmouseup = function(){ document.onmousemove = null; };
  return false;
};
function scale(factor) {
  minimap.style.webkitTransform = 'scale('+factor+')';
  minimap.style.top = minimap.offsetHeight*-.45+'px';
  minimap.style.right = minimap.offsetWidth*-.45+'px';
}
