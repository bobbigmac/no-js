qs = (...a) => document.querySelector(...a)
aeli = (...a) => document.addEventListener(...a)
reli = (...a) => document.removeEventListener(...a)
getNow = () => (new Date()).getTime()
repeat = (f, n) => {
	for(let i=0; i<n; i++) {
		f();
	}
}
k = kontra, sx = 120, sy = 300;

k.sprite.prototype.force = function() {
	console.log(this.x, this.y, Math.sqrt(this.x + this.y), (this.width * this.height))
	return Math.sqrt(this.x + this.y) * (this.width * this.height);
}
k.vector.prototype.magnitude = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}