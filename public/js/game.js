
/*==============================================================================
Init
==============================================================================*/
galaxy.init = function() {
	galaxy.setupStorage();
    galaxy.wrap = document.getElementById( 'wrap' );
	galaxy.wrapInner = document.getElementById( 'wrap-inner' );
	galaxy.cbg1 = document.getElementById( 'cbg1' );
	galaxy.cbg2 = document.getElementById( 'cbg2' );
	galaxy.cbg3 = document.getElementById( 'cbg3' );
	galaxy.cbg4 = document.getElementById( 'cbg4' );
	galaxy.cmg = document.getElementById( 'cmg' );
	galaxy.cfg = document.getElementById( 'cfg' );
	galaxy.ctxbg1 = galaxy.cbg1.getContext( '2d' );
	galaxy.ctxbg2 = galaxy.cbg2.getContext( '2d' );
	galaxy.ctxbg3 = galaxy.cbg3.getContext( '2d' );
	galaxy.ctxbg4 = galaxy.cbg4.getContext( '2d' );
	galaxy.ctxmg = galaxy.cmg.getContext( '2d' );
	galaxy.ctxfg = galaxy.cfg.getContext( '2d' );
	//galaxy.cw = galaxy.cmg.width = galaxy.cfg.width = 800;
    galaxy.top = galaxy.wrap.offsetTop;
    screen_width = screen.width;
    galaxy.cw = galaxy.cmg.width = galaxy.cfg.width = screen_width * 2/3;
    galaxy.ch = galaxy.cmg.height = galaxy.cfg.height = screen_width * 4/9;
    //galaxy.ch = galaxy.cmg.height = galaxy.cfg.height = 600;
	galaxy.wrap.style.width = galaxy.wrapInner.style.width = galaxy.cw + 'px';
	galaxy.wrap.style.height = galaxy.wrapInner.style.height = galaxy.ch + 'px';
	galaxy.wrap.style.marginLeft = ( -galaxy.cw / 2 ) - 10 + 'px';
	//galaxy.wrap.style.marginTop = ( -galaxy.ch / 2 ) - 10 + 'px';
	galaxy.ww = Math.floor( galaxy.cw * 2 );
	galaxy.wh = Math.floor( galaxy.ch * 2 );
	galaxy.cbg1.width = Math.floor( galaxy.cw * 1.1 );
	galaxy.cbg1.height = Math.floor( galaxy.ch * 1.1 );
	galaxy.cbg2.width = Math.floor( galaxy.cw * 1.15 );
	galaxy.cbg2.height = Math.floor( galaxy.ch * 1.15 );
	galaxy.cbg3.width = Math.floor( galaxy.cw * 1.2 );
	galaxy.cbg3.height = Math.floor( galaxy.ch * 1.2 );
	galaxy.cbg4.width = Math.floor( galaxy.cw * 1.25 );
	galaxy.cbg4.height = Math.floor( galaxy.ch * 1.25 );

	galaxy.screen = {
		x: ( galaxy.ww - galaxy.cw ) / -2,
		y: ( galaxy.wh - galaxy.ch ) / -2
	};

	galaxy.mute = galaxy.storage['mute'];
	galaxy.autofire = galaxy.storage['autofire'];
	galaxy.slowEnemyDivider = 3;

	galaxy.keys = {
		state: {
			up: 0,
			down: 0,
			left: 0,
			right: 0,
			f: 0,
			m: 0,
			p: 0
		},
		pressed: {
			up: 0,
			down: 0,
			left: 0,
			right: 0,
			f: 0,
			m: 0,
			p: 0
		}
	};
	galaxy.okeys = {};
	galaxy.mouse = {
		x: galaxy.ww / 2  ,
		y: galaxy.wh / 2,
		sx: 0,
		sy: 0,
		ax: window.innerWidth / 2,
		ay: 0,
		down: 0
	};
	galaxy.buttons = [];

	galaxy.minimap = {
		x: 20,
		y: galaxy.ch - Math.floor( galaxy.ch * 0.1 ) - 20,
		width: Math.floor( galaxy.cw * 0.1 ),
		height: Math.floor( galaxy.ch * 0.1 ),
		scale: Math.floor( galaxy.cw * 0.1 ) / galaxy.ww,
		color: 'hsla(0, 0%, 0%, 0.85)',
		strokeColor: '#3a3a3a'
	},
	galaxy.cOffset = {
		left: 0,
		top: 0
	};

	galaxy.levelCount = galaxy.definitions.levels.length;
	galaxy.states = {};
	galaxy.state = '';
	galaxy.enemies = [];
	galaxy.bullets = [];
	galaxy.explosions = [];
	galaxy.powerups = [];
	galaxy.particleEmitters = [];
	galaxy.textPops = [];
	galaxy.levelPops = [];
	galaxy.powerupTimers = [];

	galaxy.resizecb();
	galaxy.bindEvents();
	galaxy.setupStates();
	galaxy.renderBackground1();
	galaxy.renderBackground2();
	galaxy.renderBackground3();
	galaxy.renderBackground4();
	galaxy.renderForeground();
	galaxy.setState( 'menu' );
	galaxy.loop();
};

/*==============================================================================
Reset
==============================================================================*/
galaxy.reset = function() {
	galaxy.indexGlobal = 0;
	galaxy.dt = 1;
	galaxy.lt = 0;
	galaxy.elapsed = 0;
	galaxy.tick = 0;

	galaxy.gameoverTick = 0;
	galaxy.gameoverTickMax = 200;
	galaxy.gameoverExplosion = 0;

	galaxy.instructionTick = 0;
	galaxy.instructionTickMax = 400;

	galaxy.levelDiffOffset = 0;
	galaxy.enemyOffsetMod = 0;
	galaxy.slow = 0;

	galaxy.screen = {
		x: ( galaxy.ww - galaxy.cw ) / -2,
		y: ( galaxy.wh - galaxy.ch ) / -2
	};
	galaxy.rumble = {
		x: 0,
		y: 0,
		level: 0,
		decay: 0.4
	};

	galaxy.mouse.down = 0;

	galaxy.level = {
		current: 0,
		kills: 0,
		killsToLevel: galaxy.definitions.levels[ 0 ].killsToLevel,
		distribution: galaxy.definitions.levels[ 0 ].distribution,
		distributionCount: galaxy.definitions.levels[ 0 ].distribution.length
	};

	galaxy.enemies.length = 0;
	galaxy.bullets.length = 0;
	galaxy.explosions.length = 0;
	galaxy.powerups.length = 0;
	galaxy.particleEmitters.length = 0;
	galaxy.textPops.length = 0;
	galaxy.levelPops.length = 0;
	galaxy.powerupTimers.length = 0;

	for( var i = 0; i < galaxy.definitions.powerups.length; i++ ) {
		galaxy.powerupTimers.push( 0 );
	}

	galaxy.kills = 0;
	galaxy.bulletsFired = 0;
	galaxy.powerupsCollected = 0;
	galaxy.score = 0;

	galaxy.hero = new galaxy.Hero();
    galaxy.hero.selectHero(galaxy.storage['ship']);

	galaxy.levelPops.push( new galaxy.LevelPop( {
		level: 1
	} ) );
};


