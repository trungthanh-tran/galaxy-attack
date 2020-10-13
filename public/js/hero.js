/*==============================================================================
Init
==============================================================================*/
galaxy.Hero = function() {
	this.x = galaxy.ww / 2;
	this.y = galaxy.wh / 2;
	this.vx = 0;
	this.vy = 0;
	this.vmax = 4;
	this.vmax = 6;
	this.direction = 0;
	this.accel = 0.5;
	this.radius = 10;
	this.life = 1;
	this.takingDamage = 0;
	this.fillStyle = '#fef';
	this.weapon = {
		fireRate: 5,
		fireRateTick: 5,
		spread: 0.3,
		count: 1,
		bullet: {
			size: 15,
			lineWidth: 2,
			damage: 1,
			speed: 10,
			piercing: 0,
			strokeStyle: '#fff'
		},
		fireFlag: 0
	};
    this.selectedHero = 2;
	this.heroes = new Array();
    for (var i = 0; i < 5; i++) {
        this.heroes[i] = new Image();
        this.heroes[i].src = "/images/ship_" + i + ".png"
    }

};

/*==============================================================================
Update
==============================================================================*/
galaxy.Hero.prototype.update = function() {
	if( this.life > 0 ) {
		/*==============================================================================
		Apply Forces
		==============================================================================*/
		if( galaxy.keys.state.up ) {
			this.vy -= this.accel * galaxy.dt;
			if( this.vy < -this.vmax ) {
				this.vy = -this.vmax;
			}
		} else if( galaxy.keys.state.down ) {
			this.vy += this.accel * galaxy.dt;
			if( this.vy > this.vmax ) {
				this.vy = this.vmax;
			}
		}
		if( galaxy.keys.state.left ) {
			this.vx -= this.accel * galaxy.dt;
			if( this.vx < -this.vmax ) {
				this.vx = -this.vmax;
			}
		} else if( galaxy.keys.state.right ) {
			this.vx += this.accel * galaxy.dt;
			if( this.vx > this.vmax ) {
				this.vx = this.vmax;
			}
		}

		this.vy *= 0.9;
		this.vx *= 0.9;

		this.x += this.vx * galaxy.dt;
		this.y += this.vy * galaxy.dt;

		/*==============================================================================
		Lock Bounds
		==============================================================================*/
		if( this.x >= galaxy.ww - this.radius ) {
			this.x = galaxy.ww - this.radius;
		}
		if( this.x <= this.radius ) {
			this.x = this.radius;
		}
		if( this.y >= galaxy.wh - this.radius ) {
			this.y = galaxy.wh - this.radius;
		}
		if( this.y <= this.radius ) {
			this.y = this.radius;
		}

		/*==============================================================================
		Update Direction
		==============================================================================*/
		var dx = galaxy.mouse.x - this.x,
			dy = galaxy.mouse.y - this.y;
		this.direction = Math.atan2( dy, dx );

		/*==============================================================================
		Fire Weapon
		==============================================================================*/
		if( this.weapon.fireRateTick < this.weapon.fireRate ){
			this.weapon.fireRateTick += galaxy.dt;
		} else {
			if( galaxy.autofire || ( !galaxy.autofire && galaxy.mouse.down ) ){
				galaxy.audio.play( 'shoot' );
				if( galaxy.powerupTimers[ 2 ] > 0 || galaxy.powerupTimers[ 3 ] > 0 || galaxy.powerupTimers[ 4 ] > 0) {
					galaxy.audio.play( 'shootAlt' );
				}

				this.weapon.fireRateTick = this.weapon.fireRateTick - this.weapon.fireRate;
				this.weapon.fireFlag = 6;

				if( this.weapon.count > 1 ) {
					var spreadStart = -this.weapon.spread / 2;
					var spreadStep = this.weapon.spread / ( this.weapon.count - 1 );
				} else {
					var spreadStart = 0;
					var spreadStep = 0;
				}

				var gunX = this.x + Math.cos( this.direction ) * ( this.radius + this.weapon.bullet.size );
				var gunY = this.y + Math.sin( this.direction ) * ( this.radius + this.weapon.bullet.size );

				for( var i = 0; i < this.weapon.count; i++ ) {
					galaxy.bulletsFired++;
					var color = this.weapon.bullet.strokeStyle;
					if( galaxy.powerupTimers[ 2 ] > 0 || galaxy.powerupTimers[ 3 ] > 0 || galaxy.powerupTimers[ 4 ] > 0) {
						var colors = [];
						if( galaxy.powerupTimers[ 2 ] > 0 ) { colors.push( 'hsl(' + galaxy.definitions.powerups[ 2 ].hue + ', ' + galaxy.definitions.powerups[ 2 ].saturation + '%, ' + galaxy.definitions.powerups[ 2 ].lightness + '%)' ); }
						if( galaxy.powerupTimers[ 3 ] > 0 ) { colors.push( 'hsl(' + galaxy.definitions.powerups[ 3 ].hue + ', ' + galaxy.definitions.powerups[ 3 ].saturation + '%, ' + galaxy.definitions.powerups[ 3 ].lightness + '%)' ); }
						if( galaxy.powerupTimers[ 4 ] > 0 ) { colors.push( 'hsl(' + galaxy.definitions.powerups[ 4 ].hue + ', ' + galaxy.definitions.powerups[ 4 ].saturation + '%, ' + galaxy.definitions.powerups[ 4 ].lightness + '%)' ); }
						color = colors[ Math.floor( galaxy.util.rand( 0, colors.length ) ) ];
					}
					galaxy.bullets.push( new galaxy.Bullet( {
						x: gunX,
						y: gunY,
						speed: this.weapon.bullet.speed,
						direction: this.direction + spreadStart + i * spreadStep,
						damage: this.weapon.bullet.damage,
						size: this.weapon.bullet.size,
						lineWidth: this.weapon.bullet.lineWidth,
						strokeStyle: color,
						piercing: this.weapon.bullet.piercing
					} ) );
				}
			}
		}

		/*==============================================================================
		Check Collisions
		==============================================================================*/
		this.takingDamage = 0;
		var ei = galaxy.enemies.length;
		while( ei-- ) {
			var enemy = galaxy.enemies[ ei ];
			if( enemy.inView && galaxy.util.distance( this.x, this.y, enemy.x, enemy.y ) <= this.radius + enemy.radius ) {
				galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
					x: this.x,
					y: this.y,
					count: 2,
					spawnRange: 0,
					friction: 0.85,
					minSpeed: 2,
					maxSpeed: 15,
					minDirection: 0,
					maxDirection: galaxy.twopi,
					hue: 0,
					saturation: 0
				} ) );
				this.takingDamage = 1;
				this.life -= 0.0075;
				galaxy.rumble.level = 3;
				if( Math.floor( galaxy.tick ) % 5 == 0 ){
					galaxy.audio.play( 'takingDamage' );
				}
			}
		}
	}
};

