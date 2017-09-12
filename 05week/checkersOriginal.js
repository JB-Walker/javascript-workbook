'use strict';

function Game () {
  this.board = new Board();

  this.start = function () {
    this.board.createGrid();
    this.board.addPieces();

  };

  this.moveChecker = function (fromHere, toHere) {

  }
}

// This function object does...
function Board () {
  this.grid = [];
  this.constructor = {
    name: 'Board',
    whiteSquare: '\u2B1C',  // Unicode 25A1 is a white sqaure symbol
    blackSquare: '\u2B1B',  // Unicode 25A0 is a black sqaure symbol
    whiteChecker: '\u26C0', // Unicode 26C0 is a white checker symbol
    blackChecker: '\u26C2'  // Unicode 26C2 is a black checker symbol
  };

  // The createGrid function creates an 8x8 Checker Board array,
  // filled with alternating black and white squares.
  this.createGrid = function () {
    // A booleen flag is used to flip between colors.
    let flag = true;
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      for (let column = 0; column < 8; column++) {
        if (flag) {
          this.grid[row].push(this.constructor.blackSquare);
          flag = !flag;
        } else {
          switch (true) {
            case row <= 2:
              this.grid[row].push(this.constructor.blackChecker);
              break;
            case row <= 4:
              this.grid[row].push(this.constructor.whiteSquare);
              break;
            default:
              this.grid[row].push(this.constructor.whiteChecker);
          }
          flag = !flag;
        }
      }
      flag = !flag;
    }
  };

  this.addPieces = function () {
    // add the X's and O's
  }

  // prints out the board
  this.viewGrid = function () {
    // add our column numbers
    let string = '%c  0 1 2 3 4 5 6 7\n';
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column]);
          //rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          // rowOfCheckers.push('\u2B1B');
          // rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += '\n';
    }
    console.log(string,"background-color:blue; color:red; font-size:large;");
  };

  this.checkers = function () {
    // not sure what. is used in test
  }

}

function Checker () {
  // Your code here
}



const game = new Game();
game.start();
game.board.viewGrid();

// Tests
/*******
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}
*******/
