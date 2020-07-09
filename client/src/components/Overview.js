import React, { Component } from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components/macro';

import NavBar from './NavBar';
import NowPlaying from './NowPlaying';
import Track from './Track';
import Profile from './Profile';

import theme from '../styles/theme';

const SiteWrapper = styled.div`
  padding-left: ${theme.navWidth};
`;

export default class Overview extends Component {
  render() {
    return (
      <SiteWrapper>
        <NavBar />
        <Router primary={false}>
          <NowPlaying path="/" />
          <Profile path="profile" />
          <Track path="track/:trackId" />
        </Router>
      </SiteWrapper>
    )
  }
}