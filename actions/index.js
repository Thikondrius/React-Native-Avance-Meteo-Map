import axios from "axios";
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast";
import { API_KEY } from "../constant";
import { SET_CURRENT_WEATHER, SET_WEATHER_FORECAST } from "./action-types";

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
