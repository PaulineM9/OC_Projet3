// Ajax GET function

function ajaxGet(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function () {
		if (req.status >= 200 && req.status < 400) {
			callback(req.responseText); // ex: fonction callback = getStations(list_stations)
			//console.log(req.responseText);
		} else {
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function () {
		console.error("Erreur réseau avec l'url " + url);
	});
	req.send(null);
};

function qsa(selector) {
	return document.querySelectorAll(selector);
};

function qs(selector) {
	return document.querySelector(selector);
};

// check if a string is valid
function isStringValid(string) {
	// TODO: improve the type checking, exe : "4" should not be valid
	//var reName = document.getElementById("perso_name").value;
	//var reFirstName = document.getElementById("perso_firstname").value;

	if (string !== '' && typeof string == "string" && /[a-zA-Z]/.test(string)) {
		return true;
	} else {
		return false;
	}
}

function timer() {
	if (window.timerId) { // reset the previous timer if running
		clearTimeout(window.timerId)
	}
	var timer_resa = document.getElementById("confirm_resa");
	s = duree;
	m = 0;
	h = 0;
	if (s < 0) {
		timer_resa.innerHTML = "La durée de votre réservation a expiré." // remplacer par remove ('hidden') sur span html
		window.reset_resa.style.display = "none";
	} else {
		if (s > 59) {
			m = Math.floor(s / 60);
			s = s - m * 60;
		}
		if (m > 59) {
			h = Math.floor(m / 60);
			m = m - h * 60;
		}
		if (s < 10) {
			s = "0" + s;
		}
		if (m < 10) {
			m = "0" + m
		}
		timer_resa.innerHTML = m + ":" + s;
	}
	duree = duree - 1;
	window.timerId = window.setTimeout(timer, 9);//indiquer 999
}



