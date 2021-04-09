import React, {memo} from 'react';
import {View} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const VerticalLine = ({style = {}}) => {
  return (
    <View
      style={[
        {
          width: s(1),
          height: '100%',
          backgroundColor: Colors.neutral3,
          marginHorizontal: s(16),
        },
        style,
      ]}
    />
  );
};

export default VerticalLine;
