/**
*RESA OBJECT: GET AND STORE INFORMATIONS ABOUT RESERVATION, START TIMER
*/

var InfosReservation = {
	//PROPRIÉTÉS
	fenetre: document.getElementById("signature"),
	btn: document.getElementById("resa_confirm"),
	erase: document.getElementById("erase"),
	submit: document.getElementById("submit"),
	reset: document.getElementById("reset_resa"),
	window: window,
	
	//MÉTHODES
	// Open the window
		openBox: function() {
			var self = this;
			this.btn.addEventListener("click", afficherBox);
			function afficherBox(e) {
				self.fenetre.style.display = "block";
			}
		},
	// User click on 'erase' to erase personnal infos and signature
		eraseBox: function() {
			this.erase.addEventListener("click", eraseInfos);
			function eraseInfos(e) {
				var canvas = document.getElementById("resa_canvas");
				var ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				document.getElementById("perso_name").value = "";
				document.getElementById("perso_firstname").value = "";
			}
		},
	// User click out the window and close it
		clickOut: function() {
			var self = this;
			this.window.addEventListener("click", closeBox);  
			function closeBox(event) {
				var canvas = document.getElementById("resa_canvas");
				var ctx = canvas.getContext("2d");
				if (event.target == self.fenetre) {
				self.fenetre.style.display = "none";
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				}
			}
		},
	// User click on 'submit' to confirm the reservation
		confirmResa: function() {
			var self= this;
			this.submit.addEventListener("click", confirmOption);
			function confirmOption() {
				this.perso_name = document.getElementById("perso_name").value;
				this.perso_firstname = document.getElementById("perso_firstname").value;
				this.name_resa = document.getElementById("name_resa").innerHTML;
				this.address_resa = document.getElementById("address_resa").innerHTML;
				
				
				// check if the canvas has been signed
				var canvas = document.getElementById("resa_canvas");
				var ctx = canvas.getContext("2d");
				var arrayCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

				var sum = arrayCanvasData.reduce(function (a, b) {
					return a + b;
				}, 0);

				// TODO: condition if there is no signature or no name and firstname + canvas signed
				if ( isStringValid(this.perso_firstname) && isStringValid(this.perso_name) && sum > 0) {
					console.log("form ok");
				} else { // error
					console.log('form not ok');
				}


				sessionStorage.setItem("perso_name", this.perso_name);
				sessionStorage.setItem("perso_firstname", this.perso_firstname);
				sessionStorage.setItem("name_resa", this.name_resa);
				sessionStorage.setItem("address_resa", this.address_resa);
				//self.fenetre.style.display = "none";
				document.getElementById("confirm_stationName").innerHTML = this.name_resa;
				document.getElementById("confirm_stationAddress").innerHTML = this.address_resa; 
								
				// start the timer
				function timer() {
					var timer_resa = document.getElementById("confirm_resa");
					s=duree;
					m=0;
					h=0;
					if(s<0) {
						timer_resa.innerHTML = "La durée de votre réservation a expiré." // remplacer par remove ('hidden') sur span html
					} else {
						if(s>59) {
							m=Math.floor(s/60);
							s=s-m*60;
						}
						if(m>59) {
							h=Math.floor(m/60);
							m=m-h*60;
						}
						if(s<10) {
							s="0"+s;		
						}
						if(m<10) {
							m="0"+m
						}
							timer_resa.innerHTML = m+":"+s;
							this.reset_resa.style.display = "block";
						}
					duree=duree-1;
					window.setTimeout(timer,999);
					}
				
				duree="1200";
				timer();
				
				// TODO: enregistrer le résultat de la fonction ds sessionStorage pr conserver l'affichage du timer mm si
					// on ferme le navigateur
			;
			}
		}
	}
	
	
	/* NOTES:
	//la fonction confirmOption() dans l'évènement est-elle appelée comme il le faudrait?
			//confusion entre fonction VS fonction exécutée: 
			//on doit donner à un évèvement une fonction en paramètre et pas le résultat d'une fonction
			/*un addEventListener s'utilise généralement au choix comme ça :
				truc.addEventListener('click', function(event){
					faire des trucs quand je clique
				});
				Ou comme ça :
					truc.addEventListener('click', trucClick);
					on note l'absence de parenthèses/paramètres ici
	
				function trucClick(event){
					faire des trucs quand je clique
			});*/
	
	
	
	/* CODE PROCÉDURAL:
	
	var fenetre = document.getElementById("signature");
	var btn = document.getElementById("resa_confirm");
	var erase = document.getElementById("erase");
	// Open the window
	btn.onclick = function() {
		fenetre.style.display = "block";
	}
	// User click on 'erase' to erase personnal infos and signature
	erase.onclick = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		document.getElementById("perso_name").value = "";
		document.getElementById("perso_firstname").value = "";
	}
	// User click out the window and close it
	window.onclick = function(event) {
		if (event.target == fenetre) {
			fenetre.style.display = "none";
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			document.getElementById("perso_name").value = "";
			document.getElementById("perso_firstname").value = "";
		}
	} 
	// User click on 'submit' to confirm the reservation
	submit.onclick = function() {
		fenetre.style.display = "none";
	}*/
	
	
	
	/* AUTRE ÉCRITURE POSSIBLE PR L'OBJET RESA / FONCTION OPENBOX:
	
	afficherBox: function () {
		this.fenetre.style.display = "block";
		},
	openBox: function() {
		this.btn.addEventListener("click", this.afficherBox);
		}*/
	
	/*openBox: function() {
		this.btn.addEventListener("click", afficherBox(this.fenetre));
		function afficherBox(fenetre) {
			fenetre.style.display = "block";*/
	
	
	
	
	