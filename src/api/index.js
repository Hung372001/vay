import axios from 'axios';
import ReduxStore from '../redux/store';
import * as actions from '../redux/actions/auth';
import { message } from 'antd';
import { BASE_URL } from '../utils/constant'

const instance = axios.create({
  baseURL: BASE_URL,
  // baseURL: 'http://localhost:8080/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  },
});
instance.interceptors.request.use(async (config) => {
  try {
    const token = localStorage.getItem('access_token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
  } catch (error) { }
  return config;
});
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if ([401].includes(error.response.status)) {
      const { dispatch } = ReduxStore;
      dispatch(actions.Logout());
    }

    message.error(error.response.data.message);
    throw error.response.data.message;
  }
);

export default instance;
