import React, { Component } from 'react';

class Scores extends Component {
  render() {
    let state = this.props.state
    return (
      <div className="scores">
        <div className="score">Player X: {state.playerOne.wins}</div>
        <div className="score">Draws: {state.draws}</div>
        <div className="score">Player O: {state.playerTwo.wins}</div>
      </div>
    )
  }
}

module.exports = Scores;
