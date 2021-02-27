import React from 'react';
import {View} from 'react-native';

import {Colors, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const PaginationDot = ({total = 2, index = 0, style = {}}) => {
  let dots = [];
  for (let i = 0; i < total; i++) {
    dots.push(
      <View
        key={'dot' + i}
        style={{
          width: i === index ? s(16) : s(8),
          height: s(8),
          borderRadius: s(4),
          marginHorizontal: s(2),
          backgroundColor: i === index ? Colors.blue : Colors.neural4,
        }}
      />,
    );
  }

  return <View style={[AppStyles.row, style]}>{dots}</View>;
};

export default PaginationDot;
