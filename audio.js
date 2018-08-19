
const a = new AudioContext()
function osc(w,x,y){
	// console.log(w, x, y);
	v=a.createOscillator()
	u=a.createGain()
	v.connect(u)
	v.frequency.value=x
	v.type="square"
	u.connect(a.destination)
	u.gain.value=w*0.01
	v.start(a.currentTime)
	v.stop(a.currentTime+y*0.001)
}


// requestAnimationFrame(play);
const p = () => {
	setInterval(function(){ osc(12,1233,100); osc(3,603,200)}, 1000)
	setInterval(function(){ osc(6,1246,100); osc(8,1444,100) }, 500)
	setInterval(function(){ osc(8,728,100); osc(8,728,100) }, 3000)
	setInterval(function(){ osc(8,728,400); osc(8,728,400) }, 3000)
	setInterval(function(){ osc(8,364,100); osc(8,364,100) }, 6000)
	setInterval(function(){ osc(8,220,100); osc(8,157,200) }, 1400)
}



var es = ['click', 'touchdown', 'touchmove', 'keydown'];

var go = () => {
	es.map(en => reli(en, go))
	// p()
	a.resume();
}
es.map(en => aeli(en, go));