/*==============================================================================
Init
==============================================================================*/
galaxy.Enemy = function( opt ) {
	// set always and optional
	for( var k in opt ) {
		this[k] = opt[k];
	}

	// set optional and defaults
	this.lightness = galaxy.util.isset( this.lightness ) ? this.lightness : 50;
	this.saturation = galaxy.util.isset( this.saturation ) ? this.saturation : 100;
	this.setup = this.setup || function(){};
	this.death = this.death || function(){};

	// set same for all objects
	this.index = galaxy.indexGlobal++;
	this.inView = this.hitFlag = this.vx = this.vy = 0;
	this.lifeMax = opt.life;
	this.fillStyle ='hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, 0.1)';
	this.strokeStyle = 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + this.lightness + '%, 1)';
	/*==============================================================================
	Run Setup
	==============================================================================*/
	this.setup();

	/*==============================================================================
	Adjust Level Offset Difficulties
	==============================================================================*/
	if( galaxy.levelDiffOffset > 0 ){
		this.life += galaxy.levelDiffOffset * 0.25;
		this.lifeMax = this.life;
		this.speed += Math.min( galaxy.hero.vmax, galaxy.levelDiffOffset * 0.25 );
		this.value += galaxy.levelDiffOffset * 5;
	}
};

/*==============================================================================
Update
==============================================================================*/
galaxy.Enemy.prototype.update = function( i ) {
	/*==============================================================================
	Apply Behavior
	==============================================================================*/
	this.behavior();

	/*==============================================================================
	Apply Forces
	==============================================================================*/
	this.x += this.vx * galaxy.dt;
	this.y += this.vy * galaxy.dt;

	/*==============================================================================
	Lock Bounds
	==============================================================================*/
	if( this.lockBounds && !galaxy.util.arcInRect( this.x, this.y, this.radius + 10, 0, 0, galaxy.ww, galaxy.wh ) ) {
		galaxy.enemies.splice( i, 1 );
	}

	/*==============================================================================
	Update View
	==============================================================================*/
	if( galaxy.util.arcInRect( this.x, this.y, this.radius, -galaxy.screen.x, -galaxy.screen.y, galaxy.cw, galaxy.ch ) ) {
		this.inView = 1;
	} else {
		this.inView = 0;
	}
};

/*==============================================================================
Receive Damage
==============================================================================*/
galaxy.Enemy.prototype.receiveDamage = function( i, val ) {
	if( this.inView ) {
		galaxy.audio.play( 'hit' );
	}
	this.life -= val;
	this.hitFlag = 10;
	if( this.life <= 0 ) {
		if( this.inView ) {
			galaxy.explosions.push( new galaxy.Explosion( {
				x: this.x,
				y: this.y,
				radius: this.radius,
				hue: this.hue,
				saturation: this.saturation
			} ) );
			galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
				x: this.x,
				y: this.y,
				count: 10,
				spawnRange: this.radius,
				friction: 0.85,
				minSpeed: 5,
				maxSpeed: 20,
				minDirection: 0,
				maxDirection: galaxy.twopi,
				hue: this.hue,
				saturation: this.saturation
			} ) );
			galaxy.textPops.push( new galaxy.TextPop( {
				x: this.x,
				y: this.y,
				value: this.value,
				hue: this.hue,
				saturation: this.saturation,
				lightness: 60
			} ) );
			galaxy.rumble.level = 6;
		}
		this.death();
		galaxy.spawnPowerup( this.x, this.y );
		galaxy.score += this.value;
		galaxy.level.kills++;
		galaxy.kills++;
		galaxy.enemies.splice( i, 1 );
	}
};

/*==============================================================================
Render Health
==============================================================================*/
galaxy.Enemy.prototype.renderHealth = function( i ) {
	if( this.inView && this.life > 0 && this.life < this.lifeMax ) {
		galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 0%, 0.75)';
		galaxy.ctxmg.fillRect( this.x - this.radius, this.y - this.radius - 6, this.radius * 2, 3 );
		galaxy.ctxmg.fillStyle = 'hsla(' + ( this.life / this.lifeMax ) * 120 + ', 100%, 50%, 0.75)';
		galaxy.ctxmg.fillRect( this.x - this.radius, this.y - this.radius - 6, ( this.radius * 2 ) * ( this.life / this.lifeMax ), 3 );
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.Enemy.prototype.render = function( i ) {
	if( this.inView ) {
		var mod = galaxy.enemyOffsetMod / 6;
		galaxy.util.fillCircle( galaxy.ctxmg, this.x, this.y, this.radius, this.fillStyle );
		galaxy.util.strokeCircle( galaxy.ctxmg, this.x, this.y, this.radius / 4 + Math.cos( mod ) * this.radius / 4, this.strokeStyle, 1.5 );
		galaxy.util.strokeCircle( galaxy.ctxmg, this.x, this.y, this.radius - 0.5, this.strokeStyle, 1 );

		galaxy.ctxmg.strokeStyle = this.strokeStyle;
		galaxy.ctxmg.lineWidth = 4;
		galaxy.ctxmg.beginPath();
		galaxy.ctxmg.arc( this.x, this.y, this.radius - 0.5, mod + galaxy.pi, mod + galaxy.pi + galaxy.pi / 2 );
		galaxy.ctxmg.stroke();
		galaxy.ctxmg.beginPath();
		galaxy.ctxmg.arc( this.x, this.y, this.radius - 0.5, mod, mod + galaxy.pi / 2 );
		galaxy.ctxmg.stroke();

		if( galaxy.slow) {
			galaxy.util.fillCircle( galaxy.ctxmg, this.x, this.y, this.radius, 'hsla(' + galaxy.util.rand( 160, 220 ) + ', 100%, 50%, 0.25)' );
		}
		if( this.hitFlag > 0 ) {
			this.hitFlag -= galaxy.dt;
			galaxy.util.fillCircle( galaxy.ctxmg, this.x, this.y, this.radius, 'hsla(' + this.hue + ', ' + this.saturation + '%, 75%, ' + this.hitFlag / 10 + ')' );
			galaxy.util.strokeCircle( galaxy.ctxmg, this.x, this.y, this.radius, 'hsla(' + this.hue + ', ' + this.saturation + '%, ' + galaxy.util.rand( 60, 90) + '%, ' + this.hitFlag / 10 + ')', galaxy.util.rand( 1, 10) );
		}
		this.renderHealth();
	}
};
