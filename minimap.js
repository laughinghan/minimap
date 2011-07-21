javascript:
var minimap = document.body.cloneNode(true);
var scaleFactor = .1;
var offsetScale = .45;
[].forEach.call(minimap.getElementsByTagName('a'), function(link) {
  link.href = 'javascript:;';
});
minimap.style.position = 'fixed';
minimap.style.webkitTransform = 'scale(' + scaleFactor + ')';
document.body.appendChild(minimap);
minimap.style.top = minimap.offsetHeight*-offsetScale+'px';
minimap.style.right = minimap.offsetWidth*-offsetScale+'px';
minimap.onmousedown = function(e) {
  document.body.scrollTop = e.clientY-innerHeight/(2*scaleFactor);
  document.onmousemove = arguments.callee;
  document.onmouseup = function(){ document.onmousemove = null; };
  return false;
};
