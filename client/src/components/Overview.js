import React, { Component } from 'react';
import User from './User';
import NowPlaying from './NowPlaying';

export default class Overview extends Component {
  render() {
    return (
      <div>
        <NowPlaying />
        <User />
        <br/>
      </div>
    )
  }
}