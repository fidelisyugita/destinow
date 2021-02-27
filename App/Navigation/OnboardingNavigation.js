import {createStackNavigator} from 'react-navigation-stack';

// import AuthNav from './AuthNavigation';

import OnboardingScreen from '../Containers/Onboarding';

const OnboardingNav = createStackNavigator(
  {
    OnboardingScreen: {screen: OnboardingScreen},
    // Auth: AuthNav,
  },
  {
    headerMode: 'none',
    initialRouteName: 'OnboardingScreen',
  },
);

export default OnboardingNav;
