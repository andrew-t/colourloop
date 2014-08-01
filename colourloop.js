var colourLoop = {};

(function(){

	var tau = Math.PI * 2;

	colourLoop.Colour = function(r, g, b) {
		r = Math.round(r);
		g = Math.round(g);
		b = Math.round(b);
		this.toString = function() {
			return '#' + 
				r.toString(16).replace(/^(.)$/, '0$1') + 
				g.toString(16).replace(/^(.)$/, '0$1') +
				b.toString(16).replace(/^(.)$/, '0$1') + 
				'FF';
		}
		this.asArray = function() {
			return [r, g, b, 255]
		}
	};
	colourLoop.Colour.fromHsl = function(h, s, l) {
		// TODO
	};

	colourLoop.RgbLoop = function(rn, gn, bn, rp, gp, bp) {
		this.get = function(i) {
			return new Colour(
				Math.cos(tau * rn * i + rp) * 127.5 + 127.5,
				Math.cos(tau * gn * i + gp) * 127.5 + 127.5,
				Math.cos(tau * bn * i + bp) * 127.5 + 127.5);
		}
	};

	colourLoop.RgbLoop.random = function(max) {

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
			Math.random() * tau, 
			Math.random() * tau, 
			Math.random() * tau)
	};

	colourLoop.HslLoop = function(hn, ln, hp, lp) {
		this.get = function(i) {
			return Colour.fromHsl(
				tau * hn * i + hp,
				255,
				Math.cos(tau * ln * i + lp));
		}
	};

	colourLoop.HslLoop.random = function() {
		// TODO
	};

	colourLoop.moviePosterLoop = function(r, g, b) {
		this.get = function(i) {
			i *= 4;
			if (i < 1)
				return new colourLoop.Colour(
					r * i * 255,
					g * i * 255,
					b * i * 255);
			if (--i < 1)
				return new colourLoop.Colour(
					(r + i - r * i) * 255,
					(g + i - g * i) * 255,
					(b + i - b * i) * 255);
			if (--i < 1)
				return new colourLoop.Colour(
					((1 - r) + (1 - i) - (1 - r) * (1 - i)) * 255,
					((1 - g) + (1 - i) - (1 - g) * (1 - i)) * 255,
					((1 - b) + (1 - i) - (1 - b) * (1 - i)) * 255);
			--i;
			return new colourLoop.Colour(
				(1 - r) * (1 - i) * 255,
				(1 - g) * (1 - i) * 255,
				(1 - b) * (1 - i) * 255);
		}
	};
	colourLoop.moviePosterLoop.random = function() {
		switch (Math.floor(Math.random() * 6)) {
			case 0: return new colourLoop.moviePosterLoop(1, Math.random(), 0);
			case 1: return new colourLoop.moviePosterLoop(0, Math.random(), 1);
			case 2: return new colourLoop.moviePosterLoop(1, 0, Math.random());
			case 3: return new colourLoop.moviePosterLoop(0, 1, Math.random());
			case 4: return new colourLoop.moviePosterLoop(Math.random(), 1, 0);
			case 5: return new colourLoop.moviePosterLoop(Math.random(), 0, 1);
		}
	};

	colourLoop.moviePosterLoop.prototype.toArray = 
	colourLoop.HslLoop.prototype.toArray = 
	colourLoop.RgbLoop.prototype.toArray = function(l) {
		var arr = [];
		for (var i = 0; i < l; ++i)
			arr.push(this.get(i / l));
		return arr;
	};

}());