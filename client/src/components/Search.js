import React, { Component } from 'react';
import { getRecommendationsBpm, getAudioFeaturesOfTracksRecs } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import media from '../styles/media';
import TrackItem from '../styles/TrackItem';
const { colors, fontSizes } = theme;

const Header = styled.header`
  display: block;
  align-items: center;
  h2 {
    margin: 0;
  }
`;

const Filter = styled.form`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  ${media.tablet`
    display: block;
  `};
`;

const GenreLabel = styled.div`
  margin-right: 5px;
  ${media.tablet`
  margin-top: 20px;
`};
`;
const PopularityLabel = styled.div`
  margin-right: 5px;
`;
const KeyLabel = styled.div`
  margin-right: 5px;
`;
const TempoLabel = styled.div`
  margin-right: 5px;
`;

const GenreDropdown = styled.select`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  height: 35px;
  width: 180px;
  margin-right: 10px;
  padding: 5px 10px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  ${media.tablet`
    margin-bottom: 5px;
  `};
`;

const PopularityDropdown = styled.select`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  height: 35px;
  width: 100px;
  margin-left: 0px;
  margin-right: 10px;
  padding: 5px 10px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  ${media.tablet`
    margin-bottom: 5px;
  `};
`;

const KeyDropdown = styled.select`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  width: 75px;
  height: 35px;
  margin-right: 20px;
  padding: 5px 10px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
  ${media.tablet`
    margin-bottom: 5px;
  `};
`;

const Input = styled.input`
    display: inline-block;
    font-weight: 700;
    font-size: ${fontSizes.sm};
    letter-spacing: 1px;
    border: 1px solid ${colors.white};
    border-radius: 50px;
    padding: 6px 20px;
    width: 100px;
    text-align: center;
    margin-right: 40px;
    ${media.tablet`
    display: block;
  `};
`;

const Overview = styled.section`
  display: grid;
  grid-template-columns: 9fr 1fr;
  grid-gap: 10px;
  width: 100%;
  margin-top: 50px;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
`;

const BPMContainer = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-gap: 10px;
    margin-top: 10px;
`;

const TrackBPM = styled.div`
    display: flex;
    justify-content: center;  
    margin-bottom: 45px;
    color: ${colors.lightGrey};
    font-size: ${fontSizes.xs};
    ${media.tablet`
    margin-bottom: 30px;
  `};
`;

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            genre: 'hip-hop',
            targetPop: '90',
            targetKey: '0',
            targetBPM: null,
        };

        
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.handleChangePopularity = this.handleChangePopularity.bind(this);
        this.handleChangeKey = this.handleChangeKey.bind(this);
        this.handleChangeBPM = this.handleChangeBPM.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeGenre(e) {
        this.setState({genre: e.target.value});
    }
    handleChangePopularity(e) {
      this.setState({targetPop: e.target.value});
    }
    handleChangeKey(e) {
      this.setState({targetKey: e.target.value});
    }
    handleChangeBPM(e) {
        this.setState({targetBPM: e.target.value});
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        this.getData();
    }

    componentDidMount() {
        catchErrors(this.getData());
    }

    async getData() {
        const genre = this.state.genre;
        var minBPM = '';
        var maxBPM = '';
        if(this.state.targetBPM == null) {
            minBPM = 95;
            maxBPM = 105;
        } else {
            minBPM = this.state.targetBPM - 5;
            maxBPM = minBPM + 10;
        }

        const targetPop = this.state.targetPop;
        const targetKey = this.state.targetKey;

        const recommendedTracks = await getRecommendationsBpm(genre, targetPop, targetKey, minBPM, maxBPM);
        const recommendedTracksAudioFeatures = await getAudioFeaturesOfTracksRecs(recommendedTracks);
        
        this.setState({
        recommendedTracks,
        recommendedTracksAudioFeatures: recommendedTracksAudioFeatures.data,
        });
    }

  render() {

    const { recommendedTracks, recommendedTracksAudioFeatures } = this.state;

    return (
      <Main>
          <Header>
            <Section>
              <h2>Search</h2>
            </Section>
            <Filter onSubmit = {this.handleSubmit}>
            <GenreLabel><h5>Genre</h5></GenreLabel>
                <GenreDropdown value={this.state.genre} onChange={this.handleChangeGenre} >
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
                <PopularityLabel><h5>Popularity</h5></PopularityLabel>
                <PopularityDropdown value={this.state.targetPop} onChange={this.handleChangePopularity} >
                  <option value="90">High</option>
                  <option value="60">Mid</option>
                  <option value="25">Low</option>
                </PopularityDropdown>
                <KeyLabel><h5>Key</h5></KeyLabel>
                <KeyDropdown value={this.state.targetKey} onChange={this.handleChangeKey} >
                  <option value="0">C</option>
                  <option value="1">D♭</option>
                  <option value="2">D</option>
                  <option value="3">E♭</option>
                  <option value="4">E</option>
                  <option value="5">F</option>
                  <option value="6">G♭</option>
                  <option value="7">G</option>
                  <option value="8">A♭</option>
                  <option value="9">A</option>
                  <option value="10">B♭</option>
                  <option value="11">B</option>
                </KeyDropdown>
                <TempoLabel><h5>Tempo</h5></TempoLabel>
                <Input placeholder="100" maxLength="3" value={this.state.targetBPM} onChange={this.handleChangeBPM} />
            </Filter>
          </Header>
            
            <Overview>
                <Section>
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