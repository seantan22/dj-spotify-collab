import React, { Component } from 'react';

import User from '../components/User';

export default class Profile extends Component {
  render() {
    return (
      <div>
        Tempotify
        <br/>
        <br/>
        When mixing music, a talented DJ will creatively fuse together song after song by executing technical transitions. These transitions take into account a variety of track characteristics, the most important being tempo. A general rule when choosing the next track is to stay within ±5 beats per minute of the previous track. This allows a DJ to smoothly blend two songs together without drawing too much attention from the audience.  Tempotify helps DJs identify songs that are similar in tempo so that they can build electric tracklists to keep the crowd on their feet.
        <User />
      </div>
    )
  }
}