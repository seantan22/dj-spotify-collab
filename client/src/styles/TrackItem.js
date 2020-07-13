import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import theme from '../styles/theme';
import mixins from '../styles/mixins';
const { colors, fontSizes, spacing } = theme;

const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin-bottom: ${spacing.sm};
`;

const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
`;

const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`;

// const TrackRight = styled.span``;

const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

const TrackAlbum = styled.div`
  ${mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  margin-top: 3px;
`;

// const TrackTempo = styled.span`
//   color: ${colors.lightGrey};
//   font-size: ${fontSizes.xs};
// `;

const TrackItem = ({ track }) => (
  <li>
    <TrackContainer to={`/track/${track.id}`}>
        <TrackArtwork>
            {track.album.images.length && <img src={track.album.images[2].url} alt="Album Artwork" />}
        </TrackArtwork>
        <TrackMeta>
            <TrackLeft>
                {track.name && <TrackName>{track.name}</TrackName>}
                {track.artists && track.album && (
                    <TrackAlbum>
                        {track.artists &&
                            track.artists.map(({ name }, i) => (
                            <span key={i}>
                                {name}
                                {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}&nbsp;
                            </span>
                            ))}
                        &nbsp;&middot;&nbsp;&nbsp;
                        {track.album.name}
                    </TrackAlbum>
                )}
            </TrackLeft>
            {/* <TrackRight>
                <TrackTempo>
                    BPM
                </TrackTempo>
            </TrackRight> */}
        </TrackMeta>
    </TrackContainer>
  </li>
);

TrackItem.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TrackItem;