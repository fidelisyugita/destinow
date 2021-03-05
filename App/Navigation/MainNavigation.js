import {createStackNavigator} from 'react-navigation-stack';

import BottomNav from './BottomNavigation';
// import AuthNav from './AuthNavigation';

// import DescriptionScreen from '../Containers/DescriptionScreen';

const MainNav = createStackNavigator(
  {
    Bottom: BottomNav,
    // Auth: AuthNav,

    // DescriptionScreen: {screen: DescriptionScreen},
  },
  {
    headerMode: 'none',
    initialRouteName: 'Bottom',
  },
);

export default MainNav;
