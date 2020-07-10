import React, { Component } from 'react';
import { Link } from '@reach/router';

import { getUserInfo, getAudioFeaturesOfTrack, getRecommendationsBpm, getAudioFeaturesOfTracksRecs } from '../spotify';
import { catchErrors, getYear } from '../utils';

import { PlayIcon } from  './icons/'

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import Loading from './Loading';
import TrackItem from '../styles/TrackItem';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
const { colors, fontSizes } = theme;

const Brand = styled.header`
  ${mixins.flexBetween};
  color: ${colors.white};
  h1 {
      font-size: 50px;
  }
`;

const Header = styled.header`
  ${mixins.flexCenter};
  color: ${colors.lightGrey};
  margin-top: 1vw;
`;

const Container = styled.div`
    text-align: center !important;
    align-items: center;
`;

const Overview = styled.section`
  display: grid;
  grid-template-columns: 7fr 6fr 1fr;
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
  &:hover {
    text-decoration: underline;
  }
`;

const TitleLink = styled(Link)`
`;

const BPM = styled.h1`
  margin-top: 16px;
  color: ${colors.offGreen};
  font-size: 25px;
  font-style: italic;
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
    margin-top: 99px;
`;

const TrackBPM = styled.div`
    margin-bottom: 45px;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
`;

const Buttons = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 5px;
  width: 100%;
`;

const GenreOnButton = styled.a`
  background-color: ${colors.white};
  color: ${colors.black};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  padding: 5px 16px;
  margin-bottom: 20px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:focus {
    background-color: transparent;
    color: ${colors.white};
  }
`;
const GenreOffButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  padding: 5px 16px;
  margin-bottom: 20px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:focus {
    background-color: transparent;
    color: ${colors.white};
  }
`;

const FilterButton = styled.a`
  background-color: ${colors.green};
  color: ${colors.white};
  border: 1px solid ${colors.green};
  border-radius: 30px;
  padding: 5px 40px;
  margin-bottom: 20px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:focus,
  &:hover {
    background-color: ${colors.offGreen};
    color: ${colors.white};
  }
`;

const PlayPauseButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 100%;
  padding: 10px 8px 10px 12px;
  d-flex: block;
  justify-content: center;
  text-align: center;
  &:hover {
    background-color: transparent;
    color: ${colors.white};
    border: 2px solid ${colors.white};
  }
`;

export default class NowPlaying extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingNow: '',
      playingNowBPM: '',
      recommendedTracks: '',
      recommendedTracksAudioFeatures: '',
      genres: 'hip-hop,r-n-b,house,pop,edm',
      hipHop: true,
      rnb: true,
      house: true,
      pop: true,
      edm: true,
    };
    this.toggleHipHop = this.toggleHipHop.bind(this);
    this.toggleRnB = this.toggleRnB.bind(this);
    this.toggleHouse = this.toggleHouse.bind(this);
    this.togglePop = this.togglePop.bind(this);
    this.toggleEDM = this.toggleEDM.bind(this);
  }
  
  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playingNow } = await getUserInfo();

    const playingNowFeatures = await getAudioFeaturesOfTrack(playingNow);

    const playingNowBPM = Math.round(playingNowFeatures.data.tempo);

    // Recommendation Parameters
    const genres = 'hip-hop,r-n-b,house,pop,edm';
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

  toggleHipHop(e) {
    e.preventDefault();
    this.setState(prevState => ({
      hipHop: !prevState.hipHop,
    }));
    if(this.state.genres === '' && this.state.hipHop) {
      this.setState({
        genres: this.state.genres + 'hip-hop',
      })
    } else if (this.state.genres !== '' && this.state.hipHop) {
      this.setState({
        genres: this.state.genres + ',hip-hop',
      })
    } else if (this.state.genres === '' && !this.state.hipHop) {
      return;
    } else if (this.state.genres !== '' && !this.state.hipHop) {
      this.setState({
        genres: (this.state.genres.replace(/hip-hop/g,'')).replace(/,\s*$/, "").replace(/^\s*,/, ""),
      })
    };
    console.log(this.state.genres);
  }

  toggleRnB(e) {
    e.preventDefault();
    this.setState(prevState => ({
      rnb: !prevState.rnb,
    }));
    if(this.state.genres === '' && this.state.rnb) {
      this.setState({
        genres: this.state.genres + 'r-n-b',
      })
    } else if (this.state.genres !== '' && this.state.rnb) {
      this.setState({
        genres: this.state.genres + ',r-n-b',
      })
    } else if (this.state.genres === '' && !this.state.rnb) {
      return;
    } else if (this.state.genres !== '' && !this.state.rnb) {
      this.setState({
        genres: (this.state.genres.replace(/r-n-b/g,'')).replace(/,\s*$/, "").replace(/^\s*,/, ""),
      })
    };
    console.log(this.state.genres);
  }

  toggleHouse(e) {
    e.preventDefault();
    this.setState(prevState => ({
      house: !prevState.house,
    }));
  }
  togglePop(e) {
    e.preventDefault();
    this.setState(prevState => ({
      pop: !prevState.pop,
    }));
  }
  toggleEDM(e) {
    e.preventDefault();
    this.setState(prevState => ({
      edm: !prevState.edm,
    }));
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
                            <TitleLink to={`/track/${playingNow.item.id}`}>
                              <Title>{playingNow.item.name}</Title> 
                            </TitleLink>
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
                              {playingNow.item.album.name}{' '}&middot; {getYear(playingNow.item.album.release_date)}
                            </Album>
                            <BPM>{playingNowBPM} BPM</BPM> 
                            {/* <PlayPauseButton onClick={this.handlePlayClick}><PlayIcon /></PlayPauseButton> */}
                        </Container>
                    ) : <Loading /> }
                </Section>
                <Section>
                  <TracklistHeading>
                      <h3>Matched Tracks</h3>
                  </TracklistHeading>
                  <Buttons>
                    {this.state.hipHop?
                      <GenreOnButton onClick={(e) => {this.toggleHipHop(e)}}> Rap </GenreOnButton>: 
                      <GenreOffButton onClick={(e) => {this.toggleHipHop(e)}}> Rap </GenreOffButton>}
                    {this.state.rnb?
                      <GenreOnButton onClick={(e) => {this.toggleRnB(e)}}> R&B </GenreOnButton>: 
                      <GenreOffButton onClick={(e) => {this.toggleRnB(e)}}> R&B </GenreOffButton>}
                    {this.state.house?
                      <GenreOnButton onClick={(e) => {this.toggleHouse(e)}}> House </GenreOnButton>: 
                      <GenreOffButton onClick={(e) => {this.toggleHouse(e)}}> House </GenreOffButton>}
                    {this.state.pop?
                      <GenreOnButton onClick={(e) => {this.togglePop(e)}}> Pop </GenreOnButton>: 
                      <GenreOffButton onClick={(e) => {this.togglePop(e)}}> Pop </GenreOffButton>}
                    {this.state.edm?
                      <GenreOnButton onClick={(e) => {this.toggleEDM(e)}}> EDM </GenreOnButton>: 
                      <GenreOffButton onClick={(e) => {this.toggleEDM(e)}}> EDM </GenreOffButton>}
                    <FilterButton> Filter </FilterButton>
                  </Buttons>
                  <ul>
                      {recommendedTracks ? recommendedTracks.data.tracks.map((track, i) => <TrackItem track={track} key={i} />) : ''}
                  </ul>
                </Section>
                <Section>
                    <BPMContainer>
                        {recommendedTracksAudioFeatures ? (
                            <ul>
                                {recommendedTracksAudioFeatures.audio_features.map((index, i) => (
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