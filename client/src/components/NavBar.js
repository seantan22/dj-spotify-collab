import React from 'react';
import { Link } from '@reach/router';

import { SpotifyIcon, PlayIcon, UserIcon, GitHubIcon } from  './icons/'

import styled from 'styled-components/macro';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
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
  & > * {
    width: 100%;
  }
`;

const Logo = styled.div`
  color: ${colors.green};
  margin-top: 30px;
  width: 70px;
  height: 70px;
  transition: ${theme.transition};
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
  svg {
    width: 50px;
  }
`;

const GitHub = styled.div`
  color: ${colors.lightGrey};
  width: 45px;
  height: 45px;
  margin-bottom: 30px;
  a {
    &:hover {
      color: ${colors.blue};
    }
    svg {
      width: 30px;
    }
  }
`;
const Menu = styled.ul`
  display: flex;
  flex-direction: column;
`;
const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 11px;
  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;
    }
    &:hover, &:focus {
        color: ${colors.white};
        background-color: ${colors.black};
        border-left: 5px solid ${colors.offGreen};
    }
    .active {
        color: ${colors.white};
        background-color: ${colors.black};
        border-left: 5px solid ${colors.offGreen};
        pointer-events: none;
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
                <SpotifyIcon />
        </a>
    </Logo>
    <Menu>
      <MenuItem>
        <NavLink to="/">
            <PlayIcon />
            <div>Now Playing</div>
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
  </Container>
);

export default NavBar;