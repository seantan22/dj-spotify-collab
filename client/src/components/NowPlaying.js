import React, { Component } from 'react';

import { getUserInfo, getAudioFeaturesOfTrack, getRecommendationsBpm, getAudioFeaturesOfTracksRecs } from '../spotify';
import { catchErrors, getYear } from '../utils';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import Loading from './Loading';
import TrackItem from '../styles/TrackItem';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
const { colors, fontSizes } = theme;

const Brand = styled.header`
  ${mixins.flexBetween};
  h1 {
      font-size: 50px;
  }
`;

const Header = styled.header`
  ${mixins.flexCenter};
  margin-top: 3vw;
`;

const Container = styled.div`
    text-align: center !important;
    align-items: center;
`;

const Overview = styled.section`
  display: grid;
  grid-template-columns: 4fr 4fr 1fr;
  grid-gap: 10px;
  width: 100%;
`;

const Section = styled.div`
  margin: 0px;
`;

const TracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 20px;
  h3 {
    display: inline-block;
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 30px;
  margin: 0 0 5px;
`;

const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
`;

const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
  a:hover {
      text-decoration: underline;
  }
`;

const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 200px;
  margin-top: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const BPMContainer = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-gap: 10px;
    margin-top: 52px;
`;

const TrackBPM = styled.div`
    margin-bottom: 45px;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
`;

export default class NowPlaying extends Component {
  state = {
    playingNow: '',
    playingNowBPM: '',
    recommendedTracks: '',
    recommendedTracksAudioFeatures: '',
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playingNow } = await getUserInfo();

    const playingNowFeatures = await getAudioFeaturesOfTrack(playingNow);

    const playingNowBPM = Math.round(playingNowFeatures.data.tempo);

    // Recommendation Parameters
    const genres = 'hip-hop,house,r-n-b,edm';
    const minBPM = playingNowBPM - 5;
    const maxBPM = playingNowBPM + 5;

    const recommendedTracks = await getRecommendationsBpm(genres, minBPM, maxBPM);

    const recommendedTracksAudioFeatures = await getAudioFeaturesOfTracksRecs(recommendedTracks);
    
    this.setState({
      playingNow,
      playingNowBPM,
      recommendedTracks,
      recommendedTracksAudioFeatures: recommendedTracksAudioFeatures.data,
    });
  }

  render() {
    const { playingNow, playingNowBPM, recommendedTracks, recommendedTracksAudioFeatures } = this.state;
    return (
        <Main>
            <Overview>
                <Section>
                    <Brand>
                        <h1>Beat Switch</h1>
                    </Brand>
                    <Header>
                        <h2>Now Playing</h2>
                    </Header>
                    {playingNow ? (
                        <Container>
                            <Artwork>
                                <img src={playingNow.item.album.images[0].url} alt="Album Artwork"/> 
                            </Artwork>
                            <br/>
                            <br/>
                            <Title>{playingNow.item.name}</Title> 
                            <ArtistName>
                                {playingNow.item.artists &&
                                    playingNow.item.artists.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {playingNow.item.artists.length > 0 && i === playingNow.item.artists.length - 1 ? '' : ','}
                                        &nbsp;
                                    </span>
                                ))}
                            </ArtistName>
                            <Album>
                                <a
                                    href={playingNow.item.album.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer">
                                    {playingNow.item.album.name}
                                </a>{' '}
                                &middot; {getYear(playingNow.item.album.release_date)}
                            </Album>
                            <br/>
                            <Title>{playingNowBPM} BPM</Title> 
                        </Container>
                    ) : <Loading /> }
                </Section>
                <Section>
                    <TracklistHeading>
                        <h3>Matched Tracks</h3>
                    </TracklistHeading>
                    <ul>
                        {recommendedTracks ? recommendedTracks.data.tracks.splice(0, 10).map((track, i) => <TrackItem track={track} key={i} />) : ''}
                    </ul>
                </Section>
                <Section>
                    <BPMContainer>
                        {recommendedTracksAudioFeatures ? (
                            <ul>
                                {recommendedTracksAudioFeatures.audio_features.splice(0, 10).map((index, i) => (
                                        <TrackBPM key={i}>{Math.round(index.tempo)} BPM</TrackBPM>  
                            ))}
                            </ul>
                        ) : '' }
                    </BPMContainer>
                </Section>
            </Overview>
        </Main>
    )
  }
}