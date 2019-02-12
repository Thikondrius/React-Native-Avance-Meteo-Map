import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAILED
} from "../actions/action-types";

const initialState = {
  token: undefined
};

export default function AuthentificationReducer(state = initialState, action) {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return {
        token: action.payload
      };
    case FACEBOOK_LOGIN_FAILED:
      return {
        token: undefined
      };
    default:
      return state;
  }
}
