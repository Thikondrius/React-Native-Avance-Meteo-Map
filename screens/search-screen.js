import React from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import { MapView } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import WeatherCard from "../components/weather-card";
import { connect } from "react-redux";
import { getCurrentWeatherByCity } from "../actions/index";

const DEFAULT_COORD = {
  lat: 48.859268,
  lng: 2.347060
};
class SearchScreen extends React.Component {
  state = {
    search: ""
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
    this.props.getCurrentWeatherByCity(this.state.search);
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
            latitude: this.props.currentWeather
              ? this.props.currentWeather.coord.lat
              : DEFAULT_COORD.lat,
            longitude: this.props.currentWeather
              ? this.props.currentWeather.coord.lon
              : DEFAULT_COORD.lng,
            latitudeDelta: 0.2000,
            longitudeDelta: 0.1000
          }}
          liteMode={true}
          scrollEnabled={false}
        />
        {this.props.currentWeather &&
          <WeatherCard weather={this.props.currentWeather} />}
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
const mapStateToProps = ({ weather }) => {
  return {
    currentWeather: weather.currentWeather
  };
};

const mapDispatchToProps = {
  getCurrentWeatherByCity
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
