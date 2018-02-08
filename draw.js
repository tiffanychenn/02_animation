var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#98DFAF";

var bstop = document.getElementById("stop");
var bcircle = document.getElementById("circle");
var bsquare = document.getElementById("square");

var requestID = 0;
var r = 0;
var a = 1;

var directionx = Math.floor(Math.random() * 10) - 5;
var directiony = Math.floor(Math.random() * 10) - 5;
var posx = 250;
var posy = 250;

var stopped = false;
var started = false;
var expanding;

var animatec = function(){
	started = true;
	expanding = true;
	stopped = false;
	bstop.innerHTML = "stop";
	animationc(true);
}

var animationc = function(bool){
	pause();
	if (bool){
		r = 0;
	}
	var draw = function(){
		findRadius();
		ctx.clearRect(0, 0, 500, 500);
		ctx.beginPath();
		ctx.arc(250, 250, r, 0, 2 * Math.PI);
		ctx.fill();
		requestID = window.requestAnimationFrame(draw);
	}
	draw();
}

var findRadius = function(){
	if (r == 0){
		a = 1;
	}
	else if (r == 250){
		a = -1;
	}
	r += a;
}

var animates = function(){
	started = true;
	expanding = false;
	stopped = false;
	bstop.innerHTML = "stop";
	animations(true);
}

var animations = function(bool){
	pause();
	if (bool){
		directionx = Math.floor(Math.random() * 10) - 5;
		directiony = Math.floor(Math.random() * 10) - 5;
		posx = 250;
		posy = 250;
	}
	var draw = function(){
		ctx.clearRect(0, 0, 500, 500);
		ctx.fillRect(posx - 10, posy - 10, 20, 20);
		posx += directionx;
		posy += directiony;
		if (posy - 10 <= 0 || posy + 10 >= 500){
			directiony = -1 * directiony;
		}
		if (posx - 10 <= 0 || posx + 10 >= 500){
			directionx = -1 * directionx;
		}
		requestID = window.requestAnimationFrame(draw);
	}
	draw();
}

var stop = function(){
	if (started){
		if (stopped) {
			restart();
			bstop.innerHTML = "stop";
		}
		else {
			pause();
			bstop.innerHTML = "continue";
		}
		stopped = !stopped;
	}
}

var pause = function(){
	window.cancelAnimationFrame(requestID);
}

var restart = function(){
	if (expanding){
		animationc(false);
	}
	else {
		animations(false);
	}
}

bstop.addEventListener('click', stop);
bcircle.addEventListener('click', animatec);
bsquare.addEventListener('click', animates);