vtc = htc = playerX = playerY = appleX = appleY = xVelocity = yVelocity = 0;
ctx = null;
places = [];
tail = 5;
scale = 30;

window.onload = function() {
	canvas = document.getElementById('mainCanvas');
	tileCount();
	canvas.width = htc * scale;
	canvas.height = vtc * scale;
	console.log(vtc, htc);

	mc = new Hammer(canvas);
	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
	mc.on('swipeleft', function() {
		console.log('swipedleft');
		xVelocity = -1;
		yVelocity = 0;
	});
	mc.on('swipeup', function() {
		console.log('swipedup');
		xVelocity = 0;
		yVelocity = -1;
	});
	mc.on('swiperight', function() {
		console.log('swipedright');
		xVelocity = 1;
		yVelocity = 0;
	});
	mc.on('swipedown', function() {
		console.log('swipeddown');
		xVelocity = 0;
		yVelocity = 1;
	});
	playerX = randomStartPos(htc);
	playerY = randomStartPos(vtc);
	appleX = randomStartPos(htc);
	appleY = randomStartPos(vtc);

	ctx = canvas.getContext('2d');
	addEventListener('keydown', keyPressed);
	setInterval(game, 1000 / 13);
};

function tileCount() {
	vtc = Math.floor(window.innerHeight / scale);
	htc = Math.floor(window.innerWidth / scale);
}

function randomStartPos(number) {
	return Math.floor(Math.random() * number);
}

function game() {
	playerX += xVelocity;
	playerY += yVelocity;
	overflowCheck();

	// fill background into grey
	ctx.fillStyle = '#192a56';
	ctx.fillRect(0, 0, htc * scale, vtc * scale);

	drawLines(htc * scale, vtc * scale, scale, ctx);

	ctx.fillStyle = 'lime';
	for (var i = 0; i < places.length; i++) {
		ctx.fillRect(places[i].x * scale + 1, places[i].y * scale + 1, scale - 2, scale - 2);
		if (places[i].x == playerX && places[i].y == playerY) {
			tail = 5;
			console.log('delete');
		}
	}

	places.push({ x: playerX, y: playerY });
	while (places.length > tail) {
		places.shift();
	}

	if (playerX == appleX && playerY == appleY) {
		tail++;
		maxWidth = htc;
		maxHeight = vtc;
		appleX = Math.floor(Math.random() * maxWidth);
		appleY = Math.floor(Math.random() * maxHeight);
	}

	ctx.fillStyle = 'red';
	ctx.fillRect(appleX * scale + 1, appleY * scale + 1, scale - 2, scale - 2);
}

function overflowCheck() {
	if (playerX > htc - 1) {
		playerX = 0;
	}
	if (playerY > vtc - 1) {
		playerY = 0;
	}
	if (playerX < 0) {
		playerX = htc - 1;
	}
	if (playerY < 0) {
		playerY = vtc - 1;
	}
}

function keyPressed(e) {
	if (e.keyCode == 37) {
		xVelocity = -1;
		yVelocity = 0;
	} else if (e.keyCode == 38) {
		xVelocity = 0;
		yVelocity = -1;
	} else if (e.keyCode == 39) {
		xVelocity = 1;
		yVelocity = 0;
	} else if (e.keyCode == 40) {
		xVelocity = 0;
		yVelocity = 1;
	}
}

function drawLines(width, height, scale, context) {
	context.strokeStyle = '#7f8fa6';
	for (let i = 0; i < width / scale; i++) {
		context.beginPath();
		context.moveTo(i * scale, 0);
		context.lineTo(i * scale, height);
		context.stroke();
	}

	for (let i = 0; i < height / scale; i++) {
		context.beginPath();
		context.moveTo(0, i * scale);
		context.lineTo(width, i * scale);
		context.stroke();
	}
}
