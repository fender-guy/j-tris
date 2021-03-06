//TODO: use request animation frame
//TODO: optimize as much as possible

// request animation frame shim from
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
(function() {
   var lastTime = 0;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = 
   window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
   }

   if (!window.requestAnimationFrame)
   window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
         timeToCall);
      lastTime = currTime + timeToCall;
      return id;
   };

if (!window.cancelAnimationFrame)
   window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
   };
}());


var tetris = {

   randomColor : function(){
      var colorshuffle=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
      var randColor = "";
      for (i=0; i<=5; i++){
         colorshuffle.shuffle();
         randColor = randColor + String(colorshuffle[0]);
      }
      return randColor;
   },

   pieces : {
      o : function() {
         return [
         [[1,1,0,0],
          [1,1,0,0],
          [0,0,0,0],
          [0,0,0,0]],
         [[1,1,0,0],
          [1,1,0,0],
          [0,0,0,0],
          [0,0,0,0]],
         [[1,1,0,0],
          [1,1,0,0],
          [0,0,0,0],
          [0,0,0,0]],
         [[1,1,0,0],
          [1,1,0,0],
          [0,0,0,0],
          [0,0,0,0]]
         ];
      },

      t : function() {
         return [
         [[0,0,0,0],
          [1,1,1,0],
          [0,1,0,0],
          [0,0,0,0]],
         [[0,1,0,0],
          [1,1,0,0],
          [0,1,0,0],
          [0,0,0,0]],
         [[0,1,0,0],
          [1,1,1,0],
          [0,0,0,0],
          [0,0,0,0]],
         [[0,1,0,0],
          [0,1,1,0],
          [0,1,0,0],
          [0,0,0,0]]
         ];
      },

      i : function() {
         return [
         [[0,1,0,0],
          [0,1,0,0],
          [0,1,0,0],
          [0,1,0,0]],
         [[0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0]],
         [[0,0,1,0],
          [0,0,1,0],
          [0,0,1,0],
          [0,0,1,0]],
         [[0,0,0,0],
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0]]
         ];
      },

      z : function() {
         return [
         [[0,0,0,0],
          [1,1,0,0],
          [0,1,1,0],
          [0,0,0,0]],
         [[0,1,0,0],
          [1,1,0,0],
          [1,0,0,0],
          [0,0,0,0]],
         [[1,1,0,0],
          [0,1,1,0],
          [0,0,0,0],
          [0,0,0,0]],
         [[0,0,1,0],
          [0,1,1,0],
          [0,1,0,0],
          [0,0,0,0]]
         ];
      },

      s : function() { 
         return [
         [[0,0,0,0],
          [0,1,1,0],
          [1,1,0,0],
          [0,0,0,0]],
         [[1,0,0,0],
          [1,1,0,0],
          [0,1,0,0],
          [0,0,0,0]],
         [[0,1,1,0],
          [1,1,0,0],
          [0,0,0,0],
          [0,0,0,0]],
         [[0,1,0,0],
          [0,1,1,0],
          [0,0,1,0],
          [0,0,0,0]]
         ];
      },

      l : function() {
         return [
         [[0,1,0,0],
          [0,1,0,0],
          [0,1,1,0],
          [0,0,0,0]],
         [[0,0,0,0],
          [1,1,1,0],
          [1,0,0,0],
          [0,0,0,0]],
         [[1,1,0,0],
          [0,1,0,0],
          [0,1,0,0],
          [0,0,0,0]],
         [[0,0,1,0],
          [1,1,1,0],
          [0,0,0,0],
          [0,0,0,0]]
         ];
      },

      j : function() {
         return [
         [[0,1,0,0],
          [0,1,0,0],
          [1,1,0,0],
          [0,0,0,0]],
         [[1,0,0,0],
          [1,1,1,0],
          [0,0,0,0],
          [0,0,0,0]],
         [[0,1,1,0],
          [0,1,0,0],
          [0,1,0,0],
          [0,0,0,0]],
         [[0,0,0,0],
          [1,1,1,0],
          [0,0,1,0],
          [0,0,0,0]]
         ];
      }
   },

   board : [
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,0,0,0,0,0,0,0,0,0,0,1],
         [1,1,1,1,1,1,1,1,1,1,1,1]],

   init : function(){
      this.dom = this.domBuild('.play_board .block', 12);
      this.waitDom = this.domBuild('.onDeck_board .block', 4);
      this.waitingPiece = this.createPiece();
      this.playPiece = this.createPiece();
      this.lineNum = 0;
      this.tetrisNum = 0;
      this.level = 0;
      this.timeOffset = 35;
      this.counter = 0;
      this.renderWaiting();
      this.render();
      var that = this;

      //controls game loop and key control timers 
      this.time = window.setInterval($.proxy(this.gameLoop, this), 1000 / 60);    
      $(window).on('keydown', $.proxy(this.controls, this));
   },

   // makes the blocks into an array of great justice
   domBuild : function(blocks, xLength) {
      var domBlocks = $(blocks);
      var domBlocksLength = domBlocks.length;
      var domArray = [];
      for (var i = 0; i < domBlocksLength; i = i + xLength) {
         domArray.push(domBlocks.slice(i,i + xLength));
      }
      return domArray;
   },

   gameLoop : function(){
      this.counter++;
      if (this.counter === this.timeOffset) {
         if (this.collisionTest("down") === false) {
            this.moveDown();
         } 
         this.counter = 0;
      }
   },

   controls : function(e) {
      //console.log('code', e.charCode, e.keyCode);
      if (e.keyCode === 37) {
         if (this.collisionTest("left", 0) === false) {
            this.moveLeft();
         } 
      } 

      if (e.keyCode === 39) {
         if (this.collisionTest("right", 0) === false) {
            this.moveRight();
         } 
      } 
      if (e.keyCode === 65) {
         if (this.collisionTest("lRotate") === false) {
            this.rotate("lRotate");
         }
      }
      if (e.keyCode === 83) {
         if (this.collisionTest("rRotate") === false) {
            this.rotate("rRotate");
         } 
      }
      if (e.keyCode === 40) {
         if (this.collisionTest("down") === false) {
            this.moveDown();
         }
      }
      if (e.keyCode === 32) {
         if (this.collisionTest("down") === false) {
            this.hardDrop()
         }
      }
   },


   //returns random piece with a name and color attached to it.
   //build this.playPiece array x = 11 y = 18 
   createPiece : function(){
      var allPieces = ['o','t','i','z','s','l','j'];
      var piece = {};
      var newPiece = [
        [[0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0]],   
        [[0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0]],   
        [[0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0]],   
        [[0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0,0,0,0,0]]   
      ];

      allPieces.shuffle();
      var select = allPieces[0];

      piece = tetris.pieces[select]();
      newPiece.name = select;
      newPiece.color = tetris.randomColor();	

      for (var r = 0; r <= 3; r++) {
         for (var y = 0; y <= 3; y++) {
            for (var x = 0; x <= 11; x ++) {
               if (x > 4 && x < 9) {
                  newPiece[r][y][x] = piece[r][y][x-5];
               } 
            }
         }
      }
      
      return newPiece;
   },

   gameOver : function() { 
      $(window).off('keydown');
      window.clearInterval(this.time);
      console.log('game over man');
   },

   moveDown : function(){
      var piecelength = this.playPiece[0].length - 2;

      for (var r = 0; r < 4; r++) {
         for (var y = piecelength; y >= 0; y--) {
            for (var x = 0; x <= 11; x++) {
               if (this.playPiece[r][y][x] == 1) {
                  this.playPiece[r][y + 1][x] = 1;
                  this.playPiece[r][y][x] = 0;
               }
            }
         }
      }
      this.render();
   },

   moveLeft : function(){
      var piecelength = this.playPiece[0].length - 1;

      //moves array over to left one
      for (var r = 0; r < 4; r++) {
         if (this.collisionTest('left', r) === false) {
            for (var y = piecelength; y >= 0; y--) {
               for (var x = 0; x <= 11; x++) {
                  if (this.playPiece[r][y][x] == 1) {
                     this.playPiece[r][y][x - 1] = 1;
                     this.playPiece[r][y][x] = 0;
                  }
               }
            }
         }
      }
      this.render();
   },

   moveRight : function(){
      var pieceLength = this.playPiece[0].length - 1;

      //moves array over to right one
      for (var r = 0; r < 4; r++) {
         if (this.collisionTest('right', r) === false) {
            for (var y = pieceLength; y >= 0; y--) {
               for (var x = 13; x >= 0; x--) {
                  if (this.playPiece[r][y][x] === 1) {
                     this.playPiece[r][y][x] = 0;
                     this.playPiece[r][y][x + 1] = 1;
                  }
               }
            }
         }
      }
      this.render();
   },

   rotate : function(direction) {

      // takes last array and puts it at the beginning 
      if (direction === "lRotate") {
         var popped = this.playPiece.pop();
         this.playPiece.unshift(popped);
      }

      //takes first array and puts it on the end
      if (direction === "rRotate") {
         var shifted = this.playPiece.shift();
         this.playPiece.push(shifted);
      }

      this.render();
   },

   hardDrop : function() {
      if (this.collisionTest("down") === false) {
         this.moveDown();
         this.hardDrop();
      } 
   },

   //check every place with a 1 against certain conditions
   collisionTest : function(direction, r){
      var pieceLength = this.playPiece[0].length - 1;

      //builds array for piece coordinates
      for (var y = pieceLength; y >= 0; y--) {
         for (var x = 0; x <= 11; x++) {

            if (direction === 'lRotate') { 
               if (this.playPiece[3][y][x] === 1 && this.board[y][x] === 1) {
                  return true;
               }
            }

            if (direction === 'rRotate') { 
               if (this.playPiece[1][y][x] === 1 && this.board[y][x] === 1) {
                  return true;
               }
            }

            // if piece touches down on another piece 
            if (direction === "down" && this.playPiece[0][y][x] === 1) {
               if (this.board[y + 1][x] === 1) {
                  this.touchDown();
                  return true;
               }
            }

            // if piece hits another piece on the sides
            if (direction === "left") { 
               if (this.playPiece[r][y][x] === 1 && this.board[y][x - 1] === 1) { 
                  return true;
               }
            }

            if (direction === "right") {
               if (this.playPiece[r][y][x] === 1 && this.board[y][x + 1] === 1) { 
                  return true;
               }
            }
            
            if (direction === 'init' && this.playPiece[0][y][x] === 1) {
               if (this.board[y][x] === 1) {
                  return true;
               }
            }
         }
      }

      return false;

   },

   //fires when piece hits bottom or another piece
   touchDown : function(){
      this.loadBoard();
      this.playPiece = this.waitingPiece;
      this.waitingPiece = this.createPiece();
      if (this.collisionTest('init') === true) {
         this.gameOver();
      }
      this.render();
      this.lineFind();
      this.renderWaiting();
   },

   lineFind : function() {
      var xCount = 0;
      var lines = 0;
      var linePos = [];

      for (var y = 17; y >= 0; y--) {
         xCount = 0;
         for (var x = 1; x <= 9; x++) {
             if (this.board[y][x] === 1){
               xCount++;
               console.log('y: ',y,'xCount: ',xCount);
               //fix this
               if (xCount === 9) {
                  lines++;
                  xCount = 0;
                  linePos.push(y);
               }
            }
         }
      }

      // TODO abstract out the scoring 
      console.log('lines: ',lines,'line y position ', linePos);
      if (lines > 0) {
         this.lineNum = this.lineNum + lines;
         $('.lines').html('Lines: ' + this.lineCounter());

         if (lines === 4) {
            this.tetrisNum++;
            $('.tetris').html('Tetris: ' + this.tetrisNum);
         }

         if (this.lineNum >= 10) {
            this.lineNum = this.lineNum - 10;
            this.level = this.level + 1;
            this.timeOffset = this.timeOffset - 1;
            $('.lines').html('Lines: ' + this.lineCounter());
            $('.level').html('Level: ' + this.level);
         }

         this.lineRemove(linePos);
         lines = 0;
         linePos = [];
      }
   },

   lineCounter : function(){
      return this.level * 10 + this.lineNum;
   },

   lineRemove : function(linePos) {
      var length = linePos.length - 1;
      var holdColor;

      //y = row where line is
      for (var y = length; y >= 0; y--) {
         for (var x = 1; x <= 10; x++) {
            $(this.dom[linePos[y]][x]).css('backgroundColor', '#fff');
            this.board[linePos[y]][x] = 0;
         }

         //moves everything from line row down 1 
         for (var line = linePos[y] - 1; line >= 0; line--) {
            for (var x = 1; x <= 10; x++) {
               if (this.board[line][x] === 1) {
                  var holdColor = $(this.dom[line][x]).css('backgroundColor');

                  this.board[line + 1][x] = 1;
                  this.board[line][x] = 0;
                  $(this.dom[line + 1][x]).css('backgroundColor', holdColor);
                  $(this.dom[line][x]).css('backgroundColor', '#fff');
               }
            }
         }

      }
      //for debugging
      //for (var y = 0; y <= piecelength; y++){
         //for (var x = 0; x <= 11; x++) {
            //$(this.dom[y][x]).html(this.board[y][x]);
         //}
      //}

   },

   // moves piece array into board array on touchdown
   loadBoard : function(){
      var piecelength = this.playPiece[0].length - 1;

      // iterate over entire board
      for (var y = 0; y <= piecelength; y++){
         for (var x = 1; x <= 10; x++) {
            if (this.playPiece[0][y][x] === 1){
               this.board[y][x] = 1;
            }
         }
      }
      //for debugging
      //for (var y = 0; y <= piecelength; y++){
         //for (var x = 0; x <= 11; x++) {
            //$(this.dom[y][x]).html(this.board[y][x]);
         //}
      //}
   },

   renderWaiting : function(){
      var piece = this.pieces[this.waitingPiece.name[0]]();

      for (var y = 0; y <=3; y++) {
         for (var x = 0; x <= 3; x++) {
            if (piece[0][y][x] === 1) {
               $(this.waitDom[y][x]).css('backgroundColor', '#' + this.waitingPiece.color);
            } else {
               $(this.waitDom[y][x]).css('backgroundColor', '#fff'); 
            }
         }
      }
   },

   render : function(){
      var piecelength = this.playPiece[0].length - 1;

      // iterate over entire board
      for (var y = 0; y < piecelength; y++){
         for (var x = 0; x <= 11; x++) {
            if (this.board[y][x] === 0) {
               if (this.playPiece[0][y][x] === 1){
                  $(this.dom[y][x]).css('backgroundColor', '#' + this.playPiece.color);
                  //$(this.dom[y][x-1]).html('1');
               }
               if (this.board[y][x] === 0 && this.playPiece[0][y][x] === 0) {
                  $(this.dom[y][x]).css('backgroundColor', '#fff');
                  //$(this.dom[y][x-1]).html('0');
               }
            }
         }
      }
   }
} // end of object

$(document).ready(function(){
   // dom board is 9x17 starting from 0
   // board is 11x18 starting from 0

   Array.prototype.shuffle = function() {
      var s = [];
      while (this.length) s.push(this.splice(Math.random() * this.length, 1));
      while (s.length) this.push(s.pop());
      return this;
   }	

   tetris.init();	
});

