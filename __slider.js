/**
*SLIDER OBJECT
*/
// slider animation auto
function qsa(selector) { // fonction query selector all
	return document.querySelectorAll(selector);
};

function qs(selector) { // fonction query selector
  return document.querySelector(selector);
};

var slides = qsa('.slide'); // la variable slides = ts les éléments qui contiennent la classe 'slide'
var slideActive = 0; // on part d'une variable qui est égale à 0 

var intervalId = setInterval(function() {
  //console.log(slideActive, slides.length); // permet de vérifier que le slide fonctionne 
  if (slideActive >= slides.length-1) { // qd la ftn arrive à la dernière image donc que la ftn slideActive est au bout..
      slideActive = -1; // ..la fonction reprend a l'image 1
  }
  qs('.active').classList.remove('active'); // on enlève la classe 'active' au selecteur
  slideActive++; // on incrémente de 1 chaque image du slide
  slides[slideActive].classList.add('active'); // on ajoute à chaque élément du slide la classe 'active' à chaque incrémentation
 
}, 5000);

// slider animation souris 
var goNext = document.getElementById ("nav_right");
var goPrevious = document.getElementById ("nav_left");
var stop = document.getElementById("nav_pause");
var play = document.getElementById("nav_play");

goNext.addEventListener("click", next);
	function next(e) {
		if (slideActive >= slides.length-1) { // qd la ftn arrive à la dernière image donc que la ftn slideActive est au bout..
      	slideActive = -1; // ..la fonction reprend a l'image 1
  		}
		qs('.active').classList.remove('active'); // la classe 'Active' est supprimée de la classe à laquelle elle était attribuée
		slideActive++; // on passe à l'image suivante
		slides[slideActive].classList.add('active'); // l'image suivante prend alors la classe 'Active'
	};

goPrevious.addEventListener("click", previous);
	function previous(e) {
		if (slideActive <= slides.length-1) { 
      	slideActive = +1; 
   		}
		qs('.active').classList.remove('active');
		slideActive--;
	    slides[slideActive].classList.add('active');
	};

// stop slider animation 
stop.addEventListener("click", stopSlide);
	function stopSlide(e) {
		clearInterval(intervalId);
		stop.style.display = "none";
		goPrevious.style.display = "none";
		goNext.style.display = "none";
		play.style.display = "block";
	};

play.addEventListener("click", playSlide);
	function playSlide(e) {
		setInterval(function() { // EST CE QUE JE SUIS OBLIGÉE DE REPORTER TOUTE LA FONCTION ICI?
			if (slideActive >= slides.length-1) { // qd la ftn arrive à la dernière image donc que la ftn slideActive est au bout..
					slideActive = -1; // ..la fonction reprend a l'image 1
			}
			qs('.active').classList.remove('active'); // on enlève la classe 'active' au selecteur
			slideActive++; // on incrémente de 1 chaque image du slide
			slides[slideActive].classList.add('active'); // on ajoute à chaque élément du slide la classe 'active' à chaque incrémentation
		 
		}, 5000);
		stop.style.display = "block";
		goPrevious.style.display = "block";
		goNext.style.display = "block";
		play.style.display = "none";
	}

	// TODO: FAIRE FONCTIONNER LE SLIDER AU CLAVIER AVEC LES FLÈCHES




