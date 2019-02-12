import axios from "axios";
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast";
import { API_KEY, FACEBOOK_APP_ID } from "../constant";
import {
  SET_CURRENT_WEATHER,
  SET_WEATHER_FORECAST,
  FACEBOOK_LOGIN_FAILED,
  FACEBOOK_LOGIN_SUCCESS
} from "./action-types";
import { Facebook } from "expo";
import { AsyncStorage } from "react-native";
export const getCurrentWeatherByCity = city => async dispatch => {
  const response = await axios.get(
    `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_CURRENT_WEATHER, payload: response.data });
};

export const getWeatherForecastByCity = city => async dispatch => {
  const response = await axios.get(
    `${FORECAST_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_WEATHER_FORECAST, payload: response.data });
};

export const facebookLogin = (onSuccess, onFailureCB) => dispatch => {
  Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permission: ["public_profil"]
  })
    .then(fbResponse => {
      console.log(fbResponse);
      if (fbResponse.type === "success") {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: fbResponse.token });
        onSuccess && onSuccess();
      } else {
        onFailureCB && onFailureCB();
        return dispatch({ type: FACEBOOK_LOGIN_FAILED });
      }
    })
    .catch(err => {
      onFailureCB && onFailureCB();
    });
};
