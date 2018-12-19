/**
*SLIDER OBJECT
*/

var Slider = {

// slider animation auto
slides: qsa('.slide'), 
slideActive: 0,
intervalId: setInterval(function() {
    if (slideActive >= slides.length-1) { 
        slideActive = -1; 
    }
    qs('.active').classList.remove('active'); 
    slideActive++; 
    slides[slideActive].classList.add('active'); 
  }, 5000),

qsa: function(selector) {
    return document.querySelectorAll(selector);
  },

qs: function(selector) {
    return document.querySelector(selector);
  },

// slider animation mouse keypress 
/*goNext: document.getElementById ("nav_right"),
goPrevious: document.getElementById ("nav_left"),
stop: document.getElementById("nav_pause"),
play: document.getElementById("nav_play"),*/

}