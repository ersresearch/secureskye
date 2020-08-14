import axios from 'axios';
import qs from 'qs';
import apiAuthenticate from 'commons/api/authenticate';

export function authService(credentials) {
  const grantType = credentials.username ? 'password' : 'refresh_token';
  const option = {
    client_id: 'secureskye-webapp-client',
    client_secret: 'secureskye',
    grant_type: grantType,
    ...credentials,
  };
  return axios({
    method: 'POST',
    url: apiAuthenticate.auth,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(option),
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
}
