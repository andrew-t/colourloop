Math.TAU = Math.PI * 2;

function Colour(r, g, b) {
	this.toString = function() {
		return '#' + 
			r.toString(16) + 
			g.toString(16) +
			b.toString(16) + 
			'FF';
	}
	this.asArray = function() {
		return [r, g, b, 255]
	}
}
Colour.fromHsl = function(h, s, l) {
	// TODO
}

function RgbLoop(rn, gn, bn, rp, gp, bp) {
	this.get = function(i) {
		return new Colour(
			Math.round(Math.cos(Math.TAU * rn * i + rp) * 127.5 + 127.5),
			Math.round(Math.cos(Math.TAU * gn * i + gp) * 127.5 + 127.5),
			Math.round(Math.cos(Math.TAU * bn * i + bp) * 127.5 + 127.5));
	}
}

RgbLoop.random = function(max) {

	// http://stackoverflow.com/a/17445322/1491108
	function gcd(a,b) {
	    if (a < 0) a = -a;
	    if (b < 0) b = -b;
	    if (b > a) { var temp = a; a = b; b = temp; }
	    while (true) {
	        if ((a %= b) == 0) return b;
	        if ((b %= a) == 0) return a;
	        console.log('loop');
	    }
	}

	var rn = Math.ceil(Math.random() * max),
		gn = Math.ceil(Math.random() * max),
		bn = Math.ceil(Math.random() * max),
		f = gcd(rn, gcd(gn, bn));

	return new RgbLoop(
		rn/f, 
		gn/f, 
		bn/f, 
		Math.random() * Math.TAU, 
		Math.random() * Math.TAU, 
		Math.random() * Math.TAU)
}

function HslLoop(hn, ln, hp, lp) {
	this.get = function(i) {
		return Colour.fromHsl(
			Math.TAU * hn * i + hp,
			255,
			Math.cos(Math.TAU * ln * i + lp));
	}
}

HslLoop.random = function() {
	// TODO
}

HslLoop.prototype.toArray = RgbLoop.prototype.toArray = function(l) {
	var arr = [];
	for (var i = 0; i < l; ++i)
		arr.push(this.get(i / l));
	return arr;
}