'use strict';

class Game {
  constructor () {
  }

  start () {
    this.board = new Board();
    this.board.createGrid();

  }

  class Board {
    this.grid = [];
    // creates an 8x8 array, filled with null values
    this.createGrid = function () {
      // loop to create the 8 rows
      for (let row = 0; row < 8; row++) {
        this.grid[row] = [];
        // push in X's (red checkers), O's (black checkers), and null's (empty spaces)
        for (let col = 0; col < 8; col++) {
          // The checkers may only be placed on cells whose col and row add to an odd number
          if (row < 3 && (row + col) % 2 !== 0) {
            this.grid[row].push('X');
          } else if (row > 4 && (row + col) % 2 !== 0) {
            this.grid[row].push('O');
          } else {
            this.grid[row].push(null);
          }
        }
      }
    }
  }

  viewGrid () {
    let string = '  0 1 2 3 4 5 6 7\n';
    for (let row = 0; row < 8; row++) {
      const rowOfCheckers = [row];
      for (let column = 0; column < 8; column++) {
        if (this.grid[row][column]) {
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          rowOfCheckers.push(' ');
        }
      }
      string += rowOfCheckers.join(' ');
      string += '\n';
    }
    console.log(string);
  }

  Checker () {
    // Your code here
  }
}

const game = new Game();
game.start();

// Tests

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getPrompt() {
  game.board.viewGrid();                     // ######################################
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);   // ######################################
      getPrompt();
    });
  });
}

if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');  // ######################################
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);      // ######################################
    });
  });

  describe('Game.moveChecker()', function () {
    it('should move a checker', function () {
      assert(!game.board.grid[4][1]);             // ######################################
      game.moveChecker('50', '41');            // ######################################
      assert(game.board.grid[4][1]);            // ######################################
      game.moveChecker('21', '30');            // ######################################
      assert(game.board.grid[3][0]);            // ######################################
      game.moveChecker('52', '43');             // ######################################
      assert(game.board.grid[4][3]);            // ######################################
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');             // ######################################
      assert(game.board.grid[5][2]);            // ######################################
      assert(!game.board.grid[4][1]);           // ######################################
      assert.equal(game.board.checkers.length, 23);   // ######################################
    });
  });
} else {
  getPrompt();
}
