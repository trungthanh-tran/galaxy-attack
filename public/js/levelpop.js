/*==============================================================================
Init
==============================================================================*/
galaxy.LevelPop = function( opt ) {
	for( var k in opt ) {
		this[k] = opt[k];
	}
	this.x = galaxy.cw - 20;
	this.y = galaxy.ch - 20;
	this.tick = 0;
	this.tickMax = 240;
	this.baseAlpha = 0.2;
	if( galaxy.tick != 0 ) {
		galaxy.audio.play( 'levelup' );
	}
};

/*==============================================================================
Update
==============================================================================*/
galaxy.LevelPop.prototype.update = function( i ) {
	if( this.tick >= this.tickMax ) {
		galaxy.levelPops.splice( i, 1 );
	} else {
		this.tick += galaxy.dt;
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.LevelPop.prototype.render = function( i ) {
	galaxy.ctxmg.beginPath();
	galaxy.text( {
		ctx: galaxy.ctxmg,
		x: this.x,
		y: this.y,
		text: galaxy.util.pad( this.level, 2 ),
		hspacing: 3,
		vspacing: 0,
		halign: 'right',
		valign: 'bottom',
		scale: 12,
		snap: 1,
		render: 1
	} );
	if( this.tick < this.tickMax * 0.25 ) {
		var alpha = ( this.tick / ( this.tickMax * 0.25 ) ) * this.baseAlpha;
	} else if( this.tick > this.tickMax - this.tickMax * 0.25 ) {
		var alpha = ( ( this.tickMax - this.tick ) / ( this.tickMax * 0.25 ) ) * this.baseAlpha;
	} else {
		var alpha = this.baseAlpha;
	}
	alpha = Math.min( 1, Math.max( 0, alpha ) );

	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, ' + alpha + ')';
	galaxy.ctxmg.fill();
}