/*==============================================================================
Render Backgrounds
==============================================================================*/
galaxy.renderBackground1 = function() {
	var gradient = galaxy.ctxbg1.createRadialGradient( galaxy.cbg1.width / 2, galaxy.cbg1.height / 2, 0, galaxy.cbg1.width / 2, galaxy.cbg1.height / 2, galaxy.cbg1.height );
	gradient.addColorStop( 0, 'hsla(0, 0%, 100%, 0.1)' );
	gradient.addColorStop( 0.65, 'hsla(0, 0%, 100%, 0)' );
	galaxy.ctxbg1.fillStyle = gradient;
	galaxy.ctxbg1.fillRect( 0, 0, galaxy.cbg1.width, galaxy.cbg1.height );

	var i = 2000;
	while( i-- ) {
		galaxy.util.fillCircle( galaxy.ctxbg1, galaxy.util.rand( 0, galaxy.cbg1.width ), galaxy.util.rand( 0, galaxy.cbg1.height ), galaxy.util.rand( 0.2, 0.5 ), 'hsla(0, 0%, 100%, ' + galaxy.util.rand( 0.05, 0.2 ) + ')' );
	}

	var i = 800;
	while( i-- ) {
		galaxy.util.fillCircle( galaxy.ctxbg1, galaxy.util.rand( 0, galaxy.cbg1.width ), galaxy.util.rand( 0, galaxy.cbg1.height ), galaxy.util.rand( 0.1, 0.8 ), 'hsla(0, 0%, 100%, ' + galaxy.util.rand( 0.05, 0.5 ) + ')' );
	}
}

galaxy.renderBackground2 = function() {
	var i = 80;
	while( i-- ) {
		galaxy.util.fillCircle( galaxy.ctxbg2, galaxy.util.rand( 0, galaxy.cbg2.width ), galaxy.util.rand( 0, galaxy.cbg2.height ), galaxy.util.rand( 1, 2 ), 'hsla(0, 0%, 100%, ' + galaxy.util.rand( 0.05, 0.15 ) + ')' );
	}
}

galaxy.renderBackground3 = function() {
	var i = 40;
	while( i-- ) {
		galaxy.util.fillCircle( galaxy.ctxbg3, galaxy.util.rand( 0, galaxy.cbg3.width ), galaxy.util.rand( 0, galaxy.cbg3.height ), galaxy.util.rand( 1, 2.5 ), 'hsla(0, 0%, 100%, ' + galaxy.util.rand( 0.05, 0.1 ) + ')' );
	}
}

galaxy.renderBackground4 = function() {
	var size = 50;
	galaxy.ctxbg4.fillStyle = 'hsla(0, 0%, 50%, 0.05)';
	var i = Math.round( galaxy.cbg4.height / size );
	while( i-- ) {
		galaxy.ctxbg4.fillRect( 0, i * size + 25, galaxy.cbg4.width, 1 );
	}
	i = Math.round( galaxy.cbg4.width / size );
	while( i-- ) {
		galaxy.ctxbg4.fillRect( i * size, 0, 1, galaxy.cbg4.height );
	}
}

/*==============================================================================
Render Foreground
==============================================================================*/
galaxy.renderForeground = function() {
	var gradient = galaxy.ctxfg.createRadialGradient( galaxy.cw / 2, galaxy.ch / 2, galaxy.ch / 3, galaxy.cw / 2, galaxy.ch / 2, galaxy.ch );
	gradient.addColorStop( 0, 'hsla(0, 0%, 0%, 0)' );
	gradient.addColorStop( 1, 'hsla(0, 0%, 0%, 0.5)' );
	galaxy.ctxfg.fillStyle = gradient;
	galaxy.ctxfg.fillRect( 0, 0, galaxy.cw, galaxy.ch );

	galaxy.ctxfg.fillStyle = 'hsla(0, 0%, 50%, 0.1)';
	var i = Math.round( galaxy.ch / 2 );
	while( i-- ) {
		galaxy.ctxfg.fillRect( 0, i * 2, galaxy.cw, 1 );
	}

	var gradient2 = galaxy.ctxfg.createLinearGradient( galaxy.cw, 0, 0, galaxy.ch );
	gradient2.addColorStop( 0, 'hsla(0, 0%, 100%, 0.04)' );
	gradient2.addColorStop( 0.75, 'hsla(0, 0%, 100%, 0)' );
	galaxy.ctxfg.beginPath();
	galaxy.ctxfg.moveTo( 0, 0 );
	galaxy.ctxfg.lineTo( galaxy.cw, 0 );
	galaxy.ctxfg.lineTo( 0, galaxy.ch );
	galaxy.ctxfg.closePath();
	galaxy.ctxfg.fillStyle = gradient2;
	galaxy.ctxfg.fill();
}

/*==============================================================================
User Interface / UI / GUI / Minimap
==============================================================================*/

