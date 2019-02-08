import React from "react";
import AdvancedDetailsScreen from "./screens/advanced-details-screen";
import { createStackNavigator, createAppContainer } from "react-navigation";

import SearchScreen from "./screens/search-screen";
export default class App extends React.Component {
  render() {
    return <Routes />;
  }
}

const AppNavigator = createStackNavigator(
  {
    Index: SearchScreen,
    Detail: AdvancedDetailsScreen
  },
  {
    initialRouteName: "Index",
    headerMode: "none"
  }
);
const Routes = createAppContainer(AppNavigator);
