javascript:
var minimap = document.body.cloneNode(true);
minimap.style.position = 'fixed';
minimap.style.zIndex = 65534;
minimap.style.WebkitUserSelect = 'none';
minimap.style.width = getComputedStyle(document.body).width;
[].forEach.call(minimap.getElementsByTagName('a'), function(link) {
  link.href = 'javascript:;';
});
document.documentElement.appendChild(minimap);

var youarehere = document.createElement('div');
youarehere.style.position = 'fixed';
youarehere.style.zIndex = 65535;
youarehere.style.WebkitUserSelect = 'none';
youarehere.style.right = 0;
youarehere.style.border = 'solid black 2px';
document.documentElement.appendChild(youarehere);

scale();
window.addEventListener('resize', scale);
var scaleFactor;
function scale() {
  if (minimap.scrollHeight > 10*innerHeight) {
    scaleFactor = innerHeight/minimap.scrollHeight;
  }
  else {
    scaleFactor = .1;
  }
  minimap.style.WebkitTransform = 'scale('+scaleFactor+')';
  minimap.style.top =
    (minimap.offsetHeight/2 + computed('marginTop'))*(scaleFactor - 1)
    + 'px';
  var outerWidth = minimap.offsetWidth + computed('marginLeft')
    + computed('marginRight');
  minimap.style.right =
    (minimap.offsetWidth/2 + computed('marginRight'))*(scaleFactor - 1)
    + (minimap.scrollWidth > outerWidth
      && (minimap.scrollWidth - outerWidth)*scaleFactor)
    + 2
    + 'px';

  youarehere.style.width = innerWidth * scaleFactor + "px";
  youarehere.style.height = innerHeight * scaleFactor + "px";
}
function computed(style) {
  return parseInt(getComputedStyle(minimap)[style]);
}

youAreNowHere();
window.addEventListener('scroll',youAreNowHere);
function youAreNowHere() {
  youarehere.style.top = document.body.scrollTop*scaleFactor - 2 + "px";
}

minimap.addEventListener('mousedown', mousedown);
youarehere.addEventListener('mousedown', mousedown);
function mousedown(e) {
  scrollTo(e);
  document.addEventListener('mousemove', scrollTo);
  document.addEventListener('mouseup', function(){
    document.removeEventListener('mousemove', scrollTo);
    document.removeEventListener('mouseup', arguments.callee);
  });
}
function scrollTo(e) {
  document.body.scrollTop = e.clientY/scaleFactor-innerHeight/2;
}
