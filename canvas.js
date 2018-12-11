/**
*OBJECT CANVAS
*/

//MODE OBJET:
var Canvas = {
	init: function(canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.canvas.addEventListener("mousedown", this.pointerDown.bind(this), false);
		this.canvas.addEventListener("mouseup", this.pointerUp.bind(this), false);
		this.isPainting = false;
	},
	pointerDown: function(evt) {
		console.log(this);
		this.ctx.beginPath();
	    this.ctx.moveTo(evt.offsetX, evt.offsetY);
	    this.isPainting = true;
	    this.canvas.addEventListener("mousemove", this.paint.bind(this), false);
	},
	pointerUp: function(evt) {
		this.isPainting = false;
	},
	paint: function(evt) {
		if (this.isPainting == true) {
			this.ctx.lineTo(evt.offsetX, evt.offsetY);
		    this.ctx.stroke();
		}
	},
	getSignatureImage: function() {
		return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
	}
};



//CODE PROCÉDURAL:
/*var canvas = document.getElementById("resa_canvas");
var ctx = canvas.getContext("2d");

canvas.addEventListener("mousedown", pointerDown, false);
canvas.addEventListener("mouseup", pointerUp, false);

function pointerDown(evt) {
	ctx.beginPath(); // mettre un this devant
    ctx.moveTo(evt.offsetX, evt.offsetY);
    canvas.addEventListener("mousemove", paint, false);
}
 
function pointerUp(evt) {
    canvas.removeEventListener("mousemove", paint);
    paint(evt);
}
 
function paint(evt) {
    ctx.lineTo(evt.offsetX, evt.offsetY);
    ctx.stroke();
}

function getSignatureImage() {
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
}*/

