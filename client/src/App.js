import React, { Component } from 'react';

import { token } from './spotify';

import Login from './components/Login';

export default class App extends Component {
  render() {
    return (
      <Login />
    )
  }
}