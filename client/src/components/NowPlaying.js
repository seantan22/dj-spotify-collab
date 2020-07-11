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

const Header = styled.header`
  ${mixins.flexBetween};
  color: ${colors.white};
  h2 {
    margin: 0;
  }
`;

const Container = styled.div`
    text-align: center !important;
    align-items: center;
    margin-top: 100px;
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

const AlbumLink = styled(Link)`
`;

const BPM = styled.h1`
  margin-top: 16px;
  color: ${colors.green};
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
  &:hover {
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
  display: flex;
    justify-content: center; 
    margin-bottom: 45px;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
`;

const Filter = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

const GenreDropdown = styled.select`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  width: 250px;
  margin-left: 70px;
  padding: 5px 10px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
`;

const FilterButton = styled.input`
  background-color: ${colors.green};
  color: ${colors.white};
  border: 1px solid ${colors.green};
  border-radius: 30px;
  padding: 5px 40px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  &:focus,
  &:hover {
    background-color: ${colors.offGreen};
    cursor: pointer;
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
      genre: 'hip-hop',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({genre: e.target.value});
  }

  async handleSubmit(event) {
      event.preventDefault();
      this.getData();
  }

  
  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playingNow } = await getUserInfo();

    const playingNowFeatures = await getAudioFeaturesOfTrack(playingNow);

    const playingNowBPM = Math.round(playingNowFeatures.data.tempo);

    // Recommendation Parameters
    const genre = this.state.genre;
    const minBPM = playingNowBPM - 5;
    const maxBPM = playingNowBPM + 5;

    const recommendedTracks = await getRecommendationsBpm(genre, minBPM, maxBPM);

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
                    {/* <Brand>
                        <h1>Beat Switch</h1>
                    </Brand> */}
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
                            <AlbumLink to={`/album/${playingNow.item.album.id}`}>
                              <Album> 
                                {playingNow.item.album.name}{' '}&middot; {getYear(playingNow.item.album.release_date)}
                              </Album>
                            </AlbumLink>
                            <BPM>{playingNowBPM} BPM</BPM> 
                            {/* <PlayPauseButton onClick={this.handlePlayClick}><PlayIcon /></PlayPauseButton> */}
                        </Container>
                    ) : <Loading /> }
                </Section>
                <Section>
                  <TracklistHeading>
                      <h3>Recommended Tracks</h3>
                  </TracklistHeading>
                  <Filter onSubmit = {this.handleSubmit}>
                        <GenreDropdown value={this.state.genre} onChange={this.handleChange} >
                            <option value="acoustic">Acoustic</option>
                            <option value="afrobeat">Afrobeat</option>
                            {/* <option value="alt-rock">Alternative Rock</option> */}
                            <option value="alternative">Alternative</option>
                            {/* <option value="blues">Blues</option> */}
                            <option value="country">Country</option>
                            <option value="disco">Disco</option>
                            <option value="drum-and-bass">Drum And Base</option>
                            <option value="dubstep">Dubstep</option>
                            <option value="edm">EDM</option>
                            <option value="electronic">Electronic</option>
                            {/* <option value="funk">Funk</option>
                            <option value="grunge">Grunge</option> */}
                            <option value="hip-hop">Hip-Hop</option>
                            <option value="house">House</option>
                            <option value="indie">Indie</option>
                            {/* <option value="indie-pop">Indie-Pop</option> */}
                            <option value="jazz">Jazz</option>
                            <option value="latin">Latin</option>
                            <option value="pop">Pop</option>
                            {/* <option value="punk">Punk</option> */}
                            <option value="r-n-b">R&B</option>
                            {/* <option value="reggae">Reggae</option> */}
                            <option value="rock">Rock</option>
                            {/* <option value="soul">Soul</option> */}
                            {/* <option value="spanish">Spanish</option> */}
                            <option value="techno">Techno</option>
                        </GenreDropdown>
                        <FilterButton type="submit" value="Filter" />
                  </Filter>
                  <ul>
                      {recommendedTracks ? recommendedTracks.data.tracks.map((track, i) => <TrackItem track={track} key={i} />) : ''}
                  </ul>
                </Section>
                <Section>
                    <BPMContainer>
                        {recommendedTracksAudioFeatures ? (
                            <ul>
                                {recommendedTracksAudioFeatures.audio_features.map((track, i) => (
                                        <TrackBPM key={i}>{Math.round(track.tempo)} BPM</TrackBPM>  
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