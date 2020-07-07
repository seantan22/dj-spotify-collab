import React, { Component } from 'react';

import { logout } from '../spotify';

export default class User extends Component {
  render() {
    return (
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    )
  }
}