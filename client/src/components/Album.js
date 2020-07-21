import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { getAlbumSummary, getAudioFeaturesOfTracks } from '../spotify';
import { catchErrors, dateMonthYear } from '../utils';

import { StarIcon, HalfStarIcon } from  './icons/'

import styled from 'styled-components/macro';
import Main from '../styles/Main';
import Loading from './Loading';
import AlbumTrack from '../styles/AlbumTrack';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
import media from '../styles/media';
const { colors, fontSizes } = theme;

const Header = styled.header`
  ${mixins.flexBetween};
  color: ${colors.white};
  h2 {
    margin: 0;
  }
`;

const AlbumContainer = styled.div`
    display: flex;
    margin-top: 50px;
    margin-bottom: 45px;
    ${media.phablet`
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
    `};
`;

const AlbumCover = styled.div`
    ${mixins.coverShadow};
    max-width: 200px;
    margin-right: 40px;
    ${media.tablet`
        max-width: 200px;
        margin: 0 auto;
    `};
`;

const Info = styled.div`
  flex-grow: 0.5;
  ${media.phablet`
    text-align: center;
    margin-top: 30px;
  `};
`;

const AlbumName = styled.h1`
  font-size: 38px;
  margin: 0 0 5px;
  ${media.tablet`
    font-size: 30px;
  `};
`;

const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-size: 26px;
  font-weight: 700;
  text-align: left !important;
  ${media.tablet`
    font-size: ${fontSizes.xs};
    text-align: center !important;
  `};
`;

const AlbumInfo = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  width: 100%;
  text-align: center;
  padding-top: 15px;
  ${media.tablet`
        grid-template-columns: repeat(1, minmax(100px, 1fr));
        padding-bottom: 0px;
        margin-bottom: 0px;
    `};
`;

const Feature = styled.div`
  padding: 15px 10px;
`;

const FeatureLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.sm};
  margin-bottom: 0;
  ${media.tablet`
        font-size: ${fontSizes.xs};
    `};
`;

const FeatureStat = styled.h4`
  color: ${colors.white};
  font-size: ${fontSizes.xxl};
  font-weight: 700;
  margin-bottom: 0;
  ${media.tablet`
        font-size: ${fontSizes.lg};
    `};
`;

const LabelName = styled.h4`
  color: ${colors.white};
  font-size: ${fontSizes.xl};
  font-weight: 700;
  margin-bottom: 0;
`;

const Stars = styled.div`
    margin-bottom: 6px;
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

const BottomRow = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  width: 100%;
  text-align: center;
  padding-top: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${colors.lightGrey};
  ${media.tablet`
    grid-template-columns: repeat(1, minmax(100px, 1fr));
    padding-top: 0px;
    padding-bottom: 0px;
    `};
`;

const BPMContainer = styled.div`
    align-items: center;
    display: grid;
    grid-template-columns: 1fr max-content;
    grid-gap: 10px;
`;

const TrackBPM = styled.div`
  display: flex;
  justify-content: center; 
  margin-bottom: 51px;
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  ${media.tablet`
    margin-bottom: 37px;
  `};
`;

export default class Album extends Component {
    static propTypes = {
        albumId: PropTypes.string,
    }

    state = {
        albumInfo: '',
    };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { albumId } = this.props;
    const { albumInfo } = await getAlbumSummary(albumId);

    const albumTracksAudioFeatures = await getAudioFeaturesOfTracks(albumInfo.tracks);

    this.setState({
      albumInfo,
      albumTracksAudioFeatures: albumTracksAudioFeatures.data,
    });
  }

  render() {
    const { albumInfo, albumTracksAudioFeatures } = this.state;
    console.log(albumInfo.tracks)
    return (
        <div>
            {albumInfo ? (
                <Main>
                    <Header>
                        <h2>Album Details</h2>
                    </Header>
                    <AlbumContainer>
                        <AlbumCover>
                            <img src={albumInfo.images[0].url} alt="Album Cover" />
                        </AlbumCover>
                        <Info>
                            <AlbumName> {albumInfo.name} </AlbumName>
                            <ArtistName>
                                {albumInfo.artists &&
                                    albumInfo.artists.map(({ name }, i) => (
                                    <span key={i}>
                                        {name}
                                        {albumInfo.artists.length > 0 && i === albumInfo.artists.length - 1 ? '' : ','}
                                        &nbsp;
                                    </span>
                                ))}
                            </ArtistName>
                        </Info>
                    </AlbumContainer>
                    <AlbumInfo>
                        <Feature>
                                    <FeatureStat>
                                        {albumInfo.popularity > 90 ? 
                                        <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> </Stars> : (albumInfo.popularity > 80 ? 
                                            <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> <HalfStarIcon /> </Stars> : (albumInfo.popularity > 70 ?
                                                <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <StarIcon /> </Stars> : (albumInfo.popularity > 60 ?
                                                    <Stars> <StarIcon /> <StarIcon /> <StarIcon /> <HalfStarIcon /> </Stars> : (albumInfo.popularity > 50 ?
                                                        <Stars> <StarIcon /> <StarIcon /> <StarIcon /> </Stars> : (albumInfo.popularity > 40 ? 
                                                            <Stars> <StarIcon /> <StarIcon /> <HalfStarIcon /> </Stars> : (albumInfo.popularity > 30 ? 
                                                                <Stars> <StarIcon /> <StarIcon /> </Stars> : (albumInfo.popularity > 20 ? 
                                                                    <Stars> <StarIcon /> <HalfStarIcon /> </Stars> : (albumInfo.popularity > 10 ?
                                                                        <Stars> <StarIcon /> </Stars> : (albumInfo.popularity > 0 ? 
                                                                            <Stars> <HalfStarIcon /> </Stars> : '--')))))))))}
                                    </FeatureStat>
                                    <FeatureLabel>Popularity</FeatureLabel>
                        </Feature>
                        <Feature>
                            <FeatureStat>{albumInfo.total_tracks}</FeatureStat>
                            <FeatureLabel>Total Tracks</FeatureLabel>
                        </Feature>
                        <Feature>
                            <FeatureStat>{albumInfo.album_type}</FeatureStat>
                            <FeatureLabel>Type</FeatureLabel>
                        </Feature>
                    </AlbumInfo>
                    <BottomRow>
                        <Feature>
                            <FeatureStat>{dateMonthYear(albumInfo.release_date)}</FeatureStat>
                            <FeatureLabel>Release</FeatureLabel>
                            </Feature>
                        <Feature>
                            <LabelName>{albumInfo.label}</LabelName>
                            <FeatureLabel>Label</FeatureLabel>
                        </Feature>
                    </BottomRow>
                    <Overview>
                        <Section>
                            <ul>
                                {albumInfo.tracks ? albumInfo.tracks.items.map((track, i) => <AlbumTrack track={track} key={i} />) : ''}
                            </ul>
                        </Section>
                        <Section>
                            <BPMContainer>
                                {albumTracksAudioFeatures ? (
                                    <ul>
                                        {albumTracksAudioFeatures.audio_features.map((track, i) => (
                                                <TrackBPM key={i}>{Math.round(track.tempo)} BPM</TrackBPM> 
                                    ))}
                                    </ul>
                                ) : '' }
                            </BPMContainer>
                        </Section>
                    </Overview>
                </Main>
            ) : <Loading />}
        </div>
    )
  }
}