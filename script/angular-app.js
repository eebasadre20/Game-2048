var game = angular.module( "2048" , [ ] );

game
	.service( "Gen2048" , [
		function service ( ) {			
			var self = this;

			this.board = [
				[ 0 , 0 , 0 , 0 ],
				[ 0 , 0 , 0 , 0 ],
				[ 0 , 0 , 0 , 0 ],
				[ 0 , 0 , 0 , 0 ]
			];

			this.count = 0;

			this.generate = function generate ( element ) {
				do{
					var numbers = [ 2 , 4 ];
					var x = Math.floor( Math.random( ) * ( 4 - 0 ) );
					var y = Math.floor( Math.random( ) * ( 4 - 0 ) );

					if ( this.board[x][y] == 0 ){
						this.board[x][y] = {
							"element": element,
							"value": numbers[ Math.floor( Math.random( ) * ( 2 - 0 ) ) ]
						};
						return [ x , y , this.board[x][y] ];
					}
				}while( true );
			};			

			this.moveRight = function moveRight ( element ) {
				var movementTiles = [ ];
				for( var i = 0 ; i < this.board.length ; i ++ ) {
					for( var j = this.board[i].length - 1 ; j >= 0 ; j -- ) {
						if ( this.board[i][j] != 0 ) {
							var el	= this.board[i][j].element;							
							var moves = leftRight( i , j , 1 , this.board[i].length - 1 );
							movementTiles.push( moves.count );
							element.trigger( "moveRight" , { "moves": moves.count , "element": el , "handler": moves.handler } );							
						}
					}

				}	
				return movementTiles;			
			};

			this.moveLeft = function moveLeft ( element ) {
				var movementTiles = [ ];
				for( var i = 0 ; i < this.board.length ; i ++ ) {
					for( var j = 0 ; j < this.board[i].length ; j ++ ) {
						if ( this.board[i][j] != 0 ) {
							var el	= this.board[i][j].element;						
							var moves = leftRight( i , j , -1 , 0 );
							movementTiles.push( moves.count );
							element.trigger( "moveLeft" , { "moves": moves.count , "element": el , "handler": moves.handler } );
						}
					}					
				}	
				return movementTiles;			
			};

			this.moveDown = function moveDown ( element ) {
				var movementTiles = [ ];
				for ( var j = 0 ; j < this.board.length ; j ++ ) {
					for ( var i = this.board[j].length - 1 ; i >= 0 ; i -- ) {
						if ( this.board[i][j] != 0 ) {
							var el = this.board[i][j].element;
							var moves = upDown ( i , j , 1 , this.board[j].length - 1 );
							movementTiles.push( moves.count );
							element.trigger( "moveDown" , { "moves": moves.count , "element": el , "handler": moves.handler } );							
						}
					}
				}	
				return movementTiles;				
			};

			this.moveUp = function moveUp ( element ) {
				var movementTiles = [ ];
				for ( var j = 0 ; j < this.board.length ; j ++ ) {
					for ( var i = 0 ; i < this.board[j].length ; i ++ ) {
						if ( this.board[i][j] != 0 ) {
							var el = this.board[i][j].element;
							var moves = upDown ( i , j , -1 , 0 );
							movementTiles.push( moves.count );
							element.trigger( "moveUp" , { "moves": moves.count , "element": el , "handler": moves.handler } );
						}
					}
				}	
				return movementTiles;				
			};

			function leftRight ( f , s , m , len  ) {
				var moves = {
					"count": 0,
					"handler": false
				};

				do {
					if ( s == len ) return moves;
					if ( self.board[f][s + (m*1)] != 0 ) {
						if ( self.board[f][s + (m*1)].value == self.board[f][s].value ) {							
							self.count += (self.board[f][s + (m*1)].value += self.board[f][s].value);
							self.board[f][s] = 0;
							moves.count ++;
							moves.handler = true;
						}						
						return moves;
					} else {
						moves.count ++;
						self.board[f][s + (m*1)] = self.board[f][s];
						self.board[f][s] = 0;
					}					
					s += (m*1);						
				} while ( true );
			};

			function upDown ( f , s , m , len ) {
				var moves = {
					"count": 0,
					"handler": false
				};

				do {				
					if ( f == len )	return moves;
					if ( self.board[f + (m*1)][s] != 0 ) {
						if ( self.board[f + (m*1)][s].value == self.board[f][s].value ){
							self.count += (self.board[f + (m*1)][s].value += self.board[f][s].value);
							self.board[f][s] = 0;
							moves.count ++;
							moves.handler = true;
						}
						return moves;
					} else {
						moves.count ++;
						self.board[f + (m*1)][s] = self.board[f][s];
						self.board[f][s] = 0;
					}
					f += (m*1);						
				} while ( true );
			}

			return this;
		}
	] );

game
	.directive( "boardGame" , [
		"Gen2048",		
		function directive ( Gen2048 ) {
			return {
				"restrict": "A",
				"scope": true,
				"link": function onLink ( scope , element , attributeSet ) {
					scope.tiles = [ ];

					scope.$on( "start-game" , function ( ) {
						scope.$apply( function ( ) {
							scope.tiles.push( scope.tiles.length );
							scope.tiles.push( scope.tiles.length );
						} );
					} );

					element.on( "fire" , 
						function ( event , data ) {
							var movementTiles;
							if ( data == "Right" ) movementTiles = Gen2048.moveRight( element );
							else if ( data == "Left" ) movementTiles = Gen2048.moveLeft( element );
							else if ( data == "Down" ) movementTiles = Gen2048.moveDown( element );
							else if ( data == "Up" ) movementTiles = Gen2048.moveUp( element );
														
							setTimeout( function ( ) {
								scope.$apply( function ( ) {
									movementTiles.some( function ( move ) {
										if ( move > 0 ) {
											return scope.tiles.push( scope.tiles.length );
										}
									} );
								} );
							} , 1000 );							
						} );
				}
			}
		}
	] );

game
	.directive( "tile" , [ 
		"Gen2048",	
		function directive ( Gen2048 ) {
			return {
				"restrict": "A",
				"scope": true,
				"link": function onLink ( scope , element , attributeSet ) {
					scope.tileValue = 0;

					var points = Gen2048.generate( element );

					scope.tileValue = points[2].value;
					
					$("#board").trigger( "newTile" , { "points": points , "element": element } );

					scope.$watch( function ( ) {return points[2].value} , 
						function ( val ) {
							scope.tileValue = points[2].value;
						} );
				}
			}
		}
	] );

game
	.directive( "start" , [
		"$rootScope",
		function directive ( $rootScope ) {
			return function ( scope , element ) {
				element.bind( "click" , 
					function ( ) {						
						$rootScope.$broadcast( "start-game" );
						element.addClass( "hidden" ); 
					} );
			}
		}
	] );

game
	.directive( "reload" , [
		"$window",
		function directive ( $window ) {
			return function ( scope, element ) {
				scope.$on( "start-game", function ( ) {
					element.addClass( "display" )
				} )

				element.bind ( "click" , 
					function ( ) {
						$window.location.reload();
					} );
			}
		}
	] );

game
	.directive( "score" , [
		"Gen2048",
		function directive ( Gen2048 ) {
			return {
				"restrict": "A",
				"scope": true,
				"link": function onLink ( scope , element , attributeSet ) {

					scope.scoreValue = 0;

					scope.$watch( function ( ) {
							return Gen2048.count;
						} , 
						function ( value ) {							
							scope.scoreValue = value;							
						} );
				}
			}			
		}
	] );