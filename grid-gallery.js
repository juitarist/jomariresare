const root = document.querySelector("body, html");
const container = document.querySelector('.gg-container');
const images = document.querySelectorAll(".gg-box > img");
const l = images.length;

for(var i = 0; i < l; i++) {
  images[i].addEventListener("click", function(i) {
    var currentImg = this;
    const parentItem = currentImg.parentElement, screenItem = document.createElement('div');
    screenItem.id = "gg-screen";
    container.prepend(screenItem);
    if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute("data-theme", "dark");
    var route = currentImg.src;
    root.style.overflow = 'hidden';
    screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
    const first = images[0].src, last = images[l-1].src;
    const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"), nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
    imgItem.innerHTML = '<img src="' + route + '">';

    if (l > 1) {
      if (route == first) {
        prevBtn.hidden = true;
        var prevImg = false;
        var nextImg = currentImg.nextElementSibling;
      }
      else if (route == last) {
        nextBtn.hidden = true;
        var nextImg = false;
        var prevImg = currentImg.previousElementSibling;
      }
      else {
        var prevImg = currentImg.previousElementSibling;
        var nextImg = currentImg.nextElementSibling;
      }
    }
    else {
      prevBtn.hidden = true;
      nextBtn.hidden = true;
    }

    screenItem.addEventListener("click", function(e) {
      if (e.target == this || e.target == close) hide();
    });

    root.addEventListener("keydown", function(e) {
      if (e.keyCode == 37 || e.keyCode == 38) prev();
      if (e.keyCode == 39 || e.keyCode == 40) next();
      if (e.keyCode == 27 ) hide();
    });

    prevBtn.addEventListener("click", prev);
    nextBtn.addEventListener("click", next);

    function prev() {
      prevImg = currentImg.previousElementSibling;
      imgItem.innerHTML = '<img src="' + prevImg.src + '">';
      currentImg = currentImg.previousElementSibling;
      var mainImg = document.querySelector(".gg-image > img").src;
      nextBtn.hidden = false;
      prevBtn.hidden = mainImg === first;
    };

    function next() {
      nextImg = currentImg.nextElementSibling;
      imgItem.innerHTML = '<img src="' + nextImg.src + '">';
      currentImg = currentImg.nextElementSibling;
      var mainImg = document.querySelector(".gg-image > img").src;
      prevBtn.hidden = false;
      nextBtn.hidden = mainImg === last;
    };

    function hide() {
      root.style.overflow = 'auto';
      screenItem.remove();
    };
  });
}


// Swipe X Y Function // 

document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          var nextImg = currentImg.nextElementSibling;
            /* right swipe */ 
        } else {
          var prevImg = currentImg.previousElementSibling; 
            /* left swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* down swipe */ 
        } else { 
            /* up swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

// END SWIPE //

function gridGallery (options) {
  if (options.selector) selector = document.querySelector(options.selector);
  if (options.darkMode) selector.setAttribute("data-theme", "dark");
  if (options.layout == "horizontal" || options.layout == "square") selector.setAttribute("data-layout", options.layout);
  if (options.gaplength) selector.style.setProperty('--gap-length', options.gaplength + 'px');
  if (options.rowHeight) selector.style.setProperty('--row-height', options.rowHeight + 'px');
  if (options.columnWidth) selector.style.setProperty('--column-width', options.columnWidth + 'px');
}
