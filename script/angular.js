var game = angular.module( "2048" , [ ] );

game
	.directive( "boardGame", [
		"Gen2048",
		function directive ( Gen2048 ) {
			return {
				"restrict": "A",
				"scope": true,
				"link": function onLink ( scope, element, attributeSet ) {
					scope.tiles = [ ];

					scope.$on( "start-game", function ( ) {
						scope.$apply( function ( ) {
							scope.tiles.push( scope.tiles.length );
							scope.tiles.push( scope.tiles.length );
						} );
					} );
				}
			}
		}
	] );

game
	.directive ( "start", [
		"$rootScope",
		function directive ( $rootScope ) {
			return function ( scope, element ) {
				element.bind( "click" , 
					function ( ) {
						$rootScope.$broadcast( "start-game" );
						element.addClass( "hidden" );
				} );
			}
		}
	] );