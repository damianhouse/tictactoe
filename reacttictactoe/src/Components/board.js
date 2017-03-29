import React, { Component } from 'react';
import Square from './square'

class Board extends Component {
  handleClick(index) {
    this.props.handleClick(index)
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
