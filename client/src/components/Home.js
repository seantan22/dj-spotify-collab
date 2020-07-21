import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getUserInfo } from '../spotify';
import { catchErrors } from '../utils';
import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import media from '../styles/media';
const { colors } = theme;

const Brand = styled.header`
    display: block;
    justify-content: center;
    align-items: flex-end;
    h1 {
        font-size: 80px;
        color: ${colors.white};
        ${media.tablet`
            display: flex;
            justify-content: center;
            font-size: 40px;
        `};
    }
    h2 {
        color: ${colors.lightGrey};
        margin-bottom: 0px;
        ${media.tablet`
            display: flex;
            justify-content: center;
            font-size: 20px;
        `};
    }
    
`;

const FeatureLink = styled(Link)`
    h2:hover {
        text-decoration: underline;
    }
`;

const Feature = styled.div`
    margin-top: 40px;
    margin-right: 100px;
    ${media.tablet`
        margin-top: 20px;
        margin-right: 0px;
    `};
    h2 {
        font-weight: 700;
        ${media.tablet`
            display: flex;
            justify-content: center;
        `};
    }
    h3 {
        font-weight: 600;
        color: ${colors.lightGrey};
        ${media.tablet`
            display: flex;
            justify-content: center;
            font-size: 16px;
        `};
    }
`;

export default class Home extends Component {
    state = {
        topTracks: '',
      };
    
    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const { topTracks } = await getUserInfo();
        this.setState({
            topTracks
        });
    }

  render() {
    const { topTracks } = this.state;
    return (
      <Main>
            <Brand>
                <h2>This is </h2>
                <h1>Beat Switch</h1>
            </Brand>
                <FeatureLink to='/now-playing'>
                    <Feature>
                        <h2>Now Playing</h2>
                        <h3>Get the BPM of the currently playing song and receive song recommendations based on tempo, genre, popularity and key.</h3>
                    </Feature>
                </FeatureLink>
                <FeatureLink to='/search'>
                    <Feature>
                        <h2>Search</h2>
                        <h3>Type in a BPM of your choice and receive a list of songs within 5 BPM.</h3>
                    </Feature>
                </FeatureLink>
                <FeatureLink to='/profile'>
                    <Feature>
                        <h2>Profile</h2>
                        <h3>View Spotify profile statistics like your #1 played song.</h3>
                    </Feature>
                </FeatureLink>
                {topTracks ?
                    <FeatureLink to={`/track/${topTracks.items[0].id}`}>
                        <Feature>
                            <h2>Additional Features</h2>
                            <h3>Click on any song or album to view in-depth metrics like popularity and energy level.</h3>
                        </Feature>
                    </FeatureLink>
                    :
                    <Feature>
                        <h2>Additional Features</h2>
                        <h3>Click on any song or album to view in-depth metrics like popularity and energy level.</h3>
                    </Feature>
                }
      </Main> 
    )
  }
}