var game = angular.module( "2048" , [ ] );


game
	.service( "Gen2048", [
		function service ( ) {
			var self = this;

			this.board = [
				[0 , 0 , 0 , 0 ],
				[0 , 0 , 0 , 0 ],
				[0 , 0 , 0 , 0 ],
				[0 , 0 , 0 , 0 ]
			]

			this.generate = function generate ( element ) {
				do {
					var numbers = [ 2, 4];

					var x = Math.floor( Math.random ( ) * ( 4 - 0 ) );
					var y = Math.floor( Math.random ( ) * ( 4 - 0 ) );

					if ( this.board[x][y] == 0 ) {
						this.board[x][y] = {
							"element" : element,
							"value": numbers[ Math.floor( Math.random( ) * ( 2 - 0 ) ) ]
						};
						return [ x , y , this.board[x][y] ];
					}
				} while( true )
			}
		}
	] )


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