import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      gameLocked: false,

      currentTurn: "X",
      winner: null,
      gameEnded: false,
      totalMoves: 0
    }
  }

  handleClick(index) {
        if (this.state.gameEnded || this.state.gameLocked ) return;

    if (this.state.board[index] === "" ) {
      this.state.board[index] = this.state.currentTurn;
      // console.log(this.state.board[index]);
      // this.state.board[index].innerHTML = this.state.currentTurn
      this.state.currentTurn = this.state.currentTurn == 'X' ? 'O' : 'X';
      console.log(this.state.currentTurn)


      this.setState({
        board: this.state.board,
        // gameLocked: false,
        // currentTurn: this.state.currentTurn === 'X' ? 'O' : 'X',
        // winner: this.checkWinner(),
        // gameEnded: this.checkWinner(),
        // totalMoves: this.state.totalMoves++

        // totalMoves: this.state.totalMoves++
      })
      // this.state.totalMoves++;
      // console.log(this.state.totalMoves)
      // this.state.currentTurn === 'X' ? 'O' : 'X';
    }

    // if (this.checkWinner() === 'X' || this.checkWinner() === 'O') {
    //   this.state.gameEnded = true;
    //   // this.setState({
    //   //   winner: this.checkWinner()
    //   // })
    // }

    var result = this.checkWinner();

   if(result == 'X') {
     this.state.gameEnded = true;
     this.setState({
       winner: 'X',
       winnerLine: 'Match won by X'
     });
   } else if(result == 'O') {
     this.state.gameEnded = true;
     this.setState({
       winner: 'O',
       winnerLine: 'Match won by O'
     });
   } else if(result == 'draw') {
     this.state.gameEnded = true;
     this.setState({
       winner: 'draw',
       winnerLine: 'Match is drawn'
     })
   }


    if (this.state.currentTurn == 'O' && !this.state.gameEnded) {
      this.state.gameLocked = true;

      setTimeout(()=> {
        do {
          var random = Math.floor(Math.random()*9);
          // console.log(random) //max is 8
        } while(this.state.board[random] !== '');
        this.state.gameLocked = false;
        // this.handleClick(document.querySelectorAll('.square')[random]);
        this.handleClick(random);
        // console.log(document.querySelectorAll('.square')[random][index])
        // this.handleClick(random)
        // console.log(random)
      }, 1000);


    }


  }

  checkWinner() {

    var squares = this.state.board

    const WIN_COMBOS = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < WIN_COMBOS.length; i++) {
    const [a, b, c] = WIN_COMBOS[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }

    }
    // console.log(this.state.totalMoves)
    if(this.state.totalMoves == 9) {
    return;
  }



  }

  render() {
    const winner = this.checkWinner()
    let status;
    if (winner) {
      status = ""
    } else {
      status = "Current player: " + (this.state.currentTurn == "X" ? "X" : "O");
    }

    return (

        <div className="container">

          <h2 className="App-title">tic tac toe </h2>
          <div className="board">
            {this.state.board.map((cell, index) => {
              return <div onClick={() => this.handleClick(index)} className="square">{cell}</div>
            })}
          </div>
          <div className="status">
          {status}
          </div>
            {this.state.winner ? <h1 className="winner">{`The winner is ${this.state.winner}!`}</h1> : null}
        </div>
    );
  }
}

export default App;
