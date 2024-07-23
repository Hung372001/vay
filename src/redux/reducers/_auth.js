import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  EXPRIED,
  CLOSE_EXPRIED,
  SET_PROFILE,
} from '../constants';

const initialAuth = {
  accessToken: '',
  status: false,
  isExpried: false,
  profile: {},
  currentContract: {},
};

export default function (state = initialAuth, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: true,
        profile: action.payload,
      };
    case 'DISPATCH_CONTRACT': {
      return {
        ...state,
        currentContract: action.payload.contract,
      };
    }
    case LOGIN_FAIL:
      return { ...state, accessToken: '', status: false };
    case LOGOUT:
      return {
        ...state,
        accessToken: '',
        status: false,
      };
    case EXPRIED:
      return { ...state, isExpried: true };
    case CLOSE_EXPRIED:
      return { ...state, isExpried: false };
    case SET_PROFILE:
      return { ...state, profile: action.payload };
    case 'UPDATE_KYC':
      return {
        ...state,
        profile: {
          ...state.profile,
          kyc: { ...action.payload, avatar: action.payload.id_with_face },
        },
      };
    default:
      return { ...state };
  }
}
