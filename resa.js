/**
*RESA OBJECT: GET AND STORE INFORMATIONS ABOUT RESERVATION, START TIMER
*/

var InfosReservation = {
	fenetre: document.getElementById("signature"),
	btn: document.getElementById("resa_confirm"),
	erase: document.getElementById("erase"),
	submit: document.getElementById("submit"),
	reset_resa: document.getElementById("reset_resa"),
	window: window,
	timerId: null,

	// Open the window
	openBox: function () {
		var self = this;
		this.btn.addEventListener("click", afficherBox);
		function afficherBox(e) {
			self.fenetre.style.display = "block";
		}
	},
	// User click on 'erase' to erase personnal infos and signature
	eraseBox: function () {
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
	clickOut: function () {
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
	confirmResa: function () {
		var self = this;
		this.submit.addEventListener("click", confirmOption);
		function confirmOption() {
			this.perso_name = document.getElementById("perso_name").value;
			this.perso_firstname = document.getElementById("perso_firstname").value;
			this.name_resa = document.getElementById("name_resa").innerHTML;
			this.address_resa = document.getElementById("address_resa").innerHTML;
			this.reset_resa = document.getElementById("reset_resa").innerHTML;

			// check if the canvas has been signed
			var canvas = document.getElementById("resa_canvas");
			var ctx = canvas.getContext("2d");
			var arrayCanvasData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

			var sum = arrayCanvasData.reduce(function (a, b) {
				return a + b;
			}, 0);

			//check if values are ok
			var reName = document.getElementById("perso_name").value;
			var reFirstName = document.getElementById("perso_firstname").value;

			var isReNameValid = isStringValid(reName);
			var isReFirstNameValid = isStringValid(reFirstName);

			// condition if there is no signature or no name and firstname or canvas not signed
			if (isStringValid(this.perso_firstname) && isStringValid(this.perso_name) && isStringValid(this.reset_resa) && sum > 0) {

				// display the reset button
				reset_resa.style.display = "block";
				infos_reset.style.display = "none";
				confirm_resa.style.display = "block";

				localStorage.setItem("perso_name", this.perso_name);
				localStorage.setItem("perso_firstname", this.perso_firstname);

				sessionStorage.setItem("name_resa", this.name_resa);
				sessionStorage.setItem("address_resa", this.address_resa);
				self.fenetre.style.display = "none";

				//display informations about reservation on the front page
				document.getElementById("confirm_stationName").innerHTML = this.name_resa;
				document.getElementById("confirm_stationAddress").innerHTML = this.address_resa;

				// start and record the timer	
				timer("1200");

			} else { // error
				console.log('form not ok');
				perso_name.style.border = "2px solid rgb(239, 90, 36)";
				perso_firstname.style.border = "2px solid rgb(239, 90, 36)";
				canvas.style.border = "2px solid rgb(239, 90, 36)";
			}
		}
	},
	// User click on 'reset button' to erase the reservation
	resetAction: function () {
		var self = this;
		self.reset_resa.addEventListener("click", stopTimer);
		function stopTimer() {
			clearTimeout(window.timerId);
			infos_reset.style.display = "block";
			confirm_resa.style.display = "none";
			reset_resa.style.display = "none";
		}
	}
}
