import React from "react";
import AdvancedDetailsScreen from "./screens/advanced-details-screen";
import { createStackNavigator, createAppContainer } from "react-navigation";
import store from "./store";
import { Provider } from "react-redux";
import SearchScreen from "./screens/search-screen";
import IndexScreen from "./screens/index-screen";
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Index: IndexScreen,
    Search: SearchScreen,
    Detail: AdvancedDetailsScreen
  },
  {
    initialRouteName: "Index",
    headerMode: "none"
  }
);
const Routes = createAppContainer(AppNavigator);
