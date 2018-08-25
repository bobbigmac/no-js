
const particles = kontra.pool({
  create: kontra.sprite,
  maxSize: 1000,
});

const pAlive = function() {
	return this.ttl > 0 && 
		this.x < 240 && this.x > 0 && 
		this.y < 320 && this.y > 0 && 
		(this.dx > 0.001 || this.dx < 0.001) &&
		(this.dy > 0.001 || this.dy < 0.001);
};

//TODO: Apply decay
const decay = function() {
	this.dx = this.dx * 0.9;
	this.dy = this.dy * 0.9;
	// this.opacity = this.opacity * 0.95;
	
	this.width *= 1.1;
	this.height *= 1.1;
}

const ptypes = [{
	speed: 1,
	width: 2,
	height: 2,
	defcolor: 'green',
	ttl: 120,
	isAlive: pAlive,
	decay: decay
},{
	speed: 1,
	width: 3,
	height: 3,
	defcolor: 'pink',
	ttl: 240,
	isAlive: pAlive,
	decay: decay
},{
	speed: 0.5,
	width: 1,
	height: 1,
	defcolor: 'white',
	ttl: 10,
	isAlive: pAlive,
	decay: decay
}]

particles.make = function(type = 0, s1, s2) {
	s1 && (this.ptypes || [type]).map(type => {
		const pt = ptypes[type];
		
		particles.get(Object.assign({
			x: s1.x,
			y: s1.y,
			dx: ((Math.random() * 1.6) - 1) * pt.speed,
			dy: ((Math.random() * 2) - 1) * pt.speed,
			color: (s2 && s2.color) || pt.defcolor || 'white'
		}, pt))
	});
};

export default particles;