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
        console.log(data);
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