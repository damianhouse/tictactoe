import React, { Component } from 'react';
import App from '../App'
class Board extends Component {
  handleClick(index) {
    console.log(this.props.state.playerOne.symbol)
    if(this.props.state.board[index] === "") {
      if(this.props.state.winner === null) {
        this.props.state.board[index] = this.props.state.currentTurn
        if(this.checkForWinner() || this.checkDraw()) {
          this.adjustScores()
        }
        this.setState({
          currentTurn: this.props.state.currentTurn === this.props.state.playerOne.symbol ? this.props.state.playerTwo.symbol : this.props.state.playerOne.symbol
        })
      }
    }
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
    let board = this.props.state.board
    return (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]]) && (board[combo[1]] !== "" && board[combo[1]] === board[combo[2]])
  }

  checkDraw() {
    var board = this.props.state.board
    return ((board[0] === 'X' || board[0] === 'O') && (board[1] === 'X' || board[1] === 'O') && (board[2] === 'X' || board[2] === 'O') &&
      (board[3] === 'X' || board[3] === 'O') && (board[4] === 'X' || board[4] === 'O') && (board[5] === 'X' || board[5] === 'O') &&
      (board[6] === 'X' || board[6] === 'O') && (board[7] === 'X' || board[7] === 'O') && (board[8] === 'X' || board[8] === 'O'))
  }

  render() {
    var state = this.props.state
    return (
      <div className="board">
        {state.board.map((cell, index) => {
          if(state.winner === null) {
              return <div key={index} onClick={() => this.handleClick(index)} className="square">
                  <div>{cell}</div>
              </div>
            } else {
              if(state.winner[0] === index || state.winner[1] === index || state.winner[2] === index) {
                return <div key={index} onClick={() => this.handleClick(index)} className="square green">
                    <div>{cell}</div>
                </div>
              } else {
                return <div key={index} onClick={() => this.handleClick(index)} className="square">
                    <div>{cell}</div>
                </div>
              }
            }
        })}
      </div>
    )
  }
}

module.exports = Board;
