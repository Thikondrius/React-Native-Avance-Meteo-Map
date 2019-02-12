import React, { Component } from "react";
import { View, Image, Text, PanResponder, Animated } from "react-native";
import { Button } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { kelvinToCelcius } from "../services/temperature";
import { withNavigation } from "react-navigation";
const CARD_OPEN_POSITION = hp("45%");
const TRESHOLD_TO_BOTTOM = hp("70%");
const TRESHOLD_TO_TOP = hp("75%");

const CARD_INITIAL_POSITION = hp("80%");
const TOP_DRAG_ZONE_MAX = hp("65%");
const ICON_URL = "http://openweathermap.org/img/w/";

class WeatherCard extends Component {
  state = { isCardOpen: false };

  componentDidMount() {
    //permet de détécter le go back ( on pourrait juste le faire avant de quitter la vue )
    this._onFocusListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.setState({ isCardOpen: false });
        this.resetPosition(undefined);
      }
    );
    this.position = new Animated.ValueXY();
    this.position.setValue({ x: 0, y: CARD_INITIAL_POSITION });
    panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        if (!(this.state.isCardOpen && gesture.y0 > TOP_DRAG_ZONE_MAX)) {
          // Si la carte est ouverte il faut absoluement avoir
          // commencé à la tirer depuis le haut pour ne pas qu'il y ai de téléportation
          this.position.setValue({
            x: 0,
            y: gesture.moveY - hp("10%") // éviter que la box suive par le haut mais par plus bas
          });
        }
      },
      onPanResponderRelease: (e, gesture) => {
        // si aucun mouvement  moveX et moveY sont  === 0 ( il risque donc de se téléporter en haut)
        if (!this.state.isCardOpen) {
          if (gesture.moveY <= TRESHOLD_TO_TOP) {
            // si la carte est fermé et qu'on passe au dessus le seuil, monter.
            this.setOpenPosition(undefined);
            this.setState({ isCardOpen: true });
          } else {
            // Sinon rester en bas
            this.resetPosition(undefined);
          }
        } else {
          if (gesture.moveY <= TRESHOLD_TO_BOTTOM) {
            this.setOpenPosition(undefined);
          } else {
            if (gesture.y0 < TOP_DRAG_ZONE_MAX) {
              // Evite la téléportation vers le bas et force à commencer àv tirer depuis le haut
              this.resetPosition();
              this.setState({ isCardOpen: false });
            }
          }
        }
      }
    });
    this.setState({ panResponder });
  }
  goToDetail = () => {
    this.props.navigation.navigate("Detail", { city: this.props.weather.name });
  };
  setOpenPosition = done => {
    Animated.spring(this.position, {
      toValue: { x: 0, y: CARD_OPEN_POSITION }
    }).start(() => done && done());
  };
  resetPosition = done => {
    Animated.spring(this.position, {
      toValue: { x: 0, y: CARD_INITIAL_POSITION }
    }).start(() => done && done());
  };
  getCardStyle() {
    return {
      width: wp("90%"),
      height: hp("110%"),
      borderRadius: 10,
      zIndex: 2,
      ...this.position.getLayout(),
      backgroundColor: "white",
      elevation: 1,
      shadowColor: "black",
      shadowOpacity: 0.2,
      shadowOffset: { height: 2, width: 2 },

      position: "absolute",
      left: wp("5%"),
      paddingTop: hp("2%")
    };
  }

  renderMoreDetail = () => {
    return (
      <View>
        <View style={{ alignItems: "center" }}>
          <Text>Humidity : {this.props.weather.main.humidity} %</Text>
          <Text>Pressure : {this.props.weather.main.pressure} hpa</Text>
          <Text>
            Max temperature :
            {kelvinToCelcius(this.props.weather.main.temp_max)} C°
          </Text>
          <Text>
            Min temperature :
            {kelvinToCelcius(this.props.weather.main.temp_min)} C°
          </Text>
          <Text>Wind speed : {this.props.weather.wind.speed} Km/h</Text>
        </View>
        <Button
          containerStyle={{ marginTop: hp("3%"), width: wp("80%") }}
          onPress={this.goToDetail}
          title="See 5 days forecast"
        />

      </View>
    );
  };

  renderDrawer = () => (
    <Animated.View
      {...this.state.panResponder.panHandlers}
      style={this.getCardStyle()}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >

        <Text style={{ fontSize: 30, marginBottom: hp("1%") }}>
          {this.props.weather.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginTop: hp("1%"), fontSize: 35 }}>
            {kelvinToCelcius(this.props.weather.main.temp) + "C°"}
          </Text>
          <Image
            style={{ height: 60, width: 60 }}
            source={{
              uri: `${ICON_URL}${this.props.weather.weather[0].icon}.png`
            }}
          />
        </View>

        {this.state.isCardOpen && this.renderMoreDetail()}
      </View>

    </Animated.View>
  );

  render() {
    return this.state.panResponder ? this.renderDrawer() : <View />;
  }
}

export default withNavigation(WeatherCard);
