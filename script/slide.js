$( function ( ) {

	var wOffset = parseInt( $( "#board" ).width( ) / 4 );
	var wholeWidth = $( "#board" ).width( );

	var events = [
		{
			"name": "swipeLeft",
			"handler": new swipeEvent( function ( ) {
				if ( !$(".tiles").is(":animated") )
					$( "#board" ).trigger( "fire" , "Left" );
			} )
		},
		{
			"name": "swipeRight",
			"handler": new SwipeEvent ( function ( ) {
				if( !$( ".tiles" ).is(":animated") )
					$( "#board" ).trigger( "fire", "Right" );
			} )
		},
		{
			"name": "swipeUp",
			"handler": new SwipeEvent ( function ( ) {
				if( !$( ".tiles" ).is(":animated") )
					$( "#board" ).trigger( "fire", "Up" );
			} )  
		},
		{
			"name": "swipeDown",
			"handler" new SwipeEvent  ( function ( ) {
				if ( !$( ".tiles" ).is(":animated") )
					$( "#board" ).trigger( "fire", "Down" )
			} )
		}
	];

	$( "#board" ).on( "moveLeft",
		function ( evt, data ) {
			tileMove( wOffset*-1, 0 , data )
		} );
	$( "#board" ).on( "moveRight", 
		function ( evt, data ) {

		} );
	$( "#board" ).on( "moveUp",
		function ( evt, data ) {
			tileMove( 0, wOffset, data );
		} );
	$( "#board" ).on( "moveDown",
		function ( evt, data ) {
			tileMove( 0, wOffset, data );
		} )
	$( "#board" ).on( "newTile",
		function ( ) {
			var topOffset = parseInt( $( "board" ).offset( ).top );

		} );

	var tileMove = function tileMove ( h, v ,data ) {
		var left = data.element.offset( ).left;
		var top = data.element.offset( ).top;

			data.element.animate( {
				"left": left + ( h * data.moves ),
				"top": top + ( v * data.moves )
			}, "slow", function ( ) {
				if( data .handler ) {
					data.element.addClass( "hidden" );
				}
			} )
	}

	var registerEvent = function registerEvent ( ) {
		events.forEach ( function ( each ) {
			$( "#board" ).on( each.name );
		} )
	}

	var SwipeBoard = function SwipeBoard ( ) {
		var swipe = { }
		events.forEach ( function ( each ) {
			swipe[ each.name ] = each.handler;
		} );

		return swipe;
	}	

	$( "#board" ).swipe( SwipeBoard( ) );

	registerEvent( );

	function SwipeEvent ( handler ) {
		return function ( event, distance, duration, fingerCount, fingerData ) {
			handler( );
		};
	}; 
} );