galaxy.renderInterface = function() {
	/*==============================================================================
	Powerup Timers
	==============================================================================*/
		for( var i = 0; i < galaxy.definitions.powerups.length; i++ ) {
			var powerup = galaxy.definitions.powerups[ i ],
				powerupOn = ( galaxy.powerupTimers[ i ] > 0 );
			galaxy.ctxmg.beginPath();
			var powerupText = galaxy.text( {
				ctx: galaxy.ctxmg,
				x: galaxy.minimap.x + galaxy.minimap.width + 90,
				y: galaxy.minimap.y + 4 + ( i * 12 ),
				text: powerup.title,
				hspacing: 1,
				vspacing: 1,
				halign: 'right',
				valign: 'top',
				scale: 1,
				snap: 1,
				render: 1
			} );
			if( powerupOn ) {
				galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, ' + ( 0.25 + ( ( galaxy.powerupTimers[ i ] / 300 ) * 0.75 ) ) + ')';
			} else {
				galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.25)';
			}
			galaxy.ctxmg.fill();
			if( powerupOn ) {
				var powerupBar = {
					x: powerupText.ex + 5,
					y: powerupText.sy,
					width: 110,
					height: 5
				};
				galaxy.ctxmg.fillStyle = 'hsl(' + powerup.hue + ', ' + powerup.saturation + '%, ' + powerup.lightness + '%)';
				galaxy.ctxmg.fillRect( powerupBar.x, powerupBar.y, ( galaxy.powerupTimers[ i ] / 300 ) * powerupBar.width, powerupBar.height );
			}
		}

		/*==============================================================================
		Instructions
		==============================================================================*/
		if( galaxy.instructionTick < galaxy.instructionTickMax ){
			galaxy.instructionTick += galaxy.dt;
			galaxy.ctxmg.beginPath();
			galaxy.text( {
				ctx: galaxy.ctxmg,
				x: galaxy.cw / 2 - 10,
				y: galaxy.ch - 20,
				text: 'MOVE\nAIM/FIRE\nAUTOFIRE\nPAUSE\nMUTE',
				hspacing: 1,
				vspacing: 17,
				halign: 'right',
				valign: 'bottom',
				scale: 2,
				snap: 1,
				render: 1
			} );
			if( galaxy.instructionTick < galaxy.instructionTickMax * 0.25 ) {
				var alpha = ( galaxy.instructionTick / ( galaxy.instructionTickMax * 0.25 ) ) * 0.5;
			} else if( galaxy.instructionTick > galaxy.instructionTickMax - galaxy.instructionTickMax * 0.25 ) {
				var alpha = ( ( galaxy.instructionTickMax - galaxy.instructionTick ) / ( galaxy.instructionTickMax * 0.25 ) ) * 0.5;
			} else {
				var alpha = 0.5;
			}
			alpha = Math.min( 1, Math.max( 0, alpha ) );

			galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, ' + alpha + ')';
			galaxy.ctxmg.fill();

			galaxy.ctxmg.beginPath();
			galaxy.text( {
				ctx: galaxy.ctxmg,
				x: galaxy.cw / 2 + 10,
				y: galaxy.ch - 20,
				text: 'WASD/ARROWS\nMOUSE\nF\nP\nM',
				hspacing: 1,
				vspacing: 17,
				halign: 'left',
				valign: 'bottom',
				scale: 2,
				snap: 1,
				render: 1
			} );
			if( galaxy.instructionTick < galaxy.instructionTickMax * 0.25 ) {
				var alpha = ( galaxy.instructionTick / ( galaxy.instructionTickMax * 0.25 ) ) * 1;
			} else if( galaxy.instructionTick > galaxy.instructionTickMax - galaxy.instructionTickMax * 0.25 ) {
				var alpha = ( ( galaxy.instructionTickMax - galaxy.instructionTick ) / ( galaxy.instructionTickMax * 0.25 ) ) * 1;
			} else {
				var alpha = 1;
			}
			alpha = Math.min( 1, Math.max( 0, alpha ) );

			galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, ' + alpha + ')';
			galaxy.ctxmg.fill();
		}

		/*==============================================================================
		Slow Enemies Screen Cover
		==============================================================================*/
		if( galaxy.powerupTimers[ 1 ] > 0 ) {
			galaxy.ctxmg.fillStyle = 'hsla(200, 100%, 20%, 0.05)';
			galaxy.ctxmg.fillRect( 0, 0, galaxy.cw, galaxy.ch );
		}

	/*==============================================================================
	Health
	==============================================================================*/
	galaxy.ctxmg.beginPath();
	var healthText = galaxy.text( {
		ctx: galaxy.ctxmg,
		x: 20,
		y: 20,
		text: 'HEALTH',
		hspacing: 1,
		vspacing: 1,
		halign: 'top',
		valign: 'left',
		scale: 2,
		snap: 1,
		render: 1
	} );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
	galaxy.ctxmg.fill();
	var healthBar = {
		x: healthText.ex + 10,
		y: healthText.sy,
		width: 110,
		height: 10
	};
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 20%, 1)';
	galaxy.ctxmg.fillRect( healthBar.x, healthBar.y, healthBar.width, healthBar.height );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.25)';
	galaxy.ctxmg.fillRect( healthBar.x, healthBar.y, healthBar.width, healthBar.height / 2 );
	galaxy.ctxmg.fillStyle = 'hsla(' + galaxy.hero.life * 120 + ', 100%, 40%, 1)';
	galaxy.ctxmg.fillRect( healthBar.x, healthBar.y, galaxy.hero.life * healthBar.width, healthBar.height );
	galaxy.ctxmg.fillStyle = 'hsla(' + galaxy.hero.life * 120 + ', 100%, 75%, 1)';
	galaxy.ctxmg.fillRect( healthBar.x, healthBar.y, galaxy.hero.life * healthBar.width, healthBar.height / 2 );

	if( galaxy.hero.takingDamage && galaxy.hero.life > 0.01 ) {
		galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
			x: -galaxy.screen.x + healthBar.x + galaxy.hero.life * healthBar.width,
			y: -galaxy.screen.y + healthBar.y + healthBar.height / 2,
			count: 1,
			spawnRange: 2,
			friction: 0.85,
			minSpeed: 2,
			maxSpeed: 20,
			minDirection: galaxy.pi / 2 - 0.2,
			maxDirection: galaxy.pi / 2 + 0.2,
			hue: galaxy.hero.life * 120,
			saturation: 100
		} ) );
	}

	/*==============================================================================
	Progress
	==============================================================================*/
	galaxy.ctxmg.beginPath();
	var progressText = galaxy.text( {
		ctx: galaxy.ctxmg,
		x: healthBar.x + healthBar.width + 40,
		y: 20,
		text: 'PROGRESS',
		hspacing: 1,
		vspacing: 1,
		halign: 'top',
		valign: 'left',
		scale: 2,
		snap: 1,
		render: 1
	} );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
	galaxy.ctxmg.fill();
	var progressBar = {
		x: progressText.ex + 10,
		y: progressText.sy,
		width: healthBar.width,
		height: healthBar.height
	};
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 20%, 1)';
	galaxy.ctxmg.fillRect( progressBar.x, progressBar.y, progressBar.width, progressBar.height );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.25)';
	galaxy.ctxmg.fillRect( progressBar.x, progressBar.y, progressBar.width, progressBar.height / 2 );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 50%, 1)';
	galaxy.ctxmg.fillRect( progressBar.x, progressBar.y, ( galaxy.level.kills / galaxy.level.killsToLevel ) * progressBar.width, progressBar.height );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 1)';
	galaxy.ctxmg.fillRect( progressBar.x, progressBar.y, ( galaxy.level.kills / galaxy.level.killsToLevel ) * progressBar.width, progressBar.height / 2 );

	if( galaxy.level.kills == galaxy.level.killsToLevel ) {
		galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
			x: -galaxy.screen.x + progressBar.x + progressBar.width,
			y: -galaxy.screen.y + progressBar.y + progressBar.height / 2,
			count: 30,
			spawnRange: 5,
			friction: 0.95,
			minSpeed: 2,
			maxSpeed: 25,
			minDirection: 0,
			minDirection: galaxy.pi / 2 - galaxy.pi / 4,
			maxDirection: galaxy.pi / 2 + galaxy.pi / 4,
			hue: 0,
			saturation: 0
		} ) );
	}

	/*==============================================================================
	Score
	==============================================================================*/
	galaxy.ctxmg.beginPath();
	var scoreLabel = galaxy.text( {
		ctx: galaxy.ctxmg,
		x: progressBar.x + progressBar.width + 40,
		y: 20,
		text: 'SCORE',
		hspacing: 1,
		vspacing: 1,
		halign: 'top',
		valign: 'left',
		scale: 2,
		snap: 1,
		render: 1
	} );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
	galaxy.ctxmg.fill();

	galaxy.ctxmg.beginPath();
	var scoreText = galaxy.text( {
		ctx: galaxy.ctxmg,
		x: scoreLabel.ex + 10,
		y: 20,
		text: galaxy.util.pad( galaxy.score, 6 ),
		hspacing: 1,
		vspacing: 1,
		halign: 'top',
		valign: 'left',
		scale: 2,
		snap: 1,
		render: 1
	} );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 1)';
	galaxy.ctxmg.fill();

	galaxy.ctxmg.beginPath();
	var bestLabel = galaxy.text( {
		ctx: galaxy.ctxmg,
		x: scoreText.ex + 40,
		y: 20,
		text: 'BEST',
		hspacing: 1,
		vspacing: 1,
		halign: 'top',
		valign: 'left',
		scale: 2,
		snap: 1,
		render: 1
	} );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
	galaxy.ctxmg.fill();

	galaxy.ctxmg.beginPath();
	var bestText = galaxy.text( {
		ctx: galaxy.ctxmg,
		x: bestLabel.ex + 10,
		y: 20,
		text: galaxy.util.pad( Math.max( galaxy.storage['score'], galaxy.score ), 6 ),
		hspacing: 1,
		vspacing: 1,
		halign: 'top',
		valign: 'left',
		scale: 2,
		snap: 1,
		render: 1
	} );
	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 1)';
	galaxy.ctxmg.fill();
};

