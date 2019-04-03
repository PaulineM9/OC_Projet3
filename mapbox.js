

/**
* MAP OBJECT: GET THE STATIONS, MARKERS AND INFORMATIONS ABOUT STATIONS
*/
var MyMap = {
	init: function (params) {
		this.currentMap = L.map(params.idHtml).setView([params.centerX, params.centerY], params.zoom);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: params.maxZoom,
			id: 'mapbox.streets',
			accessToken: params.accessToken,
		}).addTo(this.currentMap);

		ajaxGet(params.urlApi, this.getStations.bind(this));
	},

	// JCDecaux function: real data from API JCDecaux, Json format
	getStations: function (list_stations) {
		var self = this;
		var station_mapping = JSON.parse(list_stations);
		var markers = new L.MarkerClusterGroup();

		station_mapping.forEach(function (station) {
			var marker = L.marker(station.position);
			markers.addLayer(marker);

			// informations about stations on 'click' on a marker into the first form
			marker.addEventListener("click", afficherInfos);
			function afficherInfos(e) {
				document.getElementById("station_status").innerHTML = station.status;
				document.getElementById("station_name").innerHTML = station.name;
				document.getElementById("name_resa").innerHTML = station.name;
				document.getElementById("station_address").innerHTML = station.address;
				document.getElementById("address_resa").innerHTML = station.address;
				document.getElementById("station_freePlaces").innerHTML = station.available_bike_stands;
				document.getElementById("station_freeBikes").innerHTML = station.available_bikes;

				// show the reservation input: condition if there is no click on a marker
				if (document.getElementById("resa_confirm").classList.contains("hidden")) {
					document.getElementById("resa_confirm").classList.remove('hidden');
					document.getElementById("alert_marker").classList.add('hidden');
				}
				// condition if there is no free bikes in the station
				if (document.getElementById("station_freeBikes").innerHTML < 1) {
					document.getElementById("alert_nofreeBikes").classList.remove('hidden');
					document.getElementById("resa_confirm").classList.add('hidden');
				} else {
					document.getElementById("alert_nofreeBikes").classList.add('hidden');
					document.getElementById("resa_confirm").classList.remove('hidden');
				}
			}
		});
		self.currentMap.addLayer(markers);

	}
}

