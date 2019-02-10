import {
  SET_CURRENT_WEATHER,
  SET_WEATHER_FORECAST
} from "../actions/action-types";

const initalState = {
  currentWeather: undefined,
  weatherForecast: undefined
};
export default function(state = initalState, action) {
  switch (action.type) {
    case SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload
      };
    case SET_WEATHER_FORECAST:
      return {
        ...state,
        weatherForecast: action.payload
      };
    default:
      return state;
  }
}