galaxy.renderMinimap = function() {
	galaxy.ctxmg.fillStyle = galaxy.minimap.color;
	galaxy.ctxmg.fillRect( galaxy.minimap.x, galaxy.minimap.y, galaxy.minimap.width, galaxy.minimap.height );

	galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.1)';
	galaxy.ctxmg.fillRect(
		Math.floor( galaxy.minimap.x + -galaxy.screen.x * galaxy.minimap.scale ),
		Math.floor( galaxy.minimap.y + -galaxy.screen.y * galaxy.minimap.scale ),
		Math.floor( galaxy.cw * galaxy.minimap.scale ),
		Math.floor( galaxy.ch * galaxy.minimap.scale )
	);

	//galaxy.ctxmg.beginPath();
	for( var i = 0; i < galaxy.enemies.length; i++ ){
		var enemy = galaxy.enemies[ i ],
			x = galaxy.minimap.x + Math.floor( enemy.x * galaxy.minimap.scale ),
			y = galaxy.minimap.y + Math.floor( enemy.y * galaxy.minimap.scale );
		if( galaxy.util.pointInRect( x + 1, y + 1, galaxy.minimap.x, galaxy.minimap.y, galaxy.minimap.width, galaxy.minimap.height ) ) {
			//galaxy.ctxmg.rect( x, y, 2, 2 );
			galaxy.ctxmg.fillStyle = 'hsl(' + enemy.hue + ', ' + enemy.saturation + '%, 50%)';
			galaxy.ctxmg.fillRect( x, y, 2, 2 );
		}
	}
	//galaxy.ctxmg.fillStyle = '#f00';
	//galaxy.ctxmg.fill();

	galaxy.ctxmg.beginPath();
	for( var i = 0; i < galaxy.bullets.length; i++ ){
		var bullet = galaxy.bullets[ i ],
			x = galaxy.minimap.x + Math.floor( bullet.x * galaxy.minimap.scale ),
			y = galaxy.minimap.y + Math.floor( bullet.y * galaxy.minimap.scale );
		if( galaxy.util.pointInRect( x, y, galaxy.minimap.x, galaxy.minimap.y, galaxy.minimap.width, galaxy.minimap.height ) ) {
			galaxy.ctxmg.rect( x, y, 1, 1 );
		}
	}
	galaxy.ctxmg.fillStyle = '#fff';
	galaxy.ctxmg.fill();

	galaxy.ctxmg.fillStyle = galaxy.hero.fillStyle;
	galaxy.ctxmg.fillRect( galaxy.minimap.x + Math.floor( galaxy.hero.x * galaxy.minimap.scale ), galaxy.minimap.y + Math.floor( galaxy.hero.y * galaxy.minimap.scale ), 2, 2 );

	galaxy.ctxmg.strokeStyle = galaxy.minimap.strokeColor;
	galaxy.ctxmg.strokeRect( galaxy.minimap.x - 0.5, galaxy.minimap.y - 0.5, galaxy.minimap.width + 1, galaxy.minimap.height + 1 );
};

/*==============================================================================
Enemy Spawning
==============================================================================*/
galaxy.getSpawnCoordinates = function( radius ) {
	var quadrant = Math.floor( galaxy.util.rand( 0, 4 ) ),
		x,
		y,
		start;

	if( quadrant === 0){
		x = galaxy.util.rand( 0, galaxy.ww );
		y = -radius;
		start = 'top';
	} else if( quadrant === 1 ){
		x = galaxy.ww + radius;
		y = galaxy.util.rand( 0, galaxy.wh );
		start = 'right';
	} else if( quadrant === 2 ) {
		x = galaxy.util.rand( 0, galaxy.ww );
		y = galaxy.wh + radius;
		start = 'bottom';
	} else {
		x = -radius;
		y = galaxy.util.rand( 0, galaxy.wh );
		start = 'left';
	}

	return { x: x, y: y, start: start };
};

galaxy.spawnEnemy = function( type ) {
	var params = galaxy.definitions.enemies[ type ],
		coordinates = galaxy.getSpawnCoordinates( params.radius );
	params.x = coordinates.x;
	params.y = coordinates.y;
	params.start = coordinates.start;
	params.type = type;
	return new galaxy.Enemy( params );
};

galaxy.spawnEnemies = function() {
	var floorTick = Math.floor( galaxy.tick );
	for( var i = 0; i < galaxy.level.distributionCount; i++ ) {
		var timeCheck = galaxy.level.distribution[ i ];
		if( galaxy.levelDiffOffset > 0 ){
			timeCheck = Math.max( 1, timeCheck - ( galaxy.levelDiffOffset * 2) );
		}
		if( floorTick % timeCheck === 0 ) {
			galaxy.enemies.push( galaxy.spawnEnemy( i ) );
		}
	}
};

/*==============================================================================
Events
==============================================================================*/
galaxy.mousemovecb = function( e ) {
	e.preventDefault();
	galaxy.mouse.ax = e.pageX;
	galaxy.mouse.ay = e.pageY;
	galaxy.mousescreen();
};

galaxy.mousescreen = function() {
	galaxy.mouse.sx = galaxy.mouse.ax - galaxy.cOffset.left;
	galaxy.mouse.sy = galaxy.mouse.ay - galaxy.cOffset.top;
	galaxy.mouse.x = galaxy.mouse.sx - galaxy.screen.x;
	galaxy.mouse.y = galaxy.mouse.sy - galaxy.screen.y;
};

galaxy.mousedowncb = function( e ) {
	e.preventDefault();
	galaxy.mouse.down = 1;
};

galaxy.mouseupcb = function( e ) {
	e.preventDefault();
	galaxy.mouse.down = 0;
};

galaxy.keydowncb = function( e ) {
    var evt = e;
	var e = ( e.keyCode ? e.keyCode : e.which );
	if( e === 38 || e === 87 ){ galaxy.keys.state.up = 1; evt.preventDefault(); return false;}
	if( e === 39 || e === 68 ){ galaxy.keys.state.right = 1; evt.preventDefault(); return false;}
	if( e === 40 || e === 83 ){ galaxy.keys.state.down = 1; evt.preventDefault(); return false;}
	if( e === 37 || e === 65 ){ galaxy.keys.state.left = 1; evt.preventDefault(); return false;}
	if( e === 70 ){ galaxy.keys.state.f = 1; }
	if( e === 77 ){ galaxy.keys.state.m = 1; }
	if( e === 80 ){ galaxy.keys.state.p = 1; }
}

galaxy.keyupcb = function( e ) {
    var evt = e;
	var e = ( e.keyCode ? e.keyCode : e.which );
	if( e === 38 || e === 87 ){ galaxy.keys.state.up = 0; evt.preventDefault(); return false;}
	if( e === 39 || e === 68 ){ galaxy.keys.state.right = 0; evt.preventDefault(); return false;}
	if( e === 40 || e === 83 ){ galaxy.keys.state.down = 0; evt.preventDefault(); return false;}
	if( e === 37 || e === 65 ){ galaxy.keys.state.left = 0;  evt.preventDefault();return false;}
	if( e === 70 ){ galaxy.keys.state.f = 0; }
	if( e === 77 ){ galaxy.keys.state.m = 0; }
	if( e === 80 ){ galaxy.keys.state.p = 0; }
}

galaxy.resizecb = function( e ) {
	var rect = galaxy.cmg.getBoundingClientRect();
	galaxy.cOffset = {
		left: rect.left,
		top: rect.top
	}
}

galaxy.blurcb = function() {
	if( galaxy.state == 'play' ){
		galaxy.setState( 'pause' );
	}
}

galaxy.bindEvents = function() {
	window.addEventListener( 'mousemove', galaxy.mousemovecb );
	window.addEventListener( 'mousedown', galaxy.mousedowncb );
	window.addEventListener( 'mouseup', galaxy.mouseupcb );
	window.addEventListener( 'keydown', galaxy.keydowncb, false );
	window.addEventListener( 'keyup', galaxy.keyupcb, false );
	window.addEventListener( 'resize', galaxy.resizecb );
	window.addEventListener( 'blur', galaxy.blurcb );
};

