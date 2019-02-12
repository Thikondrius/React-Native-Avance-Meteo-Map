import { combineReducers } from "redux";
import WeatherReducer from "./weather";
import AuthentificationReducer from "./authentification";

export default combineReducers({
  weather: WeatherReducer,
  authentification: AuthentificationReducer
});
