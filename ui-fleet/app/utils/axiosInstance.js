import axios from 'axios';
import { TrilliumAccessToken } from 'commons/constants';

export const getAPI = url => () =>
  axios
    .get(url)
    .then(res => res)
    .catch(error => {
      throw error;
    });

export const postAPI = (url, body) => () =>
  axios
    .post(url, body)
    .then(res => res)
    .catch(error => {
      throw error;
    });
export const putAPI = (url, body) => () =>
  axios
    .put(url, body)
    .then(res => res)
    .catch(error => {
      throw error;
    });
export const deleteAPI = (url, body) => () =>
  axios
    .delete(url, body)
    .then(res => res)
    .catch(error => {
      throw error;
    });
export const patchAPI = (url, body) => () =>
  axios
    .patch(url, body)
    .then(res => res)
    .catch(error => {
      throw error;
    });

axios.interceptors.request.use(
  config => {
    const originalRequest = config;
    const idToken = localStorage.getItem(TrilliumAccessToken);
    if (idToken) {
      originalRequest.headers.Authorization = `Bearer ${idToken}`;
    }
    return originalRequest;
  },
  error => Promise.reject(error),
);
