galaxy.audio = {
	sounds: {},
	references: [],
	play: function( sound ) {
		if( !galaxy.mute ){
			var audio = galaxy.audio.sounds[ sound ];
			if( audio.length > 1 ){
				audio = galaxy.audio.sounds[ sound ][ Math.floor( galaxy.util.rand( 0, audio.length ) ) ];
			} else {
				audio = galaxy.audio.sounds[ sound ][ 0 ];
			}
			audio.pool[ audio.tick ].play();
			if( audio.tick < audio.count - 1 ) {
				audio.tick++;
			} else {
				audio.tick = 0;
			}
		}
	}
};

for( var k in galaxy.definitions.audio ) {
	galaxy.audio.sounds[ k ] = [];

	galaxy.definitions.audio[ k ].params.forEach( function( elem, index, array ) {
		galaxy.audio.sounds[ k ].push( {
			tick: 0,
			count: galaxy.definitions.audio[ k ].count,
			pool: []
		} );

		for( var i = 0; i < galaxy.definitions.audio[ k ].count; i++ ) {
			var audio = new Audio();
			audio.src = jsfxr( elem );
			galaxy.audio.references.push( audio );
			galaxy.audio.sounds[ k ][ index ].pool.push( audio );
		}

	} );
}
