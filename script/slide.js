$( function ( ) {

	var events = [
		{
			"name": "swipeLeft",
			"handler": new swipeEvent( function ( ) {
				if ( !$(".tiles"))
			} )
		},
		{
			"name": "swipeRight",
			"handler": newe SwipeEvent ( function ( ) {

			} )
		},


	]

	function SwipeEvent ( handler ) {
		return function ( event, distance, duration, fingerCount, fingerData ) {
			handler( );
		}
	} 
} );