import React, { Component } from 'react';

import { getUserInfo, logout } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import media from '../styles/media';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;

const Name = styled.h1`
  font-size: 40px;
  font-weight: 800;
  text-transform: uppercase;
  margin: 20px 0 0;
  ${media.tablet`
    font-size: 40px;
  `};
  ${media.phablet`
    font-size: 8vw;
  `};
`;

const SocialStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;
const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;
const Stat = styled.div`
  text-align: center;
`;

const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;
const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;

const LogoutButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

export default class User extends Component {
  state = {
    user: '',
    following:  '',
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { user, following } = await getUserInfo();

    this.setState({
      user,
      following,
    });
  }

  render() {
    const { user, following } = this.state;
    return (
      <div>
        {user ? (
          <Main>
            <Header>
              <Name>{user.display_name}</Name>
              <SocialStats>
                <Stat>
                  <Number>{user.followers.total}</Number>
                  <NumLabel>Followers</NumLabel>
                </Stat>
                <Stat>
                  <Number>{following.artists.total}</Number>
                  <NumLabel>Following</NumLabel>
                </Stat>
              </SocialStats>
              <Stats>
                <Stat>
                  <Number>123 BPM </Number>
                  <NumLabel>Average Tempo</NumLabel>
                </Stat>
                <Stat>
                  <Number> 110% </Number>
                  <NumLabel>Average Energy</NumLabel>
                </Stat>
                <Stat>
                  <Number> Professional </Number>
                  <NumLabel>Average Danceability</NumLabel>
                </Stat>
              </Stats>
              <LogoutButton onClick={logout}>Logout</LogoutButton>
            </Header>
          </Main>
        ): ''}
      </div> 
    )
  }
}