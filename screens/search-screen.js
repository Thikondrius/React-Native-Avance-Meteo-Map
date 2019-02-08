import React from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import { MapView } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import axios from "axios";
import WeatherCard from "../components/weather-card";
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/weather";
import fakeCurrData from "../fakeCurrentWeatherData";
import { API_KEY } from "../constant";

export default class Index extends React.Component {
  state = {
    lat: 48.859268,
    lng: 2.347060,
    search: "",
    currentWeather: undefined
  };

  updateSearch = search => {
    this.setState({ search });
  };

  componentDidMount() {
    /*this.setState({
      currentWeather: fakeCurrData,
      lat: fakeCurrData.coord.lat,
      lng: fakeCurrData.coord.lon
    });*/
  }

  submitSearch = () => {
    axios
      .get(`${WEATHER_BASE_URL}?q=${this.state.search}&appid=${API_KEY}`)
      .then(response => {
        this.setState({
          currentWeather: response.data,
          lat: response.data.coord.lat,
          lng: response.data.coord.lon
        });
      });

    /*this.setState({
      currentWeather: fakeCurrData,
      lat: fakeCurrData.coord.lat,
      lng: fakeCurrData.coord.lon
    });
    */
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, alignItems: "center", zIndex: 0 }}
          region={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.2000,
            longitudeDelta: 0.1000
          }}
          liteMode={true}
          scrollEnabled={false}
        />
        {this.state.currentWeather &&
          <WeatherCard weather={this.state.currentWeather} />}
        {
          <SearchBar
            lightTheme
            onChangeText={this.updateSearch}
            placeholder="Type your city..."
            value={this.state.search}
            onSubmitEditing={this.submitSearch}
            containerStyle={{
              position: "absolute",
              bottom: hp("50%"),
              left: wp("5%"),
              width: wp("90%")
            }}
          />
        }
      </View>
    );
  }
}
