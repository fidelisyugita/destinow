import React, {memo} from 'react';
import {View} from 'react-native';

import {AppStyles, Colors} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const CustomBody = memo(({style = {}, children}) => {
  return (
    <View
      style={[
        AppStyles.flex1,
        AppStyles.backgroundWhite,
        {
          marginTop: s(16),
          borderTopLeftRadius: s(32),
          borderTopRightRadius: s(32),
        },
        style,
      ]}>
      <View
        style={[
          AppStyles.alignSelfCenter,
          {
            width: s(54),
            height: s(4),
            marginTop: s(8),
            backgroundColor: Colors.neutral4,
            borderRadius: s(2),
          },
        ]}
      />
      {children && children}
    </View>
  );
});

export default CustomBody;
