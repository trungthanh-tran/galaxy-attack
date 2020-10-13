/*==============================================================================
Init
==============================================================================*/
galaxy.Particle = function( opt ) {
	for( var k in opt ) {
		this[k] = opt[k];
	}
};


/*==============================================================================
Update
==============================================================================*/
galaxy.Particle.prototype.update = function( i ) {
	/*==============================================================================
	Apply Forces
	==============================================================================*/
	this.x += Math.cos( this.direction ) * ( this.speed * galaxy.dt );
	this.y += Math.sin( this.direction ) * ( this.speed * galaxy.dt );
	this.ex = this.x - Math.cos( this.direction ) * this.speed;
	this.ey = this.y - Math.sin( this.direction ) * this.speed;
	this.speed *= this.friction;

	/*==============================================================================
	Lock Bounds
	==============================================================================*/
	if( !galaxy.util.pointInRect( this.ex, this.ey, 0, 0, galaxy.ww, galaxy.wh ) || this.speed <= 0.05 ) {
		this.parent.splice( i, 1 );
	}

	/*==============================================================================
	Update View
	==============================================================================*/
	if( galaxy.util.pointInRect( this.ex, this.ey, -galaxy.screen.x, -galaxy.screen.y, galaxy.cw, galaxy.ch ) ) {
		this.inView = 1;
	} else {
		this.inView = 0;
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.Particle.prototype.render = function( i ) {
	if( this.inView ) {
		galaxy.ctxmg.beginPath();
		galaxy.ctxmg.moveTo( this.x, this.y );
		galaxy.ctxmg.lineTo( this.ex, this.ey );
		galaxy.ctxmg.lineWidth = this.lineWidth;
		galaxy.ctxmg.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + galaxy.util.rand( 50, 100 ) + '%, 1)';
		galaxy.ctxmg.stroke();
	}
}
