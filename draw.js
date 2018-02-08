var c = document.getElementById("canvas");
var ctx = c.getContext("2d");
ctx.fillStyle = "#98DFAF";

var b = document.getElementById("stop");

var requestID = 0;
var r = 0;
var a = 1;
var stopped = false;

var animate = function(){
	stopped = false;
	b.innerHTML = "stop";
	animation(true);
}

var animation = function(bool){
	pause();
	if (bool){
		r = 0;
	}
	var draw = function(){
		r = findRadius();
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
	return r;
}

var stop = function(){
	if (stopped) {
		restart();
		b.innerHTML = "stop";
	}
	else {
		pause();
		b.innerHTML = "continue";
	}
	stopped = !stopped;
}

var pause = function(){
	window.cancelAnimationFrame(requestID);
}

var restart = function(){
	animation(false);
}

c.addEventListener('click', animate);
b.addEventListener('click', stop);