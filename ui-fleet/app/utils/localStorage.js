import {
  TrilliumAccessToken,
  TrilliumRefreshToken,
  TrilliumExpiresIn,
} from 'commons/constants';

export const setTokens = tokens => {
  localStorage.setItem(TrilliumAccessToken, tokens.access_token);
  localStorage.setItem(TrilliumRefreshToken, tokens.refresh_token);
  localStorage.setItem(TrilliumExpiresIn, tokens.expires_in);
};

export const getTokens = () => {
  let tokens = {};
  if (localStorage.getItem(TrilliumAccessToken)) {
    tokens = {
      access_token: localStorage.getItem(TrilliumAccessToken),
      refresh_token: localStorage.getItem(TrilliumRefreshToken),
      expires_in: localStorage.getItem(TrilliumExpiresIn),
    };
  }
  return tokens;
};

export const clearTokens = () => {
  localStorage.removeItem(TrilliumAccessToken);
  localStorage.removeItem(TrilliumRefreshToken);
  localStorage.removeItem(TrilliumExpiresIn);
};
