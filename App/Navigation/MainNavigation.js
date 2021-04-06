import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';
// import AuthNav from './AuthNavigation';

import PlaceScreen from '../Containers/Place';
import PlaceDetailScreen from '../Containers/Place/PlaceDetailScreen';

import RestaurantScreen from '../Containers/Restaurant';
import RestaurantDetailScreen from '../Containers/Restaurant/RestaurantDetailScreen';

import SouvenirScreen from '../Containers/Souvenir';
import SouvenirDetailScreen from '../Containers/Souvenir/SouvenirDetailScreen';

import TransportScreen from '../Containers/Transport';
import TransportDetailScreen from '../Containers/Transport/TransportDetailScreen';

const MainNav = createStackNavigator(
  {
    Bottom: BottomNav,
    // Auth: AuthNav,

    PlaceScreen: {screen: PlaceScreen},
    PlaceDetailScreen: {screen: PlaceDetailScreen},

    RestaurantScreen: {screen: RestaurantScreen},
    RestaurantDetailScreen: {screen: RestaurantDetailScreen},

    SouvenirScreen: {screen: SouvenirScreen},
    SouvenirDetailScreen: {screen: SouvenirDetailScreen},

    TransportScreen: {screen: TransportScreen},
    TransportDetailScreen: {screen: TransportDetailScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Bottom',
  },
);

export default MainNav;
