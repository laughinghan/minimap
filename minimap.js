javascript:
var minimap = document.body.cloneNode(true);
minimap.style.position = 'fixed';
minimap.style.zIndex = 65534;
minimap.style.webkitUserSelect = 'none';
[].forEach.call(minimap.getElementsByTagName('a'), function(link) {
  link.href = 'javascript:;';
});
document.body.appendChild(minimap);

var youarehere = document.createElement('div');
youarehere.style.position = 'fixed';
youarehere.style.zIndex = 65535;
youarehere.style.webkitUserSelect = 'none';
youarehere.style.right = 0;
youarehere.style.border = 'solid black 2px';
document.body.appendChild(youarehere);

scale();
window.addEventListener('resize', scale);
var scaleFactor;
function scale() {
  if (minimap.offsetHeight > 10*innerHeight) {
    scaleFactor = innerHeight/minimap.offsetHeight;
  }
  else {
    scaleFactor = .1;
  }
  minimap.style.webkitTransform = 'scale('+scaleFactor+')';
  minimap.style.top = minimap.offsetHeight*(scaleFactor/2 - .5) + 'px';
  minimap.style.right = minimap.offsetWidth*(scaleFactor*2 - .5) + 'px';

  youarehere.style.width = innerWidth * scaleFactor + "px";
  youarehere.style.height = innerHeight * scaleFactor + "px";
}

youAreNowHere();
window.addEventListener('scroll',youAreNowHere);
function youAreNowHere() {
  youarehere.style.top = document.body.scrollTop * scaleFactor + "px";
}

minimap.addEventListener('mousedown', mousedown);
youarehere.addEventListener('mousedown', mousedown);
function mousedown(e) {
  scrollTo(e);
  document.body.addEventListener('mousemove', scrollTo);
  document.body.addEventListener('mouseup', function(){
    document.body.removeEventListener('mousemove', scrollTo);
    document.body.removeEventListener('mouseup', arguments.callee);
  });
}
function scrollTo(e) {
  document.body.scrollTop = e.clientY/scaleFactor-innerHeight/2;
}
