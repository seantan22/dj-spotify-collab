import React, { Component } from 'react';
import { getRecommendationsBpm, getAudioFeaturesOfTracksRecs } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import TrackItem from '../styles/TrackItem';
const { colors, fontSizes } = theme;

const Header = styled.header`
${mixins.flexBetween};
  h2 {
    margin: 0;
  }
`;

const Filter = styled.form`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const GenreDropdown = styled.select`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  width: 250px;
  margin-right: 40px;
  padding: 5px 10px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  &:hover {
    cursor: pointer;
  }
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
    margin-right: 20px;
`;

const Overview = styled.section`
  display: grid;
  grid-template-columns: 9fr 1fr;
  grid-gap: 10px;
  width: 100%;
  margin-top: 50px;
`;

const Section = styled.div`
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
`;

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            genre: 'hip-hop',
            searchBPM: null,
        };

        this.handleChangeBPM = this.handleChangeBPM.bind(this);
        this.handleChangeGenre = this.handleChangeGenre.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeGenre(e) {
        this.setState({genre: e.target.value});
    }
    handleChangeBPM(e) {
        this.setState({searchBPM: e.target.value});
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
        if(this.state.searchBPM == null) {
            minBPM = 95;
            maxBPM = 105;
        } else {
            minBPM = this.state.searchBPM - 5;
            maxBPM = minBPM + 10;
        }

        const recommendedTracks = await getRecommendationsBpm(genre, minBPM, maxBPM);
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
            <h2>Search</h2>
            <Filter onSubmit = {this.handleSubmit}>
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
                <Input placeholder="100" maxLength="3" value={this.state.searchBPM} onChange={this.handleChangeBPM} />
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