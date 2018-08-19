
const gNow = () => (new Date()).getTime()
const k = kontra;
k.init('no');

const bullets = k.pool({
  create: kontra.sprite,
  maxSize: 1000,
});

let bSpeed = -10;

const player = k.sprite({
	name: 'bob',
	faction: 'player',
	x: 120,
	y: 300,
	color: '#C9D38D',
	width: 10,
	height: 10,
	speed: 0.05,
	fireRate: 100,
	lastFired: gNow(),
	fire: function() {
		// console.log(this);
		bullets.get({
			faction: this.faction,
			x: this.x + ((this.width / 2) - 1), 
			y: this.y - 6,
			width: 4,
			height: 5,
			color: 'green',
			dy: bSpeed,
			ttl: 1000,
		})
		osc(8,1328,100); osc(8,1328,100);
	}
});

player.position.clamp(0, 0, 230, 310);

const loop = k.gameLoop({
	fps: 60,
	update: function() {
		const scale = 320 / k.canvas.offsetHeight;
		const now = gNow();

		x = (k.pointer.x * scale) - (player.width / 2);
		y = (k.pointer.y * scale) - (player.height / 2);

		player.dx = (x - player.x) * player.speed;
		player.dy = (y - player.y) * player.speed;

		if(k.keys.pressed('space') && now > player.lastFired + player.fireRate) {
			player.fire();
			player.lastFired = now;
		}

		bullets.update();
		player.update();
	},
	render: function() {
		bullets.render();
		player.render();
	}
});

loop.start();    // start the game