/*==============================================================================
Miscellaneous
==============================================================================*/
galaxy.clearScreen = function() {
	galaxy.ctxmg.clearRect( 0, 0, galaxy.cw, galaxy.ch );
};

galaxy.updateDelta = function() {
	var now = Date.now();
	galaxy.dt = ( now - galaxy.lt ) / ( 1000 / 60 );
	galaxy.dt = ( galaxy.dt < 0 ) ? 0.001 : galaxy.dt;
	galaxy.dt = ( galaxy.dt > 10 ) ? 10 : galaxy.dt;
	galaxy.lt = now;
	galaxy.elapsed += galaxy.dt;
};

galaxy.updateScreen = function() {
	var xSnap,
		xModify,
		ySnap,
		yModify;

	if( galaxy.hero.x < galaxy.cw / 2 ) {
		xModify = galaxy.hero.x / galaxy.cw;
	} else if( galaxy.hero.x > galaxy.ww - galaxy.cw / 2 ) {
		xModify = 1 - ( galaxy.ww - galaxy.hero.x ) / galaxy.cw;
	} else {
		xModify = 0.5;
	}

	if( galaxy.hero.y < galaxy.ch / 2 ) {
		yModify = galaxy.hero.y / galaxy.ch;
	} else if( galaxy.hero.y > galaxy.wh - galaxy.ch / 2 ) {
		yModify = 1 - ( galaxy.wh - galaxy.hero.y ) / galaxy.ch;
	} else {
		yModify = 0.5;
	}

	xSnap = ( ( galaxy.cw * xModify - galaxy.hero.x ) - galaxy.screen.x ) / 30;
	ySnap = ( ( galaxy.ch * yModify - galaxy.hero.y ) - galaxy.screen.y ) / 30;

	// ease to new coordinates
	galaxy.screen.x += xSnap * galaxy.dt;
	galaxy.screen.y += ySnap * galaxy.dt;

	// update rumble levels, keep X and Y changes consistent, apply rumble
	if( galaxy.rumble.level > 0 ) {
		galaxy.rumble.level -= galaxy.rumble.decay;
		galaxy.rumble.level = ( galaxy.rumble.level < 0 ) ? 0 : galaxy.rumble.level;
		galaxy.rumble.x = galaxy.util.rand( -galaxy.rumble.level, galaxy.rumble.level );
		galaxy.rumble.y = galaxy.util.rand( -galaxy.rumble.level, galaxy.rumble.level );
	} else {
		galaxy.rumble.x = 0;
		galaxy.rumble.y = 0;
	}

	//galaxy.screen.x -= galaxy.rumble.x;
	//galaxy.screen.y -= galaxy.rumble.y;

	// animate background canvas
	galaxy.cbg1.style.marginLeft =
		-( ( galaxy.cbg1.width - galaxy.cw ) / 2 ) // half the difference from bg to viewport
		- ( ( galaxy.cbg1.width - galaxy.cw ) / 2 ) // half the diff again, modified by a percentage below
		* ( ( -galaxy.screen.x - ( galaxy.ww - galaxy.cw ) / 2 ) / ( ( galaxy.ww - galaxy.cw ) / 2) ) // viewport offset applied to bg
		- galaxy.rumble.x + 'px';
	galaxy.cbg1.style.marginTop =
		-( ( galaxy.cbg1.height - galaxy.ch ) / 2 )
		- ( ( galaxy.cbg1.height - galaxy.ch ) / 2 )
		* ( ( -galaxy.screen.y - ( galaxy.wh - galaxy.ch ) / 2 ) / ( ( galaxy.wh - galaxy.ch ) / 2) )
		- galaxy.rumble.y + 'px';
	galaxy.cbg2.style.marginLeft =
		-( ( galaxy.cbg2.width - galaxy.cw ) / 2 ) // half the difference from bg to viewport
		- ( ( galaxy.cbg2.width - galaxy.cw ) / 2 ) // half the diff again, modified by a percentage below
		* ( ( -galaxy.screen.x - ( galaxy.ww - galaxy.cw ) / 2 ) / ( ( galaxy.ww - galaxy.cw ) / 2) ) // viewport offset applied to bg
		- galaxy.rumble.x + 'px';
	galaxy.cbg2.style.marginTop =
		-( ( galaxy.cbg2.height - galaxy.ch ) / 2 )
		- ( ( galaxy.cbg2.height - galaxy.ch ) / 2 )
		* ( ( -galaxy.screen.y - ( galaxy.wh - galaxy.ch ) / 2 ) / ( ( galaxy.wh - galaxy.ch ) / 2) )
		- galaxy.rumble.y + 'px';
	galaxy.cbg3.style.marginLeft =
		-( ( galaxy.cbg3.width - galaxy.cw ) / 2 ) // half the difference from bg to viewport
		- ( ( galaxy.cbg3.width - galaxy.cw ) / 2 ) // half the diff again, modified by a percentage below
		* ( ( -galaxy.screen.x - ( galaxy.ww - galaxy.cw ) / 2 ) / ( ( galaxy.ww - galaxy.cw ) / 2) ) // viewport offset applied to bg
		- galaxy.rumble.x + 'px';
	galaxy.cbg3.style.marginTop =
		-( ( galaxy.cbg3.height - galaxy.ch ) / 2 )
		- ( ( galaxy.cbg3.height - galaxy.ch ) / 2 )
		* ( ( -galaxy.screen.y - ( galaxy.wh - galaxy.ch ) / 2 ) / ( ( galaxy.wh - galaxy.ch ) / 2) )
		- galaxy.rumble.y + 'px';
	galaxy.cbg4.style.marginLeft =
		-( ( galaxy.cbg4.width - galaxy.cw ) / 2 ) // half the difference from bg to viewport
		- ( ( galaxy.cbg4.width - galaxy.cw ) / 2 ) // half the diff again, modified by a percentage below
		* ( ( -galaxy.screen.x - ( galaxy.ww - galaxy.cw ) / 2 ) / ( ( galaxy.ww - galaxy.cw ) / 2) ) // viewport offset applied to bg
		- galaxy.rumble.x + 'px';
	galaxy.cbg4.style.marginTop =
		-( ( galaxy.cbg4.height - galaxy.ch ) / 2 )
		- ( ( galaxy.cbg4.height - galaxy.ch ) / 2 )
		* ( ( -galaxy.screen.y - ( galaxy.wh - galaxy.ch ) / 2 ) / ( ( galaxy.wh - galaxy.ch ) / 2) )
		- galaxy.rumble.y + 'px';

	galaxy.mousescreen();
};

galaxy.updateLevel = function() {
	if( galaxy.level.kills >= galaxy.level.killsToLevel ) {
		if( galaxy.level.current + 1 < galaxy.levelCount ){
			galaxy.level.current++;
			galaxy.level.kills = 0;
			galaxy.level.killsToLevel = galaxy.definitions.levels[ galaxy.level.current ].killsToLevel;
			galaxy.level.distribution = galaxy.definitions.levels[ galaxy.level.current ].distribution;
			galaxy.level.distributionCount = galaxy.level.distribution.length;
		} else {
			galaxy.level.current++;
			galaxy.level.kills = 0;
			// no more level definitions, so take the last level and increase the spawn rate slightly
			//for( var i = 0; i < galaxy.level.distributionCount; i++ ) {
				//galaxy.level.distribution[ i ] = Math.max( 1, galaxy.level.distribution[ i ] - 5 );
			//}
		}
		galaxy.levelDiffOffset = galaxy.level.current + 1 - galaxy.levelCount;
		galaxy.levelPops.push( new galaxy.LevelPop( {
			level: galaxy.level.current + 1
		} ) );
	}
};

