import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getUserInfo, logout } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import { UserIcon } from './icons';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;

const ProfileLabel = styled.h5`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin: 20px 0 0;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  margin: 25px;
  img {
    border-radius: 100%;
  }
`;

const UserName = styled.a`
  margin-top: 25px;
  text-align: center;
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;

const DisplayName = styled.h1`
  font-size: 40px;
  font-weight: 800;
`;

const SpotifyId = styled.h3`
  color: ${colors.lightGrey};
  font-size: 14px;
  font-weight: 800;
  text-transform: uppercase;
`;

const SocialStats = styled.div`

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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

const Text = styled.div`
  color: ${colors.white};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;

const TopTrack = styled(Link)`
  color: ${colors.white};
  font-weight: 700;
  font-size: ${fontSizes.md};
  &:hover {
    text-decoration: underline;
  }
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

export default class Profile extends Component {
  state = {
    user: '',
    following:  '',
    playlists: '',
    topArtists: '',
    topTracks: '',
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { user, following, playlists, topArtists, topTracks } = await getUserInfo();

    this.setState({
      user,
      following,
      playlists,
      topArtists,
      topTracks,
    });
  }

  render() {

    const { user, following, playlists, topArtists, topTracks } = this.state;
    const totalPlaylists = playlists ? playlists.total : 0;

    return (
      <div>
        {user ? (
          <Main>
            <Header>
              <ProfileLabel>
                Profile
              </ProfileLabel>
              <Avatar>
                {user.images.length > 0 ? (
                  <img src={user.images[0].url} alt="avatar" />
                ) : (
                    <UserIcon />
                )}
              </Avatar>
              <UserName href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <DisplayName>{user.display_name}</DisplayName>
                <SpotifyId>{user.id}</SpotifyId>
              </UserName>  
              <SocialStats>
                <Stat>
                  <Number>{user.followers.total}</Number>
                  <NumLabel>Followers</NumLabel>
                </Stat>
                <Stat>
                  <Number>{following.artists.total}</Number>
                  <NumLabel>Following</NumLabel>
                </Stat>
                <Stat>
                  <Number>{totalPlaylists}</Number>
                  <NumLabel>Playlists</NumLabel>
                </Stat>
              </SocialStats>
              <Stats>
                <Stat>
                  <TopTrack to={`/track/${topTracks.items[0].id}`}>{topTracks.items[0].name}</TopTrack>
                  <NumLabel>#1 Track</NumLabel>
                </Stat>
                <Stat>
                  <Text>{topArtists.items[0].name}</Text>
                  <NumLabel>#1 Artist</NumLabel>
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