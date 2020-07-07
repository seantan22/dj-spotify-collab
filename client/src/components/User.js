import React, { Component } from 'react';

import { getUserInfo, getTrackAudioFeatures, logout } from '../spotify';
import { catchErrors } from '../utils'

export default class User extends Component {
  state = {
    user: '',
    playingNow: '',
    playingNowBPM: '',
    playingNowDanceability: '',
    topArtists: '',
    topTracks: '',
  };

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { user, playingNow, topArtists, topTracks } = await getUserInfo();

    const playingNowFeatures = await getTrackAudioFeatures(playingNow.item.id);
    
    this.setState({
      user,
      playingNow,
      playingNowBPM: Math.round(playingNowFeatures.data.tempo),
      playingNowDanceability: playingNowFeatures.data.danceability * 100,
      topArtists,
      topTracks,
    });
  }

  render() {
      const { user, playingNow, playingNowBPM, playingNowDanceability, topArtists, topTracks } = this.state;

    return (
      <div>
        <div>
          Username: {user.display_name}
        </div>
        <br/>
        <div>
          Playing Now: {playingNow ? playingNow.item.name + ' – ' + playingNow.item.artists[0].name : 'Loading'}
          <br/>
          BPM: {playingNowBPM ? playingNowBPM : 'Loading'}
          <br/>
          Danceability: {playingNowDanceability ? playingNowDanceability + '%' : 'Loading'}
        </div>
        <br/>
        <div>
          All Time Top Artists
          {topArtists ? (
            <ul>
              {topArtists.items.slice(0, 20).map((artist, i) => (
                <div key={i}>
  
                  {/* <div>
                    {artist.images.length && (
                      <img src={artist.images[2].url} alt="Artist" />
                    )}
                  </div> */}

                  <div>
                    <span>{i+1} {artist.name}</span>
                  </div>
                  
                </div>
              ))}
            </ul>
          ) : 'Loading' }
        </div>

        <div>
          All Time Top Tracks
          {topTracks ? (
            <ul>
              {topTracks.items.map((track, i) => (
                  <div key={i}>

                  <div>
                    <span>{i+1} {track.name}</span>
                  </div>
                  
                </div>
              ))}
            </ul>
          ) : 'Loading' }

        </div>

        <button onClick={logout}>Logout</button>
      </div>
    )
  }
}