import axios from 'axios';
import { getItem, setItem } from '../utility/localStorageControl';

const API_ENDPOINT = 'https://whispering-eyrie-04211.herokuapp.com';

const authHeader = () => ({
  Authorization: 'Bearer ' + getItem('access_token'),
  'Content-Type': 'application/json',
   'Accept': 'application/json',
});

const client = axios.create({
  baseURL: API_ENDPOINT,
  withCredentials: false,
});

class DataService {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
    }).catch(error => {return error});
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    }).catch(error => {return error});

  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    }).catch(error => {return error});
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    }).catch(error => {return error});
  }

  static delete(path = '') {
    return client({
      method: 'DELETE',
      url: path,
      headers: { ...authHeader() },
    }).catch(error => {return error});
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use(config => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers } = config;
  requestConfig.headers = { ...headers };

  return requestConfig;
});

client.interceptors.response.use(
  response => response,
  error => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  },
);
export { DataService };
