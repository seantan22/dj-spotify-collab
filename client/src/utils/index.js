// Pull token from query string
// Returns an object with the parameters as properties
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Error Handling
export const catchErrors = fn => {
  return function(...args) {
    return fn(...args).catch(err => {
      console.error(err);
    });
  };
};

// Get YYYY from YYYY-MM-DD
export const getYear = date => date.split('-')[0];

// Get MM-DD-YYYY from YYYY-MM-DD
export const reformatDate = date => {
  return date.split('-')[1] + '-' + date.split('-')[2] + '-' + date.split('-')[0];
}

// Get 00:00m from 000000ms
export const formatDuration = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const dateMonthYear = date => {
  let month = date.split('-')[1];
  switch (date.split('-')[1]) {
    case '01':
      month = 'January';
      break;
    case '02':
      month = 'February';
      break;
    case '03':
      month = 'March';
      break;
    case '04':
      month = 'April';
      break;
    case '05':
      month = 'May';
      break;
    case '06':
      month = 'June';
      break;
    case '07':
      month = 'July';
      break;
    case '08':
      month = 'August';
      break;
    case '09':
      month = 'September';
      break;
    case '10':
      month = 'October';
      break;
    case '11':
      month = 'November';
      break;
    case '12':
      month = 'December';
      break;
    default:
      return null;
  }
  return month + ' ' + date.split('-')[0]
}

// Map Integers to Pitches Using Pitch Class Notation
export const intToKey = int => {
  let  key = int;
  switch (int) {
    case 0:
      key = 'C';
      break;
    case 1:
      key = 'D♭';
      break;
    case 2:
      key = 'D';
      break;
    case 3:
      key = 'E♭';
      break;
    case 4:
      key = 'E';
      break;
    case 5:
      key = 'F';
      break;
    case 6:
      key = 'G♭';
      break;
    case 7:
      key = 'G';
      break;
    case 8:
      key = 'A♭';
      break;
    case 9:
      key = 'A';
      break;
    case 10:
      key = 'B♭';
      break;
    case 11:
      key = 'B';
      break;
    default:
      return null;
  }

  return key;
};

export const intToMode = int => {
  if(int === 1) {
    return 'Major';
  } else {
    return 'Minor';
  }
}

export const categorizeEnergy = energy => {
  if(energy >= .95) {
    return 'Banger Alert';
  } else  if (energy < .95 && energy >= .80) {
    return 'High';
  } else  if (energy < .80 && energy >= .50) {
    return 'Mid';
  } else {
    return 'Low';
  }
}

export const categorizeDanceability = danceability => {
  if(danceability >= .95) {
    return 'Woah';
  } else  if (danceability < .95 && danceability >= .80) {
    return 'High';
  } else  if (danceability < .80 && danceability >= .50) {
    return 'Mid';
  } else {
    return 'Low';
  }
}

export const categorizeValence = valence => {
  if(valence >= .80) {
    return 'High';
  } else if (valence < .80 && valence >= 0.50) {
    return 'Mid';
  } else {
    return 'Low';
  }
}