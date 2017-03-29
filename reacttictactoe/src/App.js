import React, { Component } from 'react'
import './App.css';
import Board from './Components/board'
import Scores from './Components/scores'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    this.setState({
        playerOne: {
          symbol: 'X',
          wins: 0,
        },
        playerTwo: {
          symbol: 'O',
          wins: 0,
        },
        currentTurn: 'X',
        board: [
          "", "", "", "", "", "", "", "", ""
        ],
        draws: 0,
        winner: null
    })
  }
  checkForWinner() {
    let winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    return winningCombos.find((combo) => {
      if(this.boardHasCombo(combo)) {
        this.updateWinner(combo)
        return true
      } else {
        return false
      }
    })
  }

  boardHasCombo(combo) {
    let board = this.state.board
    return (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]]) && (board[combo[1]] !== "" && board[combo[1]] === board[combo[2]])
  }

  checkDraw() {
    var board = this.state.board
    return ((board[0] === 'X' || board[0] === 'O') && (board[1] === 'X' || board[1] === 'O') && (board[2] === 'X' || board[2] === 'O') &&
      (board[3] === 'X' || board[3] === 'O') && (board[4] === 'X' || board[4] === 'O') && (board[5] === 'X' || board[5] === 'O') &&
      (board[6] === 'X' || board[6] === 'O') && (board[7] === 'X' || board[7] === 'O') && (board[8] === 'X' || board[8] === 'O'))
  }

  adjustScores() {
    let state = this.state
    if(state.winner === null) {
      let numOfDraws = state.draws + 1
      this.setState({
        draws: numOfDraws
      })
    } else if(state.board[state.winner[0]] === state.playerOne.symbol) {
      let playerOneWins = state.playerOne.wins + 1
      this.setState({
        playerOne: {
          wins: playerOneWins
        }
      })
    } else if(state.board[state.winner[0]] === state.playerTwo.symbol) {
      let playerTwoWins = state.playerTwo.wins + 1
      this.setState({
        playerTwo: {
          wins: playerTwoWins
        }
      })
    }
  }

  updateWinner(winner) {
    this.state.winner = winner
  }

  resetMatchState() {
    var playerOneWins = this.state.playerOne.wins
    var playerTwoWins = this.state.playerTwo.wins
    var draws = this.state.draws
    this.setState({
      playerOne: {
        symbol: 'X',
        wins: playerOneWins
      },
      playerTwo: {
        symbol: 'O',
        wins: playerTwoWins
      },
      currentTurn: 'X',
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      winner: null,
      draws: draws
    })
  }

  handleClick(index) {
    if(this.state.board[index] === "") {
      if(this.state.winner === null) {
        let board = this.state.board
        board[index] = this.state.currentTurn
        this.setState({
          board: board
        })
        if(this.checkForWinner() || this.checkDraw()) {
          this.adjustScores()
        }
        this.setState({
          currentTurn: this.state.currentTurn === this.state.playerOne.symbol ? this.state.playerTwo.symbol : this.state.playerOne.symbol
        })
      }
    }
  }

  render() {
    return (
      <div className="render-target">
        <div className="header">Tic Tac Toe</div>
        <Scores state={this.state} />
        <button className="button" onClick={() => this.componentWillMount()}>Restart Game</button>
        <Board state={this.state} handleClick={this.handleClick.bind(this)}/>
        <button className="button" onClick={() => this.resetMatchState()}>Restart Match</button>
      </div>
    );
  }
}

export default App;
