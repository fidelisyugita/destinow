import React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';
import I18n from '../I18n';

import HomeScreen from '../Containers/Home';
import InboxScreen from '../Containers/Inbox';
import ProfileScreen from '../Containers/Profile';

const renderItem = (IconSvg = Svgs.IconHome, tintColor, title) => (
  <View style={[AppStyles.alignCenter]}>
    <IconSvg width={s(24)} height={s(24)} fill={tintColor} />
    <Text
      numberOfLines={1}
      style={[
        Fonts.style.footnoteRegular,
        Fonts.style.alignCenter,
        {marginTop: s(2), color: tintColor, width: s(65)},
      ]}>
      {title}
    </Text>
  </View>
);

const BottomNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: (navigation) => ({
        title: I18n.t('home'),
        tabBarIcon: ({focused, tintColor}) =>
          renderItem(Svgs.IconHome, tintColor, I18n.t('home')),
      }),
    },
    Inbox: {
      screen: InboxScreen,
      navigationOptions: (navigation) => ({
        title: I18n.t('inbox'),
        tabBarIcon: ({focused, tintColor}) =>
          renderItem(Svgs.IconInbox, tintColor, I18n.t('inbox')),
      }),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: (navigation) => ({
        title: I18n.t('profile'),
        tabBarIcon: ({focused, tintColor}) =>
          renderItem(Svgs.IconProfile, tintColor, I18n.t('profile')),
      }),
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showLabel: false,
      inactiveTintColor: Colors.neutral3,
      activeTintColor: Colors.blue,
      style: {
        // ...AppStyles.shadow,
        height: Metrics.bottomNavigationHeight,
      },
    },
  },
);

export default BottomNav;
