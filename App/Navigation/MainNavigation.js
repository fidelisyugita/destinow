import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';
import AuthNav from './AuthNavigation';

import PlaceScreen from '../Containers/Place';
import PlaceDetailScreen from '../Containers/Place/PlaceDetailScreen';

import RestaurantScreen from '../Containers/Restaurant';
import RestaurantDetailScreen from '../Containers/Restaurant/RestaurantDetailScreen';

import SouvenirScreen from '../Containers/Souvenir';
import SouvenirDetailScreen from '../Containers/Souvenir/SouvenirDetailScreen';

import TransportScreen from '../Containers/Transport';
import TransportDetailScreen from '../Containers/Transport/TransportDetailScreen';

import NewsScreen from '../Containers/News';
import NewsDetailScreen from '../Containers/News/NewsDetailScreen';

import LocalDiaryScreen from '../Containers/LocalDiary';
import LocalDiaryDetailScreen from '../Containers/LocalDiary/LocalDiaryDetailScreen';
import SubmitLocalDiaryScreen from '../Containers/LocalDiary/SubmitLocalDiaryScreen';

const MainNav = createStackNavigator(
  {
    Bottom: BottomNav,
    /**
     * TODO
     * make sure auth navigation
     */
    Auth: AuthNav,

    PlaceScreen: {screen: PlaceScreen},
    PlaceDetailScreen: {screen: PlaceDetailScreen},

    RestaurantScreen: {screen: RestaurantScreen},
    RestaurantDetailScreen: {screen: RestaurantDetailScreen},

    SouvenirScreen: {screen: SouvenirScreen},
    SouvenirDetailScreen: {screen: SouvenirDetailScreen},

    TransportScreen: {screen: TransportScreen},
    TransportDetailScreen: {screen: TransportDetailScreen},

    NewsScreen: {screen: NewsScreen},
    NewsDetailScreen: {screen: NewsDetailScreen},

    LocalDiaryScreen: {screen: LocalDiaryScreen},
    LocalDiaryDetailScreen: {screen: LocalDiaryDetailScreen},
    SubmitLocalDiaryScreen: {screen: SubmitLocalDiaryScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Bottom',
  },
);

export default MainNav;
