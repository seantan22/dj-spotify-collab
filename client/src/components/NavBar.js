import React from 'react';
import { Link } from '@reach/router';

import { SpotifyIcon, BeatSwitchIcon, PlayIcon, UserIcon, GitHubIcon, SearchIcon } from  './icons/'

import styled from 'styled-components/macro';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import media from '../styles/media';
const { colors } = theme;

const Container = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: ${theme.navWidth};
  background-color: ${colors.navBlack};
  text-align: center;
  z-index: 99;
  ${media.tablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: ${theme.navHeight};
    height: ${theme.navHeight};
    flex-direction: row;
  `};
  & > * {
    width: 100%;
    ${media.tablet`
      height: 100%;
    `};
  }
`;

const Logo = styled.div`
  color: ${colors.red};
  margin-top: 30px;
  width: 70px;
  height: 70px;
  svg {
    width: 50px;
  }
  ${media.tablet`
    display: none;
  `}
`;

const GitHub = styled.div`
  color: ${colors.lightGrey};
  width: 45px;
  height: 45px;
  a {
    &:hover {
      color: ${colors.blue};
    }
    svg {
      width: 30px;
    }
  }
  ${media.tablet`
    display: none;
  `};
`;

const Spotify = styled.div`
  color: ${colors.green};
  width: 45px;
  height: 45px;
  margin-bottom: 30px;
  a {
    &:hover {
      color: ${colors.brightGreen};
    }
    svg {
      width: 30px;
    }
  }
  ${media.tablet`
    display: none;
  `}; 
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  ${media.tablet`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  `};
`;
const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 11px;
  ${media.tablet`
    flex-grow: 1;
    flex-basis: 100%;
    height: 100%;
  `};
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    ${media.tablet`
      ${mixins.flexCenter};
      flex-direction: column;
      padding: 0;
      border-left: 0;
      border-top: 3px solid transparent;
    `};
    }
    &:hover, &:focus {
        color: ${colors.white};
        background-color: ${colors.black};
        border-left: 5px solid ${colors.brightRed};
        ${media.tablet`
          border-left: 0px solid;
          border-top: 3px solid ${colors.brightRed};
        `};
    }
    .active {
        color: ${colors.white};
        background-color: ${colors.black};
        border-left: 5px solid ${colors.brightRed};
        pointer-events: none;
        ${media.tablet`
          border-left: 0px solid;
          border-top: 3px solid ${colors.brightRed};
        `};
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  }
`;

const isActive = ({ isCurrent }) => (isCurrent ? { className: 'active' } : null);

const NavLink = props => <Link getProps={isActive} {...props} />;

const NavBar = () => (
  <Container>
    <Logo>
        <a
            href="/"
            rel="noopener noreferrer">
                <BeatSwitchIcon />
        </a>
    </Logo>
    <Menu>
      <MenuItem>
        <NavLink to="now-playing">
            <PlayIcon />
            <div>Now Playing</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="search">
            <SearchIcon />
            <div>Search</div>
        </NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="profile">
            <UserIcon />
            <div>Profile</div>
        </NavLink>
      </MenuItem>
    </Menu>
    <GitHub>
      <a
        href="https://github.com/seantan22/dj-spotify-collab"
        target="_blank"
        rel="noopener noreferrer">
            <GitHubIcon />
      </a>
    </GitHub>
    <Spotify>
      <a
        href="https://developer.spotify.com/documentation/web-api/"
        target="_blank"
        rel="noopener noreferrer">
            <SpotifyIcon />
      </a>
    </Spotify>
  </Container>
);

export default NavBar;