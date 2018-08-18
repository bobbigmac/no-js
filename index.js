
kontra.init('no');

let sprite = kontra.sprite({
	name: 'bob',
	faction: 'player',
	// x: 0,
	// y: 80,
	color: 'red',
	width: 40,
	height: 40,
	// move the sprite 2px to the right every frame
	// dx: 2
});

// kontra.pointer.track(sprite);
sprite.position.clamp(0, 0, 440, 600);
const speed = 0.1;

let loop = kontra.gameLoop({
	fps: 60,
	update: function() {
		sprite.x = sprite.x + ((kontra.pointer.x - sprite.x) * speed);
		sprite.y = sprite.y + ((kontra.pointer.y - sprite.y) * speed);

		sprite.update();
		
		// wrap the sprites position when it reaches
		// the edge of the screen
		// if (sprite.x > kontra.canvas.width) {
		// 	sprite.x = -sprite.width;
		// }
	},
	render: function() {
		//TODO: pool.render
		sprite.render();
	}
});

loop.start();    // start the game