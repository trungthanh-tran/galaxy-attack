/*==============================================================================
Init
==============================================================================*/
galaxy.TextPop = function( opt ) {
	for( var k in opt ) {
		this[k] = opt[k];
	}
	this.alpha = 2;
	this.vy = 0;
};

/*==============================================================================
Update
==============================================================================*/
galaxy.TextPop.prototype.update = function( i ) {
	this.vy -= 0.05;
	this.y += this.vy * galaxy.dt;
	this.alpha -= 0.03 * galaxy.dt;

	if( this.alpha <= 0 ){
		galaxy.textPops.splice( i, 1 );
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.TextPop.prototype.render = function( i ) {
	galaxy.ctxmg.beginPath();
	galaxy.text( {
		ctx: galaxy.ctxmg,
		x: this.x,
		y: this.y,
		text: '+' + this.value,
		hspacing: 1,
		vspacing: 0,
		halign: 'center',
		valign: 'center',
		scale: 2,
		snap: 0,
		render: 1
	} );
	galaxy.ctxmg.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, ' + this.alpha + ')';
	galaxy.ctxmg.fill();
}
