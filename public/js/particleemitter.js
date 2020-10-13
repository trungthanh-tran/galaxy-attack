/*==============================================================================
Init
==============================================================================*/
galaxy.ParticleEmitter = function( opt ) {
	for( var k in opt ) {
		this[k] = opt[k];
	}
	this.particles = [];
	for( var i = 0; i < this.count; i++ ) {
		var radius = Math.sqrt( Math.random() ) * this.spawnRange,
            angle = Math.random() * galaxy.twopi,
            x = this.x + Math.cos( angle ) * radius,
            y = this.y + Math.sin( angle ) * radius;
		this.particles.push( new galaxy.Particle( {
			parent: this.particles,
			x: x,
			y: y,
			speed: galaxy.util.rand( this.minSpeed, this.maxSpeed ),
			friction: this.friction,
			direction: galaxy.util.rand( this.minDirection, this.maxDirection ),
			lineWidth: galaxy.util.rand( 0.5, 1.5 ),
			hue: this.hue,
			saturation: this.saturation
		} ) );
	}
};

/*==============================================================================
Update
==============================================================================*/
galaxy.ParticleEmitter.prototype.update = function( i ) {
	var i2 = this.particles.length; while( i2-- ){ this.particles[ i2 ].update( i2 ) }
	if( this.particles.length <= 0 ) {
		galaxy.particleEmitters.splice( i, 1 );
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.ParticleEmitter.prototype.render = function( i ) {
	var i2 = this.particles.length; while( i2-- ){ this.particles[ i2 ].render( i2 ) }
};
