import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';
// import AuthNav from './AuthNavigation';

import PlaceScreen from '../Containers/Place';
import PlaceDetailScreen from '../Containers/Place/PlaceDetailScreen';

const MainNav = createStackNavigator(
  {
    Bottom: BottomNav,
    // Auth: AuthNav,

    PlaceScreen: {screen: PlaceScreen},
    PlaceDetailScreen: {screen: PlaceDetailScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Bottom',
  },
);

export default MainNav;
