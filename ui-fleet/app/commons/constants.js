const config = require('config.json');

const TrilliumAccessToken = 'TRILLIUM_ACCESS_TOKEN';
const TrilliumRefreshToken = 'TRILLIUM_REFRESH_TOKEN';
const TrilliumExpiresIn = 'TRILLIUM_EXPIRES_IN';

const dateTimeFormat = 'MMM DD, YYYY hh:mm';
const dateFormat = 'YYYY-MM-DD';
const dateFormatSoftware = 'YYYY/MM/DD';

const AsyncActionCreatorSuffix = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

function getApiGatewayUrl() {
  // default value
  return config.ApiGatewayUrl;
}
function getApiNoderedUrl() {
  // default value
  return config.ApiNoderedUrl;
}
function getSocketIOUrl() {
  return config.SocketIOUrl;
}
function getUrlPath() {
  return config.UrlPath;
}

const mapToken =
  'pk.eyJ1IjoiZGF0bnQxOTk3IiwiYSI6ImNqanpnc3V4bWF3bWEza3AxZ2djYjhjejgifQ.7GgJ7WOka4SC1-1BECZnQA';
const mapStyle = 'mapbox://styles/mapbox/dark-v9';

const ApiGatewayUrl = getApiGatewayUrl();
const ApiNoderedUrl = getApiNoderedUrl();
const SocketIOUrl = getSocketIOUrl();
const UrlPath = getUrlPath();

export {
  AsyncActionCreatorSuffix,
  ApiGatewayUrl,
  ApiNoderedUrl,
  SocketIOUrl,
  mapToken,
  dateFormat,
  dateTimeFormat,
  mapStyle,
  TrilliumAccessToken,
  TrilliumRefreshToken,
  TrilliumExpiresIn,
  UrlPath,
  dateFormatSoftware,
};
