import api from '../../api';
import { message } from 'antd';
import {
  LOGIN_SUCCESS,
  LOGOUT,
  EXPRIED,
  CLOSE_EXPRIED,
  SET_PROFILE,
} from '../constants';

export const initialLogin = (data) => async (dispatch) => {
  return dispatch({ type: LOGIN_SUCCESS, payload: data });
};
export const Login = (params) => async (dispatch) => {
  try {
    const { data } = await api.post('/auth/login', params);
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('role', data.role);
    return dispatch({ type: LOGIN_SUCCESS, payload: {} });
  } catch (err) {}
};

export const Logout = () => async (dispatch) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('role');

  return dispatch({ type: LOGOUT });
};

export const setUserProfile = (payload) => async (dispatch) => {
  return dispatch({ type: SET_PROFILE, payload });
};
