// Ajax GET function

function ajaxGet(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function() {
		if (req.status >= 200 && req.status < 400){
			callback(req.responseText); // ex: fonction callback = getStations(list_stations)
			//console.log(req.responseText);
		} else {
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function() {
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
	var reName = document.getElementById("perso_name").value;
	var reFirstName = document.getElementById("perso_firstname").value;

	if (string !== '' && typeof string == "string" && /[a-zA-Z]/.test(reName) && /[a-zA-Z]/.test(reFirstName) ) {
		return true;
	} else {
		return false;
	}
}


