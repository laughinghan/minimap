javascript:(function() {
var doc = document,
  body = doc.body,
  docEl = doc.documentElement,
  computedStylesOf = getComputedStyle,
  minimap = body.cloneNode(true),
  minimap_style = minimap.style;
minimap_style.position = 'fixed';
minimap_style.zIndex = 65534;
minimap_style.WebkitUserSelect = 'none';
[].forEach.call(minimap.getElementsByTagName('a'), function(link) {
  link.href = 'javascript:;';
});
docEl.appendChild(minimap);

var youarehere = doc.createElement('div'), youarehere_style = youarehere.style;
youarehere_style.position = 'fixed';
youarehere_style.zIndex = 65535;
youarehere_style.WebkitUserSelect = 'none';
youarehere_style.right = 0;
youarehere_style.border = 'solid black 2px';
docEl.appendChild(youarehere);

scale();
window.addEventListener('resize', scale);
var scaleFactor;
function scale() {
  minimap_style.width = computedStylesOf(body).width;

  if (minimap.scrollHeight > 10*innerHeight)
    scaleFactor = innerHeight/minimap.scrollHeight;
  else
    scaleFactor = .1;

  minimap_style.WebkitTransform = 'scale('+scaleFactor+')';
  minimap_style.top =
    (minimap.offsetHeight/2 + computed('marginTop'))*(scaleFactor - 1)
    + 'px';
  var outerWidth = minimap.offsetWidth + computed('marginLeft')
    + computed('marginRight');
  minimap_style.right =
    (minimap.offsetWidth/2 + computed('marginRight'))*(scaleFactor - 1)
    + (minimap.scrollWidth > outerWidth
      && (minimap.scrollWidth - outerWidth)*scaleFactor)
    + 2
    + 'px';

  youarehere_style.width = innerWidth * scaleFactor + "px";
  youarehere_style.height = innerHeight * scaleFactor + "px";
}
function computed(style) {
  return parseInt(computedStylesOf(minimap)[style]);
}

youAreNowHere();
window.addEventListener('scroll',youAreNowHere);
function youAreNowHere() {
  youarehere_style.top = body.scrollTop*scaleFactor - 2 + "px";
}

minimap.addEventListener('mousedown', mousedown);
youarehere.addEventListener('mousedown', mousedown);
function mousedown(e) {
  scrollTo(e);
  doc.addEventListener('mousemove', scrollTo);
  doc.addEventListener('mouseup', function(){
    doc.removeEventListener('mousemove', scrollTo);
    doc.removeEventListener('mouseup', arguments.callee);
  });
}
function scrollTo(e) {
  body.scrollTop = e.clientY/scaleFactor-innerHeight/2;
}
}())
