import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../Containers/Auth/LoginScreen';

const AuthNav = createStackNavigator(
  {
    LoginScreen: {screen: LoginScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
  },
);

export default AuthNav;
