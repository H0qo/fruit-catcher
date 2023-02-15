// Initialize variables
var canvas;
var ctx;
var score = 0;
var catcher = {
	x: 200,
	y: 450,
	width: 50,
	height: 50,
	speed: 10
};
var fruits = [];

// Create a new fruit every 1000ms
setInterval(function() {
	var fruit = {
		x: Math.random() * 500,
		y: 0,
		radius: 25,
		speed: 5,
		color: 'red'
	};
	fruits.push(fruit);
}, 1000);

// Move the catcher
function moveCatcher(key) {
	if (key == 'ArrowLeft') {
		catcher.x -= catcher.speed;
	}
	else if (key == 'ArrowRight') {
		catcher.x += catcher.speed;
	}
}

// Check if the catcher caught a fruit
function checkCatch() {
	for (var i = 0; i < fruits.length; i++) {
		var fruit = fruits[i];
		var dx = catcher.x - fruit.x;
		var dy = catcher.y - fruit.y;
		var distance = Math.sqrt(dx*dx + dy*dy);
		if (distance < catcher.width/2 + fruit.radius) {
			fruits.splice(i, 1);
			score++;
		}
	}
}

// Draw the game
function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the catcher
	ctx.fillStyle = 'blue';
	ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);

	// Draw the fruits
	for (var i = 0; i < fruits.length; i++) {
		var fruit = fruits[i];
		ctx.fillStyle = fruit.color;
		ctx.beginPath();
		ctx.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fill();

		// Move the fruit
		fruit.y += fruit.speed;
	}

	// Check if the catcher caught a fruit
	checkCatch();

	// Draw the score
	ctx.fillStyle = 'white';
	ctx.font = '24px Arial';
	ctx.fillText('Score: ' + score, 10, 30);

	// Request another animation frame
	requestAnimationFrame(draw);
}

// Set up the game
function setup() {
	// Get the canvas and context
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	// Set the canvas size
	canvas.width = 500;
	canvas.height = 500;

