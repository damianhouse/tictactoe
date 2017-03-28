import React, { Component } from 'react';
import App from '../App'

class Square extends Component {
  _buildSquare() {
    return ( <div key={this.props.index} onClick={() => this.handleClick(this.props.index)} className="square">
            <div>{this.props.cell}</div>
        </div>
      )
  }

  render() {
     return (<div key={this.props.index} onClick={() => this.handleClick(this.props.index)} className="square">
             <div>{this.props.cell}</div>
         </div>)
  }
}

module.exports = Square;
