/**
*SLIDER OBJECT
*/

var Slider = {

  // slider animation auto
  slides: qsa('.slide'),
  slideActive: 0,
  // slider mouse animation 
  goNextElt: document.getElementById("nav_right"),
  goPreviousElt: document.getElementById("nav_left"),
  stopElt: document.getElementById("nav_pause"),
  playElt: document.getElementById("nav_play"),

  /**
   * startAutoPlay - start the slider in auto mode 
   */
  startAutoPlay: function () {
    var self = this;
    this.intervalId = setInterval(function () { // arrow function à voir: permet de ne pas avoir à utiliser le self = this
      if (self.slideActive >= self.slides.length - 1) {
        self.slideActive = -1;
      }
      qs('.active').classList.remove('active');
      self.slideActive++;
      self.slides[self.slideActive].classList.add('active');
      }, 5000);
    },

  /**
   * initControls - init all event listeners
   */
  initControls: function () {
    this.goNextElt.addEventListener("click", this.next.bind(this));
    this.goPreviousElt.addEventListener("click", this.previous.bind(this));
    this.stopElt.addEventListener("click", this.autoSlide.bind(this));
    this.playElt.addEventListener("click", this.playSlide.bind(this));

    // animation slider on keyboard
    this.document.addEventListener("keydown", function(e) {
      console.log("test ok");
      if(e.keyCode === 37){
        console.log("ok");
        previous();
      }
      else if(e.keyCode === 39){
        console.log("ok");
        next();
      }
    });
  },

  /**
   * next - animate the slider to the next slide
   */
  next: function () {
    if (this.slideActive >= this.slides.length - 1) { // qd la ftn arrive à la dernière image donc que la ftn slideActive est au bout..
      this.slideActive = -1; // ..la fonction reprend a l'image 1
    }
    qs('.active').classList.remove('active'); // la classe 'Active' est supprimée de la classe à laquelle elle était attribuée
    this.slideActive++; // on passe à l'image suivante
    this.slides[this.slideActive].classList.add('active'); // l'image suivante prend alors la classe 'Active'
  },

  previous: function () {
    if (this.slideActive <= this.slides.length - 1) {
      this.slideActive = +1;
    }
    qs('.active').classList.remove('active');
    this.slideActive--;
    this.slides[this.slideActive].classList.add('active');
  },

  autoSlide: function () {
    clearInterval(this.intervalId);
    this.stopElt.style.display = "none";
    this.goPreviousElt.style.display = "none";
    this.goNextElt.style.display = "none";
    this.playElt.style.display = "block";
  },

  playSlide: function () {
    var self = this;
    this.startAutoPlay();
    this.stopElt.style.display = "inline";
    this.goPreviousElt.style.display = "inline";
    this.goNextElt.style.display = "inline";
    this.playElt.style.display = "none";
  },
}