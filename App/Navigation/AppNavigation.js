import {createAppContainer, createSwitchNavigator} from 'react-navigation';

// import MainNav from './MainNavigation';
import OnboardingNav from './OnboardingNavigation';

import LaunchScreen from '../Containers/LaunchScreen';

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator(
  {
    LaunchScreen: {screen: LaunchScreen},
    Onboarding: OnboardingNav,
    // Main: MainNav,
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LaunchScreen',
    // navigationOptions: {
    //   headerStyle: styles.header
    // }
  },
);

export default createAppContainer(PrimaryNav);
