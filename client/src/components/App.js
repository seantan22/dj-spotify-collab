import React, { Component } from 'react';

import { token } from '../spotify';

import Login from './Login';
import Profile from './Profile';

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