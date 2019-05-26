import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//modified the Square Class to be a function.
function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares:Array(9).fill(null),
        //set the first move to be 'X' by default by modifying the initial state in our
        //Board constructor
        xIsNext: true,
        //each time a player moves, xIsNext(boolean) is flipped to determine which player goes
        //next and the game's state will be saved
      };
    }
    //handle click event. the state of the square is stored in the board component instead of the square components
    //since the square component no longer maintaine state the square components receives values from the board component
    //and inform the board component where then they are clicked
    // the board has full control over the square components
    handleClick(i) {
      const squares = this.state.squares.slice();
      //slice() is called to create a copy of the square array so to avoid modifying the existing array
      //update handleClick function to flip the value of xIsNext
      //X's and O's can now take turns

      //return early by ignoring a click if someone has won a game or if the board has been filled
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X': 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
      });
    }
    renderSquare(i) {
      return (
        <Square value={this.state.squares[i]}
          onClick={() => this.handleClick(i)}
         />
      );
    }
  
    render() {
      //display which player has the next turn
      //const status = 'Next player: ' +(this.state.xIsNext ? 'X': 'O');
      const winner = calculateWinner(this.state.squares);
      let status;
      if(winner){
        status = 'Winner: ' + winner;

      } else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X': 'O');
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    //the game component needs to display a list of past moves
    //it will need tp access the history to do that
    constructor(props) {
      super(props);
      this.state = {
        history :[{
          squares : Array(9).fill(null),
        }],
        xIsNext: true,
      };
    }
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  //Know when the game is won and there are no more turns to make
  function calculateWinner(squares){
    const lines =[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i=0; i < lines.length; i++) {
      const [a, b,c] =lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] ===squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  //given an array of 9 squares, this function will check for a winner and return 'X, O or null'
  