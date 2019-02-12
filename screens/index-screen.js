import React, { Component } from "react";
import { connect } from "react-redux";
import { View, AsyncStorage } from "react-native";
import { withNavigation } from "react-navigation";
import { facebookLogin } from "../actions/index";
import { subscribeToPushNotification } from "../services/notifications";
class Index extends Component {
  componentDidMount() {
    subscribeToPushNotification();
    if (!this.props.token) {
      this.props.facebookLogin(() => {
        this.goToSearch();
      });
    } else {
      this.goToSearch();
    }
  }
  goToSearch = () => {
    this.props.navigation.navigate("Search");
  };
  render() {
    return <View />;
  }
}
const mapDispatchToProps = {
  facebookLogin
};
const mapStateToProps = ({ authentification }) => {
  return {
    token: authentification.token
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Index)
);