galaxy.updatePowerupTimers = function() {
	// HEALTH
	if( galaxy.powerupTimers[ 0 ] > 0 ){
		if( galaxy.hero.life < 1 ) {
			galaxy.hero.life += 0.001;
		}
		if( galaxy.hero.life > 1 ) {
			galaxy.hero.life = 1;
		}
		galaxy.powerupTimers[ 0 ] -= galaxy.dt;
	}

	// SLOW ENEMIES
	if( galaxy.powerupTimers[ 1 ] > 0 ){
		galaxy.slow = 1;
		galaxy.powerupTimers[ 1 ] -= galaxy.dt;
	} else {
		galaxy.slow = 0;
	}

	// FAST SHOT
	if( galaxy.powerupTimers[ 2 ] > 0 ){
		galaxy.hero.weapon.fireRate = 2;
		galaxy.hero.weapon.bullet.speed = 14;
		galaxy.powerupTimers[ 2 ] -= galaxy.dt;
	} else {
		galaxy.hero.weapon.fireRate = 5;
		galaxy.hero.weapon.bullet.speed = 10;
	}

	// TRIPLE SHOT
	if( galaxy.powerupTimers[ 3 ] > 0 ){
		galaxy.hero.weapon.count = 3;
		galaxy.powerupTimers[ 3 ] -= galaxy.dt;
	} else {
		galaxy.hero.weapon.count = 1;
	}

	// PIERCE SHOT
	if( galaxy.powerupTimers[ 4 ] > 0 ){
		galaxy.hero.weapon.bullet.piercing = 1;
		galaxy.powerupTimers[ 4 ] -= galaxy.dt;
	} else {
		galaxy.hero.weapon.bullet.piercing = 0;
	}
};

galaxy.spawnPowerup = function( x, y ) {
	if( Math.random() < 0.1 ) {
		var min = ( galaxy.hero.life < 0.9 ) ? 0 : 1,
			type = Math.floor( galaxy.util.rand( min, galaxy.definitions.powerups.length ) ),
			params = galaxy.definitions.powerups[ type ];
		params.type = type;
		params.x = x;
		params.y = y;
		galaxy.powerups.push( new galaxy.Powerup( params ) );
	}
};

/*==============================================================================
States
==============================================================================*/
galaxy.setState = function( state ) {
	// handle clean up between states
	galaxy.buttons.length = 0;

	if( state == 'menu' ) {
		galaxy.mouse.down = 0;
		galaxy.mouse.ax = 0;
		galaxy.mouse.ay = 0;

		galaxy.reset();
		var playButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: galaxy.ch / 2 - 24,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'PLAY',
			action: function() {
				galaxy.reset();
				galaxy.audio.play( 'levelup' );
				galaxy.setState( 'play' );
			}
		} );
		galaxy.buttons.push( playButton );

        var selectShipButton = new galaxy.Button( {
            x: galaxy.cw / 2 + 1,
            y: playButton.ey + 25,
            lockedWidth: 299,
            lockedHeight: 49,
            scale: 3,
            title: 'CUSTOMIZE SPACESHIP',
            action: function() {
                galaxy.reset();
                galaxy.audio.play( 'levelup' );
                galaxy.setState( 'credits' );
            }
        } );
        galaxy.buttons.push( selectShipButton );

		var statsButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: selectShipButton.ey + 25,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'STATS',
			action: function() {
				galaxy.setState( 'stats' );
			}
		} );
		galaxy.buttons.push( statsButton );
	}

	if( state == 'stats' ) {
		galaxy.mouse.down = 0;

		var clearButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: 426,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'CLEAR DATA',
			action: function() {
				galaxy.mouse.down = 0;
				if( window.confirm( 'Are you sure you want to clear all locally stored game data? This cannot be undone.') ) {
					galaxy.clearStorage();
					galaxy.mouse.down = 0;
				}
			}
		} );
		galaxy.buttons.push( clearButton );

		var menuButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: clearButton.ey + 25,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'MENU',
			action: function() {
				galaxy.setState( 'menu' );
			}
		} );
		galaxy.buttons.push( menuButton );
	}


	if( state == 'credits' ) {
		galaxy.mouse.down = 0;

        var ship1_button = new galaxy.Button( {
            x: galaxy.cw / 2 + 1,
            y: 126,
            lockedWidth: 299,
            lockedHeight: 49,
            scale: 3,
            title: 'SHIP 1',
            action: function() {
                galaxy.storage['ship'] = 0;
                galaxy.setState( 'menu' );
            }
        } );
        galaxy.buttons.push( ship1_button );

        var ship2_button = new galaxy.Button( {
            x: galaxy.cw / 2 + 1,
            y: ship1_button.ey + 25,
            lockedWidth: 299,
            lockedHeight: 49,
            scale: 3,
            title: 'SHIP 2',
            action: function() {
                galaxy.storage['ship'] = 1;
                galaxy.setState( 'menu' );
            }
        } );
        galaxy.buttons.push( ship2_button );

        var ship3_button = new galaxy.Button( {
            x: galaxy.cw / 2 + 1,
            y: ship2_button.ey + 25,
            lockedWidth: 299,
            lockedHeight: 49,
            scale: 3,
            title: 'SHIP 3',
            action: function() {
                galaxy.storage['ship'] = 2;
                galaxy.setState( 'menu' );
            }
        } );
        galaxy.buttons.push( ship3_button );


        var ship4_button = new galaxy.Button( {
            x: galaxy.cw / 2 + 1,
            y: ship3_button.ey + 25,
            lockedWidth: 299,
            lockedHeight: 49,
            scale: 3,
            title: 'SHIP 4',
            action: function() {
                galaxy.storage['ship'] = 3;
                galaxy.setState( 'menu' );
            }
        } );
        galaxy.buttons.push( ship4_button );


        var ship5_button = new galaxy.Button( {
            x: galaxy.cw / 2 + 1,
            y: ship4_button.ey + 25,
            lockedWidth: 299,
            lockedHeight: 49,
            scale: 3,
            title: 'SHIP 5',
            action: function() {
                galaxy.storage['ship'] = 4;
                galaxy.setState( 'menu' );
            }
        } );
        galaxy.buttons.push( ship5_button );

        var menuButton = new galaxy.Button( {
            x: galaxy.cw / 2 + 1,
            y: ship5_button.ey + 25,
            lockedWidth: 299,
            lockedHeight: 49,
            scale: 3,
            title: 'BACK TO MENU',
            action: function() {
                galaxy.setState( 'menu' );
            }
        } );
        galaxy.buttons.push( menuButton );
	}

	if( state == 'pause' ) {
		galaxy.mouse.down = 0;
		galaxy.screenshot = galaxy.ctxmg.getImageData( 0, 0, galaxy.cw, galaxy.ch );
		var resumeButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: galaxy.ch / 2 + 26,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'RESUME',
			action: function() {
				galaxy.lt = Date.now() + 1000;
				galaxy.setState( 'play' );
			}
		} );
		galaxy.buttons.push( resumeButton );

		var menuButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: resumeButton.ey + 25,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'MENU',
			action: function() {
				galaxy.mouse.down = 0;
				if( window.confirm( 'Are you sure you want to end this game and return to the menu?') ) {
					galaxy.mousescreen();
					galaxy.setState( 'menu' );
				}
			}
		} );
		galaxy.buttons.push( menuButton );
	}

	if( state == 'gameover' ) {
		galaxy.mouse.down = 0;

		galaxy.screenshot = galaxy.ctxmg.getImageData( 0, 0, galaxy.cw, galaxy.ch );
		var resumeButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: 426,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'PLAY AGAIN',
			action: function() {
				galaxy.reset();
				galaxy.audio.play( 'levelup' );
				galaxy.setState( 'play' );
			}
		} );
		galaxy.buttons.push( resumeButton );

		var menuButton = new galaxy.Button( {
			x: galaxy.cw / 2 + 1,
			y: resumeButton.ey + 25,
			lockedWidth: 299,
			lockedHeight: 49,
			scale: 3,
			title: 'MENU',
			action: function() {
				galaxy.setState( 'menu' );
			}
		} );
		galaxy.buttons.push( menuButton );


		galaxy.storage['score'] = Math.max( galaxy.storage['score'], galaxy.score );
		galaxy.storage['level'] = Math.max( galaxy.storage['level'], galaxy.level.current );
		galaxy.storage['rounds'] += 1;
		galaxy.storage['kills'] += galaxy.kills;
		galaxy.storage['bullets'] += galaxy.bulletsFired;
		galaxy.storage['powerups'] += galaxy.powerupsCollected;
		galaxy.storage['time'] += Math.floor( galaxy.elapsed );
		galaxy.updateStorage();

        var urlEncodedDataPairs = [];
        urlEncodedDataPairs.push( 'name=' + encodeURIComponent( document.getElementById('userName').value ) );
        urlEncodedDataPairs.push( 'score=' + encodeURIComponent( galaxy.score ));
        urlEncodedDataPairs.push( 'level=' + encodeURIComponent(  galaxy.level.current ) );
        urlEncodedDataPairs.push( 'kills=' + encodeURIComponent( galaxy.kills ) );
        urlEncodedDataPairs.push( 'bullets=' + encodeURIComponent( galaxy.bulletsFired ) );
        urlEncodedDataPairs.push( 'powerup=' + encodeURIComponent( galaxy.powerupsCollected ) );
        urlEncodedDataPairs.push( 'time=' + encodeURIComponent(Math.floor( galaxy.elapsed )) );
        urlEncodedData = urlEncodedDataPairs.join( '&' ).replace( /%20/g, '+' );

        console.log(document.getElementById('userName').value );
        var request = new XMLHttpRequest();

        // Define what happens on successful data submission
        request.addEventListener( 'load', function(event) {
            alert( 'Send score success' );
        } );

        // Define what happens in case of error
        request.addEventListener( 'error', function(event) {
            alert( 'SendCored error' );
        } );

        // Set up our request
        request.open( 'POST', '/api/save-score' );

        // Add the required HTTP header for form data POST requests
        request.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

        // Finally, send our data.
        request.send( urlEncodedData );

    }

	// set state
	galaxy.state = state;
};

