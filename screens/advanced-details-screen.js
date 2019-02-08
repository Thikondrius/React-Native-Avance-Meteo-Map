import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { kelvinToCelcius } from "../services/temperature";
import { LineChart } from "react-native-chart-kit";
import { withNavigation } from "react-navigation";
import { API_KEY } from "../constant";
const FORECAST_URL =
  "http://api.openweathermap.org/data/2.5/forecast?appid=" + API_KEY;
import axios from "axios";
import fakeForeCastData from "../fakeForeCastData";

class AdvancedDetails extends Component {
  state = { data: undefined };

  componentDidMount() {
    const city = this.props.navigation.getParam("city");
    axios.get(`${FORECAST_URL}&q=${city}`).then(response => {
      this.setState({ data: response.data });
    });

    // this.setState({ data: fakeForeCastData });
  }
  getTemperatures() {
    return this.state.data.list.map(weather => {
      return kelvinToCelcius(weather.main.temp);
    });
  }
  getHumidity() {
    return this.state.data.list.map(weather => {
      return weather.main.humidity;
    });
  }
  getLabel() {
    return this.state.data.list.map((_, index) => {
      let day = index / 8;
      return index === 0 ? "t" : index % 8 === 0 ? "t+" + day + "j" : "";
    });
  }
  renderChart(data) {
    return (
      <LineChart
        data={{
          labels: this.getLabel(),

          datasets: [
            {
              data
            }
          ]
        }}
        width={wp("90%")} // from react-native
        height={hp("30%")}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          }
        }}
        bezier={true}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    );
  }
  goBack = () => {
    this.props.navigation.goBack();
  };

  renderCharts = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontSize: 30, paddingTop: hp("1%") }}>
          {this.state.data.city.name} 5 days forecast
        </Text>
        <Text style={{ marginBottom: hp("2%"), fontSize: 20 }}>
          Temperature (C°)
        </Text>
        {this.renderChart([...this.getTemperatures()])}
        <Text
          style={{ marginTop: hp("3%"), marginBottom: hp("2%"), fontSize: 20 }}
        >
          Humidity (%)
        </Text>
        {this.renderChart([...this.getHumidity()])}
      </View>
    );
  };
  renderContent = () => (
    <View style={{ alignItems: "center" }}>
      {this.renderCharts()}
      <Button
        onPress={this.goBack}
        title="Back"
        containerStyle={{ marginTop: hp("1%"), width: wp("90%") }}
      />
    </View>
  );
  render() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >

        {this.state.data != undefined
          ? this.renderContent()
          : <Text>Loading ...</Text>}
      </View>
    );
  }
}

export default withNavigation(AdvancedDetails);
