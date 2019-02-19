//CONTROLER MAP OBJECT
var paramsLyonMap = {
	idHtml: 'map',
	centerX: 45.759,
	centerY: 4.841,
	zoom: 15,
	maxZoom: 18,
	accessToken: 'pk.eyJ1IjoicG9wZXRtYXJ0aW4iLCJhIjoiY2psZHJxeGdsMGVsNDNwcGN3aWF3ejF0YiJ9.3iDSqbxFPGAoZhufMGjQ4Q',
	urlApi: 'https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=d1c0e086be36198f9769f3471cef097846c8046e',
};

var mapLyon = Object.create(MyMap);
mapLyon.init(paramsLyonMap);

//CONTROLER RESA OBJECT
var currentResa = Object.create(InfosReservation);
currentResa.openBox();
currentResa.eraseBox();
currentResa.clickOut();
currentResa.confirmResa();
currentResa.resetAction();

//CONTROLER CANVAS OBJECT
var signatureParams = {
	canvas: document.getElementById("resa_canvas"),
	isPainting: false,
};

signatureParams.ctx = signatureParams.canvas.getContext("2d");

var myCanvas = Object.create(Canvas);
myCanvas.init(signatureParams.canvas, signatureParams.ctx);

//CONTROLER SLIDER OBJECT
var sliderGo = Object.create(Slider);
sliderGo.startAutoPlay();
sliderGo.initControls();