galaxy.setupStates = function() {
	galaxy.states['menu'] = function() {
		galaxy.clearScreen();
		galaxy.updateScreen();
		var i = galaxy.buttons.length; while( i-- ){
		        galaxy.buttons[ i ].update( i )

		}
			i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].render( i ) }

		galaxy.ctxmg.beginPath();
		var title = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2,
			y: galaxy.ch / 2 - 100,
			text: 'GALAXY ATTACK',
			hspacing: 2,
			vspacing: 1,
			halign: 'center',
			valign: 'bottom',
			scale: 10,
			snap: 1,
			render: 1
		} );
		gradient = galaxy.ctxmg.createLinearGradient( title.sx, title.sy, title.sx, title.ey );
		gradient.addColorStop( 0, '#fff' );
		gradient.addColorStop( 1, '#999' );
		galaxy.ctxmg.fillStyle = gradient;
		galaxy.ctxmg.fill();

		galaxy.ctxmg.beginPath();
		galaxy.ctxmg.fillStyle = '#666';
		galaxy.ctxmg.fill();

	};

	galaxy.states['stats'] = function() {
		galaxy.clearScreen();

		galaxy.ctxmg.beginPath();
		var statsTitle = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2,
			y: 150,
			text: 'STATS',
			hspacing: 3,
			vspacing: 1,
			halign: 'center',
			valign: 'bottom',
			scale: 10,
			snap: 1,
			render: 1
		} );
		var gradient = galaxy.ctxmg.createLinearGradient( statsTitle.sx, statsTitle.sy, statsTitle.sx, statsTitle.ey );
		gradient.addColorStop( 0, '#fff' );
		gradient.addColorStop( 1, '#999' );
		galaxy.ctxmg.fillStyle = gradient;
		galaxy.ctxmg.fill();

		galaxy.ctxmg.beginPath();
		var statKeys = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2 - 10,
			y: statsTitle.ey + 39,
			text: 'BEST SCORE\nBEST LEVEL\nROUNDS PLAYED\nENEMIES KILLED\nBULLETS FIRED\nPOWERUPS COLLECTED\nTIME ELAPSED',
			hspacing: 1,
			vspacing: 17,
			halign: 'right',
			valign: 'top',
			scale: 2,
			snap: 1,
			render: 1
		} );
		galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
		galaxy.ctxmg.fill();

		galaxy.ctxmg.beginPath();
		var statsValues = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2 + 10,
			y: statsTitle.ey + 39,
			text:
				galaxy.util.commas( galaxy.storage['score'] ) + '\n' +
				( galaxy.storage['level'] + 1 ) + '\n' +
				galaxy.util.commas( galaxy.storage['rounds'] ) + '\n' +
				galaxy.util.commas( galaxy.storage['kills'] ) + '\n' +
				galaxy.util.commas( galaxy.storage['bullets'] ) + '\n' +
				galaxy.util.commas( galaxy.storage['powerups'] ) + '\n' +
				galaxy.util.convertTime( ( galaxy.storage['time'] * ( 1000 / 60 ) ) / 1000 )
			,
			hspacing: 1,
			vspacing: 17,
			halign: 'left',
			valign: 'top',
			scale: 2,
			snap: 1,
			render: 1
		} );
		galaxy.ctxmg.fillStyle = '#fff';
		galaxy.ctxmg.fill();

		var i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].render( i ) }
			i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].update( i ) }
	};

	galaxy.states['credits'] = function() {
		galaxy.clearScreen();


		var i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].render( i ) }
			i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].update( i ) }
	};


	galaxy.states['play'] = function() {
		galaxy.updateDelta();
		galaxy.updateScreen();
		galaxy.updateLevel();
		galaxy.updatePowerupTimers();
		galaxy.spawnEnemies();
		galaxy.enemyOffsetMod += ( galaxy.slow ) ? galaxy.dt / 3 : galaxy.dt;
		// update entities
		var i = galaxy.enemies.length; while( i-- ){ galaxy.enemies[ i ].update( i ) }
			i = galaxy.explosions.length; while( i-- ){ galaxy.explosions[ i ].update( i ) }
			i = galaxy.powerups.length; while( i-- ){ galaxy.powerups[ i ].update( i ) }
			i = galaxy.particleEmitters.length; while( i-- ){ galaxy.particleEmitters[ i ].update( i ) }
			i = galaxy.textPops.length; while( i-- ){ galaxy.textPops[ i ].update( i ) }
			i = galaxy.levelPops.length; while( i-- ){ galaxy.levelPops[ i ].update( i ) }
			i = galaxy.bullets.length; while( i-- ){ galaxy.bullets[ i ].update( i ) }
		galaxy.hero.update();

		// render entities
		galaxy.clearScreen();
		galaxy.ctxmg.save();
		galaxy.ctxmg.translate( galaxy.screen.x - galaxy.rumble.x, galaxy.screen.y - galaxy.rumble.y );
		i = galaxy.enemies.length; while( i-- ){ galaxy.enemies[ i ].render( i ) }
		i = galaxy.explosions.length; while( i-- ){ galaxy.explosions[ i ].render( i ) }
		i = galaxy.powerups.length; while( i-- ){ galaxy.powerups[ i ].render( i ) }
		i = galaxy.particleEmitters.length; while( i-- ){ galaxy.particleEmitters[ i ].render( i ) }
		i = galaxy.textPops.length; while( i-- ){ galaxy.textPops[ i ].render( i ) }
		i = galaxy.bullets.length; while( i-- ){ galaxy.bullets[ i ].render( i ) }
		galaxy.hero.render();
		galaxy.ctxmg.restore();
		i = galaxy.levelPops.length; while( i-- ){ galaxy.levelPops[ i ].render( i ) }
		galaxy.renderInterface();
		galaxy.renderMinimap();

		// handle gameover
		if( galaxy.hero.life <= 0 ) {
			var alpha = ( ( galaxy.gameoverTick / galaxy.gameoverTickMax ) * 0.8 );
				alpha = Math.min( 1, Math.max( 0, alpha ) );
			galaxy.ctxmg.fillStyle = 'hsla(0, 100%, 0%, ' + alpha + ')';
			galaxy.ctxmg.fillRect( 0, 0, galaxy.cw, galaxy.ch );
			if( galaxy.gameoverTick < galaxy.gameoverTickMax ){
				galaxy.gameoverTick += galaxy.dt;
			} else {
				galaxy.setState( 'gameover' );
			}

			if( !galaxy.gameoverExplosion ) {
				galaxy.audio.play( 'death' );
				galaxy.rumble.level = 25;
				galaxy.explosions.push( new galaxy.Explosion( {
					x: galaxy.hero.x + galaxy.util.rand( -10, 10 ),
					y: galaxy.hero.y + galaxy.util.rand( -10, 10 ),
					radius: 50,
					hue: 0,
					saturation: 0
				} ) );
				galaxy.particleEmitters.push( new galaxy.ParticleEmitter( {
					x: galaxy.hero.x,
					y: galaxy.hero.y,
					count: 45,
					spawnRange: 10,
					friction: 0.95,
					minSpeed: 2,
					maxSpeed: 20,
					minDirection: 0,
					maxDirection: galaxy.twopi,
					hue: 0,
					saturation: 0
				} ) );
				for( var i = 0; i < galaxy.powerupTimers.length; i++ ){
					galaxy.powerupTimers[ i ] = 0;
				}
				galaxy.gameoverExplosion = 1;
			}
		}

		// update tick
		galaxy.tick += galaxy.dt;

		// listen for pause
		if( galaxy.keys.pressed.p ){
			galaxy.setState( 'pause' );
		}

		// always listen for autofire toggle
		if( galaxy.keys.pressed.f ){
			galaxy.autofire = ~~!galaxy.autofire;
			galaxy.storage['autofire'] = galaxy.autofire;
			galaxy.updateStorage();
		}
	};

	galaxy.states['pause'] = function() {
		galaxy.clearScreen();
		galaxy.ctxmg.putImageData( galaxy.screenshot, 0, 0 );

		galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 0%, 0.4)';
		galaxy.ctxmg.fillRect( 0, 0, galaxy.cw, galaxy.ch );

		galaxy.ctxmg.beginPath();
		var pauseText = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2,
			y: galaxy.ch / 2 - 50,
			text: 'PAUSED',
			hspacing: 3,
			vspacing: 1,
			halign: 'center',
			valign: 'bottom',
			scale: 10,
			snap: 1,
			render: 1
		} );
		var gradient = galaxy.ctxmg.createLinearGradient( pauseText.sx, pauseText.sy, pauseText.sx, pauseText.ey );
		gradient.addColorStop( 0, '#fff' );
		gradient.addColorStop( 1, '#999' );
		galaxy.ctxmg.fillStyle = gradient;
		galaxy.ctxmg.fill();

		var i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].render( i ) }
			i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].update( i ) }

		if( galaxy.keys.pressed.p ){
			galaxy.setState( 'play' );
		}
	};

	galaxy.states['gameover'] = function() {
		galaxy.clearScreen();
		galaxy.ctxmg.putImageData( galaxy.screenshot, 0, 0 );

		var i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].update( i ) }
			i = galaxy.buttons.length; while( i-- ){ galaxy.buttons[ i ].render( i ) }

		galaxy.ctxmg.beginPath();
		var gameoverTitle = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2,
			y: 150,
			text: 'GAME OVER',
			hspacing: 3,
			vspacing: 1,
			halign: 'center',
			valign: 'bottom',
			scale: 10,
			snap: 1,
			render: 1
		} );
		var gradient = galaxy.ctxmg.createLinearGradient( gameoverTitle.sx, gameoverTitle.sy, gameoverTitle.sx, gameoverTitle.ey );
		gradient.addColorStop( 0, '#f22' );
		gradient.addColorStop( 1, '#b00' );
		galaxy.ctxmg.fillStyle = gradient;
		galaxy.ctxmg.fill();

		galaxy.ctxmg.beginPath();
		var gameoverStatsKeys = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2 - 10,
			y: gameoverTitle.ey + 51,
			text: 'SCORE\nLEVEL\nKILLS\nBULLETS\nPOWERUPS\nTIME',
			hspacing: 1,
			vspacing: 17,
			halign: 'right',
			valign: 'top',
			scale: 2,
			snap: 1,
			render: 1
		} );
		galaxy.ctxmg.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
		galaxy.ctxmg.fill();

		galaxy.ctxmg.beginPath();
		var gameoverStatsValues = galaxy.text( {
			ctx: galaxy.ctxmg,
			x: galaxy.cw / 2 + 10,
			y: gameoverTitle.ey + 51,
			text:
				galaxy.util.commas( galaxy.score ) + '\n' +
				( galaxy.level.current + 1 ) + '\n' +
				galaxy.util.commas( galaxy.kills ) + '\n' +
				galaxy.util.commas( galaxy.bulletsFired ) + '\n' +
				galaxy.util.commas( galaxy.powerupsCollected ) + '\n' +
				galaxy.util.convertTime( ( galaxy.elapsed * ( 1000 / 60 ) ) / 1000 )
			,
			hspacing: 1,
			vspacing: 17,
			halign: 'left',
			valign: 'top',
			scale: 2,
			snap: 1,
			render: 1
		} );
		galaxy.ctxmg.fillStyle = '#fff';
		galaxy.ctxmg.fill();
	};
}

/*==============================================================================
Loop
==============================================================================*/
galaxy.loop = function() {
	requestAnimFrame( galaxy.loop );

	// setup the pressed state for all keys
	for( var k in galaxy.keys.state ) {
		if( galaxy.keys.state[ k ] && !galaxy.okeys[ k ] ) {
			galaxy.keys.pressed[ k ] = 1;
		} else {
			galaxy.keys.pressed[ k ] = 0;
		}
	}

	// run the current state
	galaxy.states[ galaxy.state ]();

	// always listen for mute toggle
	if( galaxy.keys.pressed.m ){
		galaxy.mute = ~~!galaxy.mute;
		var i = galaxy.audio.references.length;
		while( i-- ) {
			galaxy.audio.references[ i ].volume = ~~!galaxy.mute;
		}
		galaxy.storage['mute'] = galaxy.mute;
		galaxy.updateStorage();
	}

	// move current keys into old keys
	galaxy.okeys = {};
	for( var k in galaxy.keys.state ) {
		galaxy.okeys[ k ] = galaxy.keys.state[ k ];
	}
};

/*==============================================================================
Start Game on Load
==============================================================================*/
window.addEventListener( 'load', function() {
	document.documentElement.className += ' loaded';
    galaxy.init();
});
