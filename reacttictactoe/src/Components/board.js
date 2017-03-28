import React, { Component } from 'react';
import Square from './square'

class Board extends Component {
  handleClick(index) {
    this.props.handleClick(index)
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
    let board = this.props.state.board.map((cell, index) => {
      return <Square key={index} cell={cell} index={index} state={this.props.state} handleClick={this.handleClick.bind(this)}/>
    })
    return (
      <div key="board" className="board">
        {board}
      </div>
    )
  }
}

module.exports = Board;
