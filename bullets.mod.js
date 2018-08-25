
const bullets = kontra.pool({
  create: kontra.sprite,
  maxSize: 1000,
});

const bAlive = function() { return this.ttl > 0 && this.y < 320 && this.y > 0 && this.hp > 0 };

const btypes = [{
	speed: 5,
	damage: 10,
	hp: 4,
	width: 3,
	height: 5,
	color: 'green',
	ttl: 120,
	isAlive: bAlive,
	snd: () => { osc(8,1728,100); osc(8,1328,100); }
},{
	speed: 3,
	damage: 20,
	hp: 10,
	width: 5,
	height: 6,
	color: 'pink',
	ttl: 240,
	isAlive: bAlive,
	snd: () => { osc(8,1728,100); osc(8,1328,100); }
}]

bullets.fire = function(type = 0, faction = 1) {
	(this.btypes || [type]).map(type => {
		const bt = btypes[type];
		bullets.get(Object.assign({
			faction: this.faction,
			x: this.x + ((this.width / 2) - 1),
			y: this.y - (-6 * this.faction),
			// dy: this.dy + (this.faction * bt.speed),
			dy: this.faction * bt.speed,
		}, bt))

		bt.snd && bt.snd();
	});
};

export default bullets;