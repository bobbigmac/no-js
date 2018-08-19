
const getNow = () => (new Date()).getTime()
const k = kontra;
k.init('no');

const bullets = k.pool({
  create: kontra.sprite,
  maxSize: 1000,
});

const enemies = k.pool({
  create: kontra.sprite,
  maxSize: 100,
});

const btypes = [{
	speed: 10,
	damage: 10,
	width: 4,
	height: 5,
	color: 'green',
	ttl: 60,
	isAlive: function() { return this.ttl > 0 && this.y < 320 && this.y > 0 },
	snd: () => { osc(8,1328,100); osc(8,1328,100); }
}]

const fire = function(type = 0, faction = 1) {
	const bt = btypes[type];

	bullets.get(Object.assign({
		faction: this.faction,
		x: this.x + ((this.width / 2) - 1),
		y: this.y - (-6 * this.faction),
		dy: this.faction * bt.speed,
	}, bt))

	bt.snd && bt.snd();
};

const player = k.sprite({
	name: 'bob',
	faction: -1,
	x: (sx = 120),
	y: (sy = 300),
	color: '#C9D38D',
	width: 10,
	height: 10,
	speed: 0.1,
	fireRate: 100,
	fired: getNow(),
	fire: fire
});

const etypes = [
	{
		faction:  1,
		color: 'red',
		width: 10,
		height: 10,
		fireRate: 1000,
		fired: getNow(),
		speed: 1,
		move: function() {
			this.dx = this.seed * this.speed * Math.random(); 
			this.dy = this.speed * Math.random() * 4;
		},
		fire: fire,
		x: sx,
		y: 0,
		ttl: 2000
	}
]
const makeEnemy = (type = 0) => {
	const et = etypes[type];
	const enemy = Object.assign({
		dx: et.speed,
		dy: et.speed,
		seed: Math.random() - 0.5,
		isAlive: function() { return this.ttl > 0 && this.y < 320 }
	}, et);
	enemy.move()
	console.log(enemy);
	enemies.get(enemy)
}

player.position.clamp(0, 0, 230, 310);
let renders = 0;

const loop = k.gameLoop({
	fps: 30,
	update: function() {
		const scale = 320 / k.canvas.offsetHeight;
		const now = getNow();

		x = (k.pointer.x || (sx / scale))
		x = (x * scale) - (player.width / 2);
		y = (k.pointer.y || (sy / scale))
		y = (y * scale) - (player.height / 2);

		// console.log(k.pointer.x, k.pointer.y, x, y);

		player.dx = (x - player.x) * player.speed;
		player.dy = (y - player.y) * player.speed;

		if(k.keys.pressed('space') && now > player.fired + player.fireRate) {
			player.fire(0, -1);
			player.fired = now;
		}

		bullets.update();
		
		if(!(renders % 2)) {
			enemies.getAliveObjects().map(x => {
				x.move();
				if(now > x.fired + x.fireRate) {
					x.fire();
					x.fired = now;
				}
			});
		}
		enemies.update();
		
		player.update();

		if(!(renders % 100)) {
			makeEnemy(0);
		}
		renders++;
	},
	render: function() {
		bullets.render();
		enemies.render();
		player.render();
	}
});

loop.start();    // start the game