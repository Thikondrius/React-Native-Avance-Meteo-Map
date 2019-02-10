import { combineReducers } from "redux";
import WeatherReducer from "./weather";

export default combineReducers({
  weather: WeatherReducer
});
