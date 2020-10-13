/*==============================================================================
Init
==============================================================================*/
galaxy.Bullet = function( opt ) {
	for( var k in opt ) {
		this[k] = opt[k];
	}
	this.enemiesHit = [];
	this.inView = 0;
	galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
		x: this.x,
		y: this.y,
		count: 2,
		spawnRange: 1,
		friction: 0.75,
		minSpeed: 2,
		maxSpeed: 10,
		minDirection: 0,
		maxDirection: galaxy.twopi,
		hue: 0,
		saturation: 0
	} ) );
};

/*==============================================================================
Update
==============================================================================*/
galaxy.Bullet.prototype.update = function( i ) {
	/*==============================================================================
	Apply Forces
	==============================================================================*/
	this.x += Math.cos( this.direction ) * ( this.speed * galaxy.dt );
	this.y += Math.sin( this.direction ) * ( this.speed * galaxy.dt );
	this.ex = this.x - Math.cos( this.direction ) * this.size;
	this.ey = this.y - Math.sin( this.direction ) * this.size;

	/*==============================================================================
	Check Collisions
	==============================================================================*/
	var ei = galaxy.enemies.length;
	while( ei-- ) {
		var enemy = galaxy.enemies[ ei ];
		if( galaxy.util.distance( this.x, this.y, enemy.x, enemy.y ) <= enemy.radius ) {
			if( this.enemiesHit.indexOf( enemy.index ) == -1 ){
				galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
					x: this.x,
					y: this.y,
					count: Math.floor( galaxy.util.rand( 1, 4 ) ),
					spawnRange: 0,
					friction: 0.85,
					minSpeed: 1,
					maxSpeed: 5,
					minDirection: ( this.direction - galaxy.pi ) - galaxy.pi / 5,
					maxDirection: ( this.direction - galaxy.pi ) + galaxy.pi / 5,
					hue: enemy.hue
				} ) );

				this.enemiesHit.push( enemy.index );
				enemy.receiveDamage( ei, this.damage );

				if( this.enemiesHit.length > 3 ) {
					galaxy.bullets.splice( i, 1 );
				}
			}
			if( !this.piercing ) {
				galaxy.bullets.splice( i, 1 );
			}
		}
	}

	/*==============================================================================
	Lock Bounds
	==============================================================================*/
	if( !galaxy.util.pointInRect( this.ex, this.ey, 0, 0, galaxy.ww, galaxy.wh ) ) {
		galaxy.bullets.splice( i, 1 );
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
galaxy.Bullet.prototype.render = function( i ) {
	if( this.inView ) {
		galaxy.ctxmg.beginPath();
		galaxy.ctxmg.moveTo( this.x, this.y );
		galaxy.ctxmg.lineTo( this.ex, this.ey );
		galaxy.ctxmg.lineWidth = this.lineWidth *2 ; //this.lineWidth
        bullet_style = new Image();
        bullet_style.src = "/images/bullet_" + "0" + ".png"
        pattern_style = galaxy.ctxmg.createPattern(bullet_style, "repeat");
		galaxy.ctxmg.strokeStyle = pattern_style; //this.strokeStyle
		galaxy.ctxmg.stroke();
	}
};
