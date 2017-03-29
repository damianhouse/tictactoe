import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Square from './Components/square'
import Scores from './Components/scores'
import {mount, render, shallow} from 'enzyme'
import sinon from 'sinon'
import expect from 'expect'

describe('<App />', () => {
  it('renders without exploding', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  it('componentWillMount correctly sets state', () => {
    const wrapper = mount(<App />);
    expect(wrapper.state().draws).toEqual(0);
  });

  it('checkDraw returns true and false', () => {
    const board = ["X", "O", "X", "X", "X", "O", "O", "X", "O"];
    const wrapper = mount(<App />);
    expect(wrapper.instance().checkDraw()).toEqual(false);
    wrapper.state().board = board;
    expect(wrapper.instance().checkDraw()).toEqual(true);
  });

  it('checkForWinner returns true and false', () => {
    const board = ["X", "O", "", "", "X", "O", "", "", "X"];
    const wrapper = mount(<App />);
    expect(wrapper.instance().checkForWinner()).toEqual(undefined);
    wrapper.state().board = board;
    expect(wrapper.instance().checkForWinner()).toEqual([ 0, 4, 8 ]);
  });

  it('boardHasCombo returns true and false', () => {
    const board = ["X", "O", "", "", "X", "O", "", "", "X"];
    const wrapper = mount(<App />);
    expect(wrapper.instance().boardHasCombo([ 0, 4, 8 ])).toEqual(false);
    wrapper.state().board = board;
    expect(wrapper.instance().boardHasCombo([ 0, 4, 8 ])).toEqual(true);
  });

  it('adjustScores updates state.draws', () => {
    const wrapper = mount(<App />);
    wrapper.instance().adjustScores();
    expect(wrapper.state().draws).toEqual(1);
  });

  it('adjustScores updates state.playerOne.wins', () => {
    const board = ["X", "O", "", "", "X", "O", "", "", "X"];
    const wrapper = mount(<App />);
    wrapper.state().board = board;
    wrapper.state().winner = [ 0, 4, 8 ];
    wrapper.instance().adjustScores();
    expect(wrapper.state().playerOne.wins).toEqual(1);
  });

  it('adjustScores updates state.playerOne.wins', () => {
    const board = ["X", "O", "", "", "X", "O", "", "", "X"];
    const wrapper = mount(<App />);
    wrapper.state().board = board;
    wrapper.state().winner = [ 0, 4, 8 ];
    wrapper.instance().adjustScores();
    expect(wrapper.state().playerOne.wins).toEqual(1);
  });
})

describe('<Scores />', () => {
  it('renders the scores correctly', () => {
    const props = {
      playerOne: {
        wins: 20
      },
      playerTwo: {
        wins: 15
      },
      draws: 9
    };
    const wrapper = shallow(<Scores state={props} />);
    expect(wrapper.text()).toEqual('Player X: 20Draws: 9Player O: 15');
  });
})

describe('<Board />', () => {
  it('renders the board', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("board"));
  });

  it('renders the 9 squares', () => {
    expect(mount(<App />).find('.square').length).toEqual(9);
  });
})

describe('<Square />', () => {
  it('renders the X', () => {
    const props = {
      currentTurn: 'X',
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      winner: null
    };
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Square handleClick={onButtonClick} state={props} cell={'X'} index={1}/>);
    wrapper.find('.square').simulate('click');
    expect(onButtonClick.calledOnce).toEqual(true);
    expect(wrapper.text()).toEqual('X');
  });

  it('a user cannot select a taken square', () => {
    const props = {
        playerOne: {
          symbol: 'X',
          wins: 0,
        },
        playerTwo: {
          symbol: 'O',
          wins: 0,
        },
        currentTurn: 'O',
        board: [
          "X", "", "", "", "", "", "", "", ""
        ],
        draws: 0,
        winner: null
    }
    const onButtonClick = sinon.spy();
    const wrapper = mount(<Square handleClick={onButtonClick} state={props} cell={'X'} index={1}/>);
    wrapper.find('.square').simulate('click');
    expect(onButtonClick.calledOnce).toEqual(true);
    expect(wrapper.text()).toEqual('X');
    expect(wrapper.props().state.currentTurn).toEqual('O');
  });

  it('when a user selects a taken square currentTurn doesnt change ', () => {
    const props = {
        playerOne: {
          symbol: 'X',
          wins: 0,
        },
        playerTwo: {
          symbol: 'O',
          wins: 0,
        },
        currentTurn: 'O',
        board: [
          "X", "", "", "", "", "", "", "", ""
        ],
        draws: 0,
        winner: null
    }
    const onButtonClick = sinon.spy();
    const wrapper = mount(<Square handleClick={onButtonClick} state={props} cell={'X'} index={1}/>);
    wrapper.find('.square').simulate('click');
    expect(onButtonClick.calledOnce).toEqual(true);
    expect(wrapper.props().state.currentTurn).toEqual('O');
  });
})
