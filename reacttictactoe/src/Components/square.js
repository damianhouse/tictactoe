import React, { Component } from 'react';

class Square extends Component {
  handleClick(index) {
    this.props.handleClick(index)
  }

  render() {
    let state = this.props.state
    if(state.winner === null) {
      return <div onClick={this.handleClick.bind(this, this.props.index)} className="square">
          <div>{this.props.cell}</div>
      </div>
    } else {
      if(state.winner[0] === this.props.index || state.winner[1] === this.props.index || state.winner[2] === this.props.index) {
        return <div onClick={this.handleClick.bind(this, this.props.index)} className="square green">
            <div>{this.props.cell}</div>
        </div>
      } else {
        return <div onClick={this.handleClick.bind(this, this.props.index)} className="square">
            <div>{this.props.cell}</div>
        </div>
      }
    }
  }
}

module.exports = Square;
