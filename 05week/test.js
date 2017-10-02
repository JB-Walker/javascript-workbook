
  game.board.viewGrid();
  game.moveChecker(whichPiece, toWhere);
      assert.equal(game.board.constructor.name, 'Board');
      assert.equal(game.board.checkers.length, 24);
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');            // ######################################
      assert(game.board.grid[4][1]);            // ######################################
      game.moveChecker('21', '30');            // ######################################
      assert(game.board.grid[3][0]);            // ######################################
      game.moveChecker('52', '43');             // ######################################
      assert(game.board.grid[4][3]);            // ######################################
      game.moveChecker('30', '52');             // ######################################
      assert(game.board.grid[5][2]);            // ######################################
      assert(!game.board.grid[4][1]);           // ######################################
      assert.equal(game.board.checkers.length, 23);   // ######################################