/*==============================================================================
Render
==============================================================================*/
galaxy.Hero.prototype.render = function() {
	if( this.life > 0 ) {
        if (this.takingDamage) {
            var fillStyle = 'hsla(0, 0%, ' + galaxy.util.rand(0, 100) + '%, 1)';
            galaxy.ctxmg.fillStyle = 'hsla(0, 0%, ' + galaxy.util.rand(0, 100) + '%, ' + galaxy.util.rand(0.01, 0.15) + ')';
            galaxy.ctxmg.fillRect(-galaxy.screen.x, -galaxy.screen.y, galaxy.cw, galaxy.ch);
        } else if (this.weapon.fireFlag > 0) {
            this.weapon.fireFlag -= galaxy.dt;
            var fillStyle = 'hsla(' + galaxy.util.rand(0, 359) + ', 100%, ' + galaxy.util.rand(20, 80) + '%, 1)';
        } else {
            var fillStyle = this.fillStyle;
        }
        if (Number.isInteger(this.selectedHero) && this.selectedHero < 5) {
            galaxy.ctxmg.save();
            galaxy.ctxmg.translate(this.x, this.y);
            galaxy.ctxmg.rotate(this.direction + galaxy.pi / 2);
            galaxy.ctxmg.drawImage(this.heroes[this.selectedHero], -1 * this.radius * 3 / 2 - 5, -1 * this.radius * 2, this.radius * 4, this.radius * 4);
            galaxy.ctxmg.restore();
            return;
        } else {
            galaxy.ctxmg.save();
            galaxy.ctxmg.translate(this.x, this.y);
            galaxy.ctxmg.rotate(this.direction - galaxy.pi / 4);
            galaxy.ctxmg.fillStyle = fillStyle;
            galaxy.ctxmg.fillRect(0, 0, this.radius, this.radius);
            galaxy.ctxmg.restore();

            galaxy.ctxmg.save();
            galaxy.ctxmg.translate(this.x, this.y);
            galaxy.ctxmg.rotate(this.direction - galaxy.pi / 4 + galaxy.twopi / 3);
            galaxy.ctxmg.fillStyle = fillStyle;
            galaxy.ctxmg.fillRect(0, 0, this.radius, this.radius);
            galaxy.ctxmg.restore();

            galaxy.ctxmg.save();
            galaxy.ctxmg.translate(this.x, this.y);
            galaxy.ctxmg.rotate(this.direction - galaxy.pi / 4 - galaxy.twopi / 3);
            galaxy.ctxmg.fillStyle = fillStyle;
            galaxy.ctxmg.fillRect(0, 0, this.radius, this.radius);
            galaxy.ctxmg.restore();
            galaxy.util.fillCircle(galaxy.ctxmg, this.x, this.y, this.radius - 3, fillStyle);
        }
    }
};

galaxy.Hero.prototype.selectHero = function (selectedHeroIndex) {
    this.selectedHero = selectedHeroIndex;
};
