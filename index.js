
kontra.init('no');

let player = kontra.sprite({
	name: 'bob',
	faction: 'player',
	x: 120,
	y: 300,
	color: '#C9D38D',
	width: 10,
	height: 10,
	speed: 0.1,
});

player.position.clamp(0, 0, 230, 310);

let loop = kontra.gameLoop({
	fps: 30,
	update: function() {
		const scale = 320 / kontra.canvas.offsetHeight;
		x = kontra.pointer.x * scale;
		y = kontra.pointer.y * scale;

		player.dx = (x - player.x) * player.speed;
		player.dy = (y - player.y) * player.speed;

		player.update();
	},
	render: function() {
		//TODO: pool.render
		player.render();
	}
});

loop.start();    // start the game