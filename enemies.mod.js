
import bullets from './bullets.mod.js';

const enemies = kontra.pool({
  create: kontra.sprite,
  maxSize: 100,
});

const etypes = [
	{
		color: '#A84E47',
		hp: 1,
		width: 10,
		height: 10,
		fireRate: 2000,
		fired: getNow(),
		speed: 1,
		move: function() {
			this.dx = this.seed * this.speed * Math.random() * 8; 
			this.dy = this.speed * Math.random() * 2;
			//this.moveSnd();
		},
		fire: bullets.fire,
		btypes: [0],
		x: sx,
		y: 0,
		ttl: 2000,
		moveSnd: () => { osc(8,2828,100); }
	},
	{
		color: '#4F5691',
		hp: 20,
		width: 30,
		height: 22,
		fireRate: 2000,
		fired: getNow(),
		speed: 0.1,
		move: function() {
			this.dx = this.seed * this.speed * Math.random() * 16; 
			this.dy = this.speed * Math.random() * 2;
			//this.moveSnd();
		},
		fire: bullets.fire,
		btypes: [1],
		x: sx,
		y: 0,
		ttl: 2000,
		moveSnd: () => { osc(8,1728,100); }
	},
]

enemies.make = (type = 0) => {
	const et = etypes[type];
	const enemy = Object.assign({
		faction:  1,
		dx: et.speed,
		dy: et.speed,
		seed: Math.random() - 0.5,
		isAlive: function() { return this.ttl > 0 && this.y > 0 && this.y < 320 && this.hp > 0 }
	}, et);
	enemy.move()
	enemies.get(enemy)
}

export default enemies;
