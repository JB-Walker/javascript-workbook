'use strict';

class TicTacToe extends React.Component {

  constructor(props) {
    super(props);
    // resetState is the beginning state, before the first move has been made.
    // this.state is set to resetState and the beginning of the game and after
    // the #reset button is clicked. Code on the reset button in render.
    this.resetState = {
      turn: 'X', // Turn flips between 'X' and 'O' and represents the player's mark
      gameInPlay: true, // Starts as true. Set to false when game won. Set to true on reset.
      // if gameInPlay is false, no more marks may be placed on the board until
      // the game is reset, which toggles it back to true.
      cell0: null, // (<div data-cell="0")
      cell1: null, // (<div data-cell="1"), and so on...
      cell2: null,
      cell3: null,
      cell4: null,
      cell5: null,
      cell6: null,
      cell7: null,
      cell8: null,
      winner: null, // after game is won winner is set to the current turn
    }
    this.state = {...this.resetState};
  }

  // After a winning combination is found, gameInPlay is set to false so that no
  // more marks can be made in the remaining cells. Winner is set to the current
  // player's mark, either 'X' or 'O'.
  gameWon = (newState) => {
    newState.gameInPlay = false;
    newState.winner = newState.turn;
    return newState;
  }

  handleClick = (cell) => {
    if (!this.state[cell] && this.state.gameInPlay) {
      // create temp newState to limit renderings as many state changes are made
      let newState = {...this.state};
      // Either an 'X' or 'O' placed in cell. Turn will be toggled if no winner found
      newState[cell] = newState.turn;
      // switch will look for a win in the 8 possible winning combinations. If
      // none are found, then its default will toggle the turn.
      switch (true) {
        case (newState.cell0 === newState.turn && newState.cell1 === newState.turn && newState.cell2 === newState.turn):
          newState = this.gameWon(newState);
          break;
        case (newState.cell3 === newState.turn && newState.cell4 === newState.turn && newState.cell5 === newState.turn):
          newState = this.gameWon(newState);
          break;
        case (newState.cell6 === newState.turn && newState.cell7 === newState.turn && newState.cell8 === newState.turn):
          newState = this.gameWon(newState);
          break;
        case (newState.cell0 === newState.turn && newState.cell3 === newState.turn && newState.cell6 === newState.turn):
          newState = this.gameWon(newState);
          break;
        case (newState.cell1 === newState.turn && newState.cell4 === newState.turn && newState.cell7 === newState.turn):
          newState = this.gameWon(newState);
          break;
        case (newState.cell2 === newState.turn && newState.cell5 === newState.turn && newState.cell8 === newState.turn):
          newState = this.gameWon(newState);
          break;
        case (newState.cell0 === newState.turn && newState.cell4 === newState.turn && newState.cell8 === newState.turn):
          newState = this.gameWon(newState);
          break;
        case (newState.cell2 === newState.turn && newState.cell4 === newState.turn && newState.cell6 === newState.turn):
          newState = this.gameWon(newState);
          break;
        default:
          // the move didn't cause a win, so the turn is toggled
          newState.turn = newState.turn === 'X' ? 'O' : 'X';
      }
      // state updated after each valid move
      this.setState(newState);
    }
  };

  render() {
    return (
      <div>
        <div>
          <div className="row">
            <div data-cell="0" onClick={() => this.handleClick('cell0')}>{this.state.cell0}</div>
            <div data-cell="1" onClick={() => this.handleClick('cell1')}>{this.state.cell1}</div>
            <div data-cell="2" onClick={() => this.handleClick('cell2')}>{this.state.cell2}</div>
          </div>
          <div className="row">
            <div data-cell="3" onClick={() => this.handleClick('cell3')}>{this.state.cell3}</div>
            <div data-cell="4" onClick={() => this.handleClick('cell4')}>{this.state.cell4}</div>
            <div data-cell="5" onClick={() => this.handleClick('cell5')}>{this.state.cell5}</div>
          </div>
          <div className="row">
            <div data-cell="6" onClick={() => this.handleClick('cell6')}>{this.state.cell6}</div>
            <div data-cell="7" onClick={() => this.handleClick('cell7')}>{this.state.cell7}</div>
            <div data-cell="8" onClick={() => this.handleClick('cell8')}>{this.state.cell8}</div>
          </div>
          <div id="announce-winner">Winner: {this.state.winner}</div>
        </div>
        <button id="reset" onClick={() => this.setState(this.resetState)}>Play Again?</button>
      </div>
    );
  }
}

ReactDOM.render(<TicTacToe />, document.getElementById('tic-tac-toe'));
