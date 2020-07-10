import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getRecommendationsBpm, getAudioFeaturesOfTracksRecs } from '../spotify';
import { catchErrors } from '../utils';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import TrackItem from '../styles/TrackItem';
const { colors, fontSizes, spacing } = theme;

const Header = styled.header`
${mixins.flexBetween};
  h2 {
    margin: 0;
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
  state = {
    user: '',
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    // Recommendation Parameters
    const genres = 'hip-hop,r-n-b,house,pop,edm';
    const minBPM = 150 - 5;
    const maxBPM = 150 + 5;

    const recommendedTracks = await getRecommendationsBpm(genres, minBPM, maxBPM);

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
              <h2>Search By BPM</h2>
              <Input placeholder="Search" maxLength="3"/>
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