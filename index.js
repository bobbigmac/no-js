
kontra.init('no');

let sprite = kontra.sprite({
	x: 0,
	y: 80,
	color: 'red',
	width: 40,
	height: 40,
	// move the sprite 2px to the right every frame
	dx: 2
});

let loop = kontra.gameLoop({
	fps: 60,
	update: function() {
		sprite.update();

		// wrap the sprites position when it reaches
		// the edge of the screen
		if (sprite.x > kontra.canvas.width) {
			sprite.x = -sprite.width;
		}
	},
	render: function() {
		//TODO: pool.render
		sprite.render();
	}
});

loop.start();    // start the game