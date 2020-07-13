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
    margin-bottom: ${spacing.md};
`;

const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
  margin-left: 30px;
`;

const TrackNumber = styled.div`
  display: inline-block;
  position: relative;
  width: 10px;
  min-width: 10px;
  margin-right: ${spacing.base};
  font-weight: 500;
  color: ${colors.lightGrey};
`;

const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`;

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

const AlbumTrack = ({ track }) => (
  <li>
    <TrackContainer to={`/track/${track.id}`}>
        <TrackMeta>
            <TrackNumber>
                {track.track_number && <TrackName>{track.track_number}</TrackName>}
            </TrackNumber>
            <TrackLeft>
                {track.name && <TrackName>{track.name}</TrackName>}
                {track.artists && (
                    <TrackAlbum>
                        {track.artists &&
                            track.artists.map(({ name }, i) => (
                            <span key={i}>
                                {name}
                                {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}&nbsp;
                            </span>
                            ))}
                    </TrackAlbum>
                )}
            </TrackLeft>
        </TrackMeta>
    </TrackContainer>
  </li>
);

AlbumTrack.propTypes = {
  track: PropTypes.object.isRequired,
};

export default AlbumTrack;