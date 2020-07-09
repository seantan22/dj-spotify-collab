import axios from 'axios';
import { getHashParams } from '../utils';

/*** API TOKENS ***/

const TIME_VALID = 3600 * 1000 // 1 hour

// Set in Local Storage
const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);

// Get from Local Storage
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        window.location.reload();
        return;
    } catch(e) {
        console.error(e);
    }
};

export const getAccessToken = () => {
    const { error, access_token, refresh_token } = getHashParams();

    // Case 1: Error
    if(error) {
        console.error(error);
        refreshAccessToken();
    }

    // Case 2: Expired Access Token
    if(Date.now() - getTokenTimestamp() > TIME_VALID) {
        console.warn('Access token is expired. Refreshing...');
        refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken();
    const localRefreshToken = getLocalRefreshToken();

    // Case 3: No Refresh Token
    if(!localRefreshToken || localRefreshToken === 'undefined') {
        setLocalRefreshToken(refresh_token);
    }

    // Case 4: No Access Token
    if(!localAccessToken || localAccessToken === 'undefined') {
        setLocalAccessToken(access_token);
        return access_token;
    }

    return localAccessToken;

};

export const token = getAccessToken();

export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
}

/*** API CALLS ***/

const headers = {
    Authorization: `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

export const getPlayingNow = () => axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers });

export const getTopTracksAllTime = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

export const getAudioFeaturesOfTrack = track => {
    return axios.get('https://api.spotify.com/v1/audio-features/'.concat(track.item.id), { headers });
};

const getTrackIdsFromMatches = tracks => tracks.map((track) => track.id).join(',');
const getTrackIdsFromTracks = tracks => tracks.items.map((track) => track.id).join(',');
const getTrackIdsFromRecommendations = tracks => tracks.data.tracks.map((track) => track.id).join(',');

export const getAudioFeaturesOfTracks = tracks => {
    const ids = getTrackIdsFromTracks(tracks);
    return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

export const getAudioFeaturesOfTracksRecs = tracks => {
    const ids = getTrackIdsFromRecommendations(tracks);
    return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

export const getTracks = tracks => {
    const ids = getTrackIdsFromMatches(tracks);
    return axios.get(`https://api.spotify.com/v1/tracks?ids=${ids}`, { headers });
}

export const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });

export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

export const getUserInfo = () => {
    return axios
        .all([getUser(), getFollowing(), getPlaylists(), getPlayingNow(), getTopTracksAllTime()])
        .then(axios.spread((user, following, playlists, playingNow, topTracks) => {
            return {
                user: user.data,
                following: following.data,
                playlists: playlists.data,
                playingNow: playingNow.data,
                topTracks: topTracks.data,
            };
        }),
    );  
}

export const getRecommendationsBpm = (genres, minBPM, maxBPM) => {
    return axios.get(`https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${genres}&min_tempo=${minBPM}&max_tempo=${maxBPM}`, {headers});
}

// Returns list with track ids and tempos
export const getBpmMatches = (audioFeatures, bpm) => {

    var bpmMatches = audioFeatures.data.audio_features.filter(function(track) {
        return track.tempo > bpm-5 && track.tempo < bpm+5;
    }).map(function({id, tempo}){
        return {id, tempo};
    });

    return bpmMatches;
}

export const putPlay = () => axios.put('https://api.spotify.com/v1/me/player/pause', { headers });

/*** TRACK ***/

export const getTrackInfo = trackId => axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });
export const getTrackFeatures = trackId => axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });

export const getTrackSummary = trackId => {
    return axios
    .all([getTrackInfo(trackId), getTrackFeatures(trackId)])
    .then(
        axios.spread((trackInfo, trackFeatures ) => {
            return {
                trackInfo: trackInfo.data,
                trackFeatures: trackFeatures.data,
            };
        }),
    );
};