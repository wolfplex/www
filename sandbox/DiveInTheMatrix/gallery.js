// ==================================================
//           ===== 3D DHTML gallery ====
// script written by Gerard Ferrandez - March 2007
// http://www.dhteumeuleu.com
// It's all in the pixels...
// ==================================================

var r3D = {
	O : new Array(),
	xm : 0,
	ym : 0,
	FL : 300, // focal length
	cx : 0,
	cz : 0,
	cr : 0,

	run : function ()
	{
		/* ==== sky color ==== */
		var c = Math.round(Math.max(0, (196 - Math.abs(r3D.cx)) * .5));
		r3D.scr.style.backgroundColor = "RGB(".concat(c, ",", c, ",", c, ")");
		/* ==== camera position & rotation ==== */
		r3D.cx -= Math.round((r3D.xm + r3D.cx) / 10);
		r3D.cz += Math.round((r3D.ym - r3D.cz) / 10);
		r3D.cr = -r3D.cx / 200;
		/* ==== 3D calcul ==== */
		for (var i = 0, o; o = r3D.O[i]; i++) o.display();
		setTimeout(r3D.run, 16);
	},

	addImg : function (x, y, z, i, alpha)
	{
		/* ==== creates Image Element ==== */
		var o = document.createElement('img');
		var img = document.getElementById("images").getElementsByTagName("img")[i];
		o.src = img.src;
		o.W = img.width;
		o.H = img.height;
		o.X = x;
		o.Y = y;
		o.Z = z;

		/* ==== transparency ==== */
		if (alpha)
		{
			o.style.filter = "alpha(opacity=" + (alpha * 100) + ")";
			o.style.opacity = alpha;
		}
		r3D.scr.appendChild(o);

		/* ==== main 3D function ==== */
		o.display = function ()
		{
			var x = this.X - r3D.cx;
			var y = this.Y;
			var z = this.Z - r3D.cz;
			var a = Math.atan2(z, x);
			var d = Math.sqrt(x * x + z * z);
			x = Math.cos(a + r3D.cr) * d;
			z = Math.sin(a + r3D.cr) * d;

			/* ==== element visible ==== */
			if (z > -r3D.FL * .9)
			{
				var r = r3D.FL / (r3D.FL + z);
				var w = this.W * r * r3D.Z;
				var h = this.H * r * r3D.Z;
				this.style.left   = ''.concat(Math.floor((r3D.nw * .5) + (x * r) - (w * .5)), 'px');
				this.style.top    = ''.concat(Math.floor((r3D.nh * .5) + (y * r) - (h * .5)), 'px');
				this.style.width  = ''.concat(Math.ceil(w), 'px');
				this.style.height = ''.concat(Math.ceil(h), 'px');
				this.style.zIndex = Math.round(10000 - z);
			}
			else this.style.width = '0px';
		}

		return o;
	},

	init : function ()
	{
		r3D.scr = document.getElementById('screen');
		resize();
		/* ==== creates 3D structure ==== */
		for (var i = 0; i < 10; i++)
		{
			/* ==== central lights ==== */
			r3D.O.push(
				r3D.addImg(0, 300, (i * .5) * r3D.nh * .75, 10)
			);

			var i1 = (i < 5 ? -1 : 1) * r3D.nw * .25;
			var i2 = (i < 5 ? i : i - 5) * r3D.nh * .75;
			r3D.O.push(
				r3D.addImg(i1, 150, i2, 11, .5)
			);
			r3D.O.push(
				r3D.addImg(i1, 0, i2, i)
			);
		}
		/* ==== moon ==== */
		r3D.O.push(
			r3D.addImg(0, -1000, r3D.nh * 5, 12)
		);
		/* ==== zyva ==== */
		document.getElementById('ground').innerHTML = " ";
		r3D.run();
	},

	/* ==== screen resize ==== */
	resize : function ()
	{
		r3D.nx = r3D.scr.offsetLeft;
		r3D.ny = r3D.scr.offsetTop;
		r3D.nw = r3D.scr.offsetWidth;
		r3D.nh = r3D.scr.offsetHeight;
		r3D.Z  = r3D.nw / 2000;
	},

	/* ==== mouse position ==== */
	mousemove : function (e)
	{
		if (window.event) e = window.event;
		r3D.xm = -r3D.nx + e.clientX - r3D.nw * .5;
		r3D.ym = -r3D.nh + e.clientY * 4.5;
	}
}

/* ==== global events ==== */
function resize()
{
	r3D.resize();
	document.onmousemove = function(e)
	{
		r3D.mousemove(e);
	}
}
onresize = resize;

onload = function ()
{
	setTimeout(
		r3D.init, 1000
	);
}

