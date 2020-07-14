import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import { getTrackSummary } from '../spotify';
import { catchErrors, formatDuration, getYear, intToKey, intToMode, categorizeEnergy, categorizeDanceability, categorizeValence } from '../utils';

import { StarIcon, HalfStarIcon } from  './icons/'
// import FeatureRadar from './FeatureRadar';

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import Loading from './Loading';
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

const TrackContainer = styled.div`
    display: flex;
    margin-top: 50px;
    margin-bottom: 45px;
`;

const Info = styled.div`
  flex-grow: 0.5;
`;

const Artwork = styled.div`
    ${mixins.coverShadow};
    max-width: 200px;
    margin-right: 40px;
`;

const TrackName = styled.h1`
  font-size: 38px;
  margin: 0 0 5px;
`;

const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-size: 26px;
  font-weight: 700;
  text-align: left !important;
`;

const AlbumLink = styled(Link)`
`;

const Album = styled.h3`
    color: ${colors.lightGrey};
    font-weight: 400;
    font-size: 18px;
    &:hover {
        text-decoration: underline;
    }
`;

const AudioInfo = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 1fr));
  width: 100%;
  padding-bottom: 15px;
  margin-bottom: 3px;
  text-align: center;
`;

const AudioFeatures = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  width: 100%;
  text-align: center;
  padding-top: 15px;
`;

const Feature = styled.div`
  padding: 15px 10px;
`;

const FeatureLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.sm};
  margin-bottom: 0;
`;

const FeatureStat = styled.h4`
  color: ${colors.white};
  font-size: ${fontSizes.xxl};
  font-weight: 700;
  margin-bottom: 0;
`;

const Stars = styled.div`
    margin-bottom: 6px;
`;


export default class Track extends Component {
    static propTypes = {
        trackId: PropTypes.string,
    }

    state = {
        trackInfo: '',
        trackFeatures: '',
        trackAnalysis: '',
    };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { trackId } = this.props;
    const { trackInfo, trackFeatures } = await getTrackSummary(trackId);
    this.setState({
      trackInfo,
      trackFeatures,
    });
  }

  render() {
    const { trackInfo, trackFeatures } = this.state;

    return (
        <div>
            {trackInfo ? (
                <Main>
                    <Header>
                        <h2>Track Details</h2>
                    </Header>
                    <TrackContainer>
                        <Artwork>
                            <img src={trackInfo.album.images[0].url} alt="Album Cover" />
                        </Artwork>
                        <Info>
                            <TrackName> {trackInfo.name} </TrackName>
                            <ArtistName>
                                {trackInfo.artists &&
                                    trackInfo.artists.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {trackInfo.artists.length > 0 && i === trackInfo.artists.length - 1 ? '' : ','}
                                        &nbsp;
                                    </span>
                                ))}
                            </ArtistName>
                            <AlbumLink to={`/album/${trackInfo.album.id}`}>
                                <Album>
                                    {trackInfo.album.name}{' '}&middot; {getYear(trackInfo.album.release_date)}
                                </Album>
                            </AlbumLink>
                        </Info>
                    </TrackContainer>
                    {trackFeatures && (
                    <div>
                        <AudioInfo>
                            <Feature>
                                <FeatureStat>
                                    {trackInfo.popularity > 90 ? 
                                    <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> </Stars> : (trackInfo.popularity > 80 ? 
                                        <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <HalfStarIcon /> </Stars> : (trackInfo.popularity > 70 ?
                                            <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> </Stars> : (trackInfo.popularity > 60 ?
                                                <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <HalfStarIcon /> </Stars> : (trackInfo.popularity > 50 ?
                                                    <Stars> <StarIcon /> <StarIcon /> <StarIcon /> </Stars> : (trackInfo.popularity > 40 ? 
                                                        <Stars> <StarIcon /> <StarIcon /> <HalfStarIcon /> </Stars> : (trackInfo.popularity > 30 ? 
                                                            <Stars> <StarIcon /> <StarIcon /> </Stars> : (trackInfo.popularity > 20 ? 
                                                                <Stars> <StarIcon /> <HalfStarIcon /> </Stars> : (trackInfo.popularity > 10 ?
                                                                    <Stars> <StarIcon /> </Stars> : (trackInfo.popularity > 0 ? 
                                                                        <Stars> <HalfStarIcon /> </Stars> : '--')))))))))}
                                </FeatureStat>
                                <FeatureLabel>Popularity</FeatureLabel>
                            </Feature>
                            <Feature>
                                <FeatureStat>{Math.round(trackFeatures.tempo)}</FeatureStat>
                                <FeatureLabel>BPM</FeatureLabel>
                            </Feature>
                            <Feature>
                                <FeatureStat>{intToKey(trackFeatures.key)} {intToMode(trackFeatures.mode)}</FeatureStat>
                                <FeatureLabel>Key</FeatureLabel>
                            </Feature>
                            <Feature>
                                <FeatureStat> {formatDuration(trackFeatures.duration_ms)} </FeatureStat>
                                <FeatureLabel> Duration </FeatureLabel>
                            </Feature>
                        </AudioInfo>
                        <AudioFeatures>
                            <Feature>
                                <FeatureStat>{categorizeEnergy(trackFeatures.energy)}</FeatureStat>
                                <FeatureLabel>Energy</FeatureLabel>
                            </Feature>
                            <Feature>
                                <FeatureStat>{categorizeDanceability(trackFeatures.danceability)}</FeatureStat>
                                <FeatureLabel>Danceability</FeatureLabel>
                            </Feature>
                            <Feature>
                                <FeatureStat>{categorizeValence(trackFeatures.valence) }</FeatureStat>
                                <FeatureLabel>Mood</FeatureLabel>
                            </Feature>
                        </AudioFeatures>
                    </div>
                    )}
                    {/* <FeatureRadar features={trackFeatures} type="" /> */}
                </Main>
            ) : <Loading />}
        </div>
    )
  }
}