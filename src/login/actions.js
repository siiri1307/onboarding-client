import Raven from 'raven-js';
import { router } from '../router';

import {
  CHANGE_PHONE_NUMBER,

  MOBILE_AUTHENTICATION_START,
  MOBILE_AUTHENTICATION_START_SUCCESS,
  MOBILE_AUTHENTICATION_START_ERROR,

  MOBILE_AUTHENTICATION_SUCCESS,
  MOBILE_AUTHENTICATION_ERROR,
  MOBILE_AUTHENTICATION_CANCEL,

  ID_CARD_AUTHENTICATION_START,
  ID_CARD_AUTHENTICATION_START_SUCCESS,
  ID_CARD_AUTHENTICATION_START_ERROR,

  ID_CARD_AUTHENTICATION_SUCCESS,
  ID_CARD_AUTHENTICATION_ERROR,

  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_ERROR,

  GET_USER_CONVERSION_START,
  GET_USER_CONVERSION_SUCCESS,
  GET_USER_CONVERSION_ERROR,

  TOKEN_REFRESH_START,
  TOKEN_REFRESH_SUCCESS,
  TOKEN_REFRESH_ERROR,

  LOG_OUT,

  QUERY_PARAMETERS,
} from './constants';

import { api, http } from '../common';

const POLL_DELAY = 1000;

let timeout;

export function changePhoneNumber(phoneNumber) {
  return { type: CHANGE_PHONE_NUMBER, phoneNumber };
}

function getMobileIdTokens() {
  return (dispatch, getState) => {
    if (timeout && process.env.NODE_ENV !== 'test') {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      api
        .getMobileIdTokens()
        .then((tokens) => {
          if (tokens.accessToken) { // authentication complete
            dispatch({ type: MOBILE_AUTHENTICATION_SUCCESS, tokens });
            dispatch(router.selectRouteForState());
          } else if (getState().login.loadingAuthentication) { // authentication not yet completed
            dispatch(getMobileIdTokens()); // poll again
          }
        })
        .catch(error => dispatch({ type: MOBILE_AUTHENTICATION_ERROR, error }));
    }, POLL_DELAY);
  };
}

export function authenticateWithPhoneNumber(phoneNumber) {
  return (dispatch) => {
    dispatch({ type: MOBILE_AUTHENTICATION_START });
    return api
      .authenticateWithPhoneNumber(phoneNumber)
      .then((controlCode) => {
        dispatch({ type: MOBILE_AUTHENTICATION_START_SUCCESS, controlCode });
        dispatch(getMobileIdTokens());
      })
      .catch(error => dispatch({ type: MOBILE_AUTHENTICATION_START_ERROR, error }));
  };
}

function getIdCardTokens() {
  return (dispatch, getState) => {
    if (timeout && process.env.NODE_ENV !== 'test') {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      api
        .getIdCardTokens()
        .then((tokens) => {
          if (tokens.accessToken) { // authentication complete
            dispatch({ type: ID_CARD_AUTHENTICATION_SUCCESS, tokens });
            dispatch(router.selectRouteForState());
          } else if (getState().login.loadingAuthentication) { // authentication not yet completed
            dispatch(getIdCardTokens()); // poll again
          }
        })
        .catch(error => dispatch({ type: ID_CARD_AUTHENTICATION_ERROR, error }));
    }, POLL_DELAY);
  };
}

export function authenticateWithIdCard() {
  return (dispatch) => {
    dispatch({ type: ID_CARD_AUTHENTICATION_START });
    return api
      .authenticateWithIdCard()
      .then(() => {
        dispatch({ type: ID_CARD_AUTHENTICATION_START_SUCCESS });
        dispatch(getIdCardTokens());
      })
      .catch(error => dispatch({ type: ID_CARD_AUTHENTICATION_START_ERROR, error }));
  };
}

export function cancelMobileAuthentication() {
  if (timeout) {
    clearTimeout(timeout);
  }
  return { type: MOBILE_AUTHENTICATION_CANCEL };
}

function grantToken(state) {
  window.location.href = `${state.login.redirectUrl}?accessToken=${state.login.token}`;
}

function checkGrantToken(getState) {
  if (getState().login.grantToken === true) {
    grantToken(getState());
  }
}

export function getUser() {
  return (dispatch, getState) => {
    dispatch({ type: GET_USER_START });
    return api
      .getUserWithToken(getState().login.token)
      .then((user) => {
        if (process.env.NODE_ENV === 'production') {
          Raven.setUserContext({ id: user.id });
        }
        dispatch({ type: GET_USER_SUCCESS, user });
        checkGrantToken(getState);
        dispatch(router.selectRouteForState());
      })
      .catch((error) => {
        if (error.status === 401) {
          dispatch({ type: LOG_OUT });
        } else {
          dispatch({ type: GET_USER_ERROR, error });
        }
      });
  };
}

export function getUserConversion() {
  return (dispatch, getState) => {
    dispatch({ type: GET_USER_CONVERSION_START });
    return api
      .getUserConversionWithToken(getState().login.token)
      .then((userConversion) => {
        dispatch({ type: GET_USER_CONVERSION_SUCCESS, userConversion });
      })
      .catch((error) => {
        dispatch({ type: GET_USER_CONVERSION_ERROR, error });
      });
  };
}

export function refreshToken() {
  return (dispatch, getState) => {
    dispatch({ type: TOKEN_REFRESH_START });
    return api.refreshTokenWith(getState().login.refreshToken)
      .then((tokens) => {
        dispatch({ type: TOKEN_REFRESH_SUCCESS, tokens });
      })
      .catch(error => dispatch({ type: TOKEN_REFRESH_ERROR, error }));
  };
}

export function logOut() {
  if (process.env.NODE_ENV === 'production') {
    Raven.setUserContext(); // unauthenticate
  }
  http.resetStatisticsIdentification();
  return { type: LOG_OUT };
}

export function mapUrlQueryParamsToState(query) {
  return { type: QUERY_PARAMETERS, query };
}
