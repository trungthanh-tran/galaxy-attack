/*==============================================================================
Init
==============================================================================*/
galaxy.Powerup = function( opt ) {
	for( var k in opt ) {
		this[k] = opt[k];
	}
	var text = galaxy.text( {
		ctx: galaxy.ctxmg,
		x: 0,
		y: 0,
		text: this.title,
		hspacing: 1,
		vspacing: 0,
		halign: 'top',
		valign: 'left',
		scale: 1,
		snap: 0,
		render: 0
	} );
	this.hpadding = 8;
	this.vpadding = 8;
	this.width = text.width + this.hpadding * 2;
	this.height = text.height + this.vpadding * 2;
	this.x = this.x - this.width / 2;
	this.y = this.y - this.height / 2;
	this.direction = galaxy.util.rand( 0, galaxy.twopi );
	this.speed = galaxy.util.rand( 0.5, 2 );
};

/*==============================================================================
Update
==============================================================================*/
galaxy.Powerup.prototype.update = function( i ) {
	/*==============================================================================
	Apply Forces
	==============================================================================*/
	this.x += Math.cos( this.direction ) * this.speed * galaxy.dt;
	this.y += Math.sin( this.direction ) * this.speed * galaxy.dt;

	/*==============================================================================
	Check Bounds
	==============================================================================*/
	if( !galaxy.util.rectInRect( this.x, this.y, this.width, this.height, 0, 0, galaxy.ww, galaxy.wh ) ){
		galaxy.powerups.splice( i, 1 );
	}

	/*==============================================================================
	Check Collection Collision
	==============================================================================*/
	if( galaxy.hero.life > 0 && galaxy.util.arcIntersectingRect( galaxy.hero.x, galaxy.hero.y, galaxy.hero.radius + 2, this.x, this.y, this.width, this.height ) ){
		galaxy.audio.play( 'powerup' );
		galaxy.powerupTimers[ this.type ] = 300;
		galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2,
			count: 15,
			spawnRange: 0,
			friction: 0.85,
			minSpeed: 2,
			maxSpeed: 15,
			minDirection: 0,
			maxDirection: galaxy.twopi,
			hue: 0,
			saturation: 0
		} ) );
		galaxy.powerups.splice( i, 1 );
		galaxy.powerupsCollected++;
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.Powerup.prototype.render = function( i ) {

	galaxy.ctxmg.fillStyle = '#000';
	galaxy.ctxmg.fillRect( this.x - 2, this.y - 2, this.width + 4, this.height + 4 );
	galaxy.ctxmg.fillStyle = '#555';
	galaxy.ctxmg.fillRect( this.x - 1, this.y - 1, this.width + 2, this.height + 2 );

	galaxy.ctxmg.fillStyle = '#111';
	galaxy.ctxmg.fillRect( this.x, this.y, this.width, this.height );

	galaxy.ctxmg.beginPath();
	galaxy.text( {
		ctx: galaxy.ctxmg,
		x: this.x + this.hpadding,
		y: this.y + this.vpadding + 1,
		text: this.title,
		hspacing: 1,
		vspacing: 0,
		halign: 'top',
		valign: 'left',
		scale: 1,
		snap: 0,
		render: true
	} );
	galaxy.ctxmg.fillStyle = '#000';
	galaxy.ctxmg.fill();

	galaxy.ctxmg.beginPath();
	galaxy.text( {
		ctx: galaxy.ctxmg,
		x: this.x + this.hpadding,
		y: this.y + this.vpadding,
		text: this.title,
		hspacing: 1,
		vspacing: 0,
		halign: 'top',
		valign: 'left',
		scale: 1,
		snap: 0,
		render: true
	} );
	galaxy.ctxmg.fillStyle = 'hsl(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%)';
	galaxy.ctxmg.fill();

	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.2)';
	galaxy.ctxmg.fillRect( this.x, this.y, this.width, this.height / 2 );

}
