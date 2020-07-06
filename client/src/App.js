import React, { Component } from 'react';

import { token } from './spotify';

import Login from './components/Login';
import Profile from './components/Profile';

export default class App extends Component {
  state = {
    token: '',
  };

  componentDidMount() {
    this.setState({ token });
  }

  render() {
    const { token } = this.state;

    return (
      <div>
        {token ? <Profile /> : <Login /> }
      </div> 
    )
  }
}