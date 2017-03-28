import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {mount, render, shallow} from 'enzyme'
import {sinon} from 'sinon'
import expect from 'expect'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders the board', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find("board"));
});

it('renders the 64 squares', () => {
  expect(mount(<App />).find('.square').length).to.equal(64);
});
