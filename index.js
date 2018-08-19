
k.init('no');

import bullets from './bullets.mod.js';
import enemies from './enemies.mod.js';

const player = k.sprite({
	name: 'player',
	hp: 100,
	faction: -1,
	x: sx,
	y: sy,
	color: '#C9D38D',
	width: 10,
	height: 10,
	speed: 0.1,
	fireRate: 100,
	fired: getNow(),
	ttl: Infinity,
	isAlive: function() { return this.hp > 0; },
	fire: bullets.fire
});

player.position.clamp(0, 0, 230, 310);

const endGame = () => {
	//TODO: Something interesting
	qs('#no').style.opacity = 0.5;
	loop.stop();
}

let renders = 0;
const loop = k.gameLoop({
	fps: 60,
	update: function() {
		const scale = 320 / k.canvas.offsetHeight;
		const now = getNow();

		let x = (k.pointer.x || (sx / scale))
		x = (x * scale) - (player.width / 2);
		let y = (k.pointer.y || (sy / scale))
		y = (y * scale) - (player.height / 2);

		player.dx = (x - player.x) * player.speed;
		player.dy = (y - player.y) * player.speed;

		// console.log(player.dx, player.dy, player.x, player.y, player.width, player.height);
		if(k.keys.pressed('space') && now > player.fired + player.fireRate) {
			player.fire(0, -1);
			player.fired = now;
		}
		
		bullets.getAliveObjects().map(b => {
			if(b.faction !== player.faction && player.collidesWith(b)) {
				player.hp -= b.damage || 1;
				b.hp = 0;
				console.log('Player hit, took', b.damage, 'damage. Has health', player.hp)
			}
			if(b.faction === player.faction) {
				enemies.getAliveObjects().some(e => {
					if(b.collidesWith(e)) {
						e.hp--;
						b.hp = 0;
					}
				})
			}
		});

		enemies.getAliveObjects().map(e => {
			e.move();
			if(now > e.fired + e.fireRate) {
				e.fire();
				e.fired = now;
			}
			if(player.collidesWith(e)) {
				player.hp -= e.speed
			}
		});

		if(!player.isAlive()) {
			endGame();
		}

		enemies.update();
		player.update();

		bullets.update();

		if(!(renders % 100)) {
			enemies.make(0);
		}
		if(!(renders % 240)) {
			enemies.make(1);
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