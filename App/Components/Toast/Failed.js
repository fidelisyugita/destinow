import React from 'react';
import {Text, View} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';

const Failed = ({message = ''}) => {
  return (
    <View
      style={[
        AppStyles.justifyCenter,
        {
          width: s(382),
          padding: s(12),
          minHeight: s(44),
          borderRadius: s(3),
          marginHorizontal: s(16),
          backgroundColor: Colors.red,
        },
      ]}>
      <Text style={[Fonts.style.subDescriptionRegular, {color: Colors.white}]}>
        {message}
      </Text>
    </View>
  );
};

export default Failed;
