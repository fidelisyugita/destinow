import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';
// import AuthNav from './AuthNavigation';

import PlaceScreen from '../Containers/Place';

const MainNav = createStackNavigator(
  {
    Bottom: BottomNav,
    // Auth: AuthNav,

    PlaceScreen: {screen: PlaceScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Bottom',
  },
);

export default MainNav;
