import React, { Component } from 'react';
import { Router } from '@reach/router';
import styled from 'styled-components/macro';

import NavBar from './NavBar';
import Home from './Home';
import NowPlaying from './NowPlaying';
import Track from './Track';
import Album from './Album';
import Search from './Search';
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
          <Home path="/" />
          <NowPlaying path="now-playing" />
          <Search path="search" />
          <Profile path="profile" />
          <Track path="track/:trackId" />
          <Album path="album/:albumId" />
        </Router>
      </SiteWrapper>
    )
  }
}