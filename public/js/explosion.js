/*==============================================================================
Init
==============================================================================*/
galaxy.Explosion = function( opt ) {
	for( var k in opt ) {
		this[k] = opt[k];
	}
	this.tick = 0;
	this.tickMax = 20;
	if( galaxy.slow ) {
		galaxy.audio.play( 'explosionAlt' );
	} else {
		galaxy.audio.play( 'explosion' );
	}
};

/*==============================================================================
Update
==============================================================================*/
galaxy.Explosion.prototype.update = function( i ) {
	if( this.tick >= this.tickMax ) {
		galaxy.explosions.splice( i, 1 );
	} else {
		this.tick += galaxy.dt;
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.Explosion.prototype.render = function( i ) {
	if( galaxy.util.arcInRect( this.x, this.y, this.radius, -galaxy.screen.x, -galaxy.screen.y, galaxy.cw, galaxy.ch ) ) {
		var radius = 1 + ( this.tick / ( this.tickMax / 2 ) ) * this.radius,
			lineWidth = galaxy.util.rand( 1, this.radius / 2 );
		galaxy.util.strokeCircle( galaxy.ctxmg, this.x, this.y, radius, 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + galaxy.util.rand( 40, 80 ) + '%, ' + Math.min( 1, Math.max( 0, ( 1 - ( this.tick / this.tickMax ) ) ) ) + ')', lineWidth);
		galaxy.ctxmg.beginPath();
		var size = galaxy.util.rand( 1, 1.5 );
		for( var i = 0; i < 20; i++ ) {
			var angle = galaxy.util.rand( 0, galaxy.twopi ),
				x = this.x + Math.cos( angle ) * radius,
				y = this.y + Math.sin( angle ) * radius;

			galaxy.ctxmg.rect( x - size / 2, y - size / 2, size, size );
		}
		galaxy.ctxmg.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + galaxy.util.rand( 50, 100 ) + '%, 1)';
		galaxy.ctxmg.fill();

		galaxy.ctxmg.fillStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, 50%, ' + Math.min( 1, Math.max( 0, ( 0.03 - ( this.tick / this.tickMax ) * 0.03 ) ) ) + ')';
		galaxy.ctxmg.fillRect( -galaxy.screen.x, -galaxy.screen.y, galaxy.cw, galaxy.ch );
	}
};
