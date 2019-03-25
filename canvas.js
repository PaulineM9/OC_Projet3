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
		this.canvas.addEventListener("touchend",this.touchUp.bind(this), false);
		this.canvas.addEventListener("touchstart",this.touchDown.bind(this), false);
		this.mouseX = -1;
		this.mouseY = -1;
		this.isPainting = false;
	},
	pointerDown: function(evt) {
		this.ctx.beginPath();
		this.mouseX = (evt.offsetX === undefined) ? evt.layerX : evt.offsetX; 
		this.mouseY = (evt.offsetY === undefined) ? evt.layerY : evt.offsetY;
	    this.ctx.moveTo(this.mouseX, this.mouseY);
	    this.isPainting = true;
	    this.canvas.addEventListener("mousemove", this.paint.bind(this), false);
	},
	pointerUp: function(evt) {
		this.isPainting = false;
	},
	touchDown: function(evt) {
		this.ctx.beginPath();
		var canvasCss = evt.target.getBoundingClientRect();
		this.mouseX = evt.targetTouches[0].clientX - canvasCss.left;
		this.mouseY = evt.targetTouches[0].clientY - canvasCss.top;
	    this.ctx.moveTo(this.mouseX, this.mouseY);
	    this.isPainting = true;
	    this.canvas.addEventListener("touchmove", this.paint.bind(this), false);
	},
	touchUp: function(evt) {
		this.isPainting = false;
	},
	paint: function(evt) {
		if (this.isPainting == true) {
			if (evt.layerX) { 
				this.mouseX = (evt.offsetX === undefined) ? evt.layerX : evt.offsetX; 
				this.mouseY = (evt.offsetY === undefined) ? evt.layerY : evt.offsetY;
			} else { 
				var canvasCss = evt.target.getBoundingClientRect();
				this.mouseX = evt.targetTouches[0].clientX - canvasCss.left;
				this.mouseY = evt.targetTouches[0].clientY - canvasCss.top;
			}
			console.log(this.mouseX, this.mouseY);			
			this.ctx.lineTo(this.mouseX, this.mouseY);
		    this.ctx.stroke();
		}
	},
	getSignatureImage: function() {
		return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
	}
};