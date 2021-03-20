import React, {memo} from 'react';
import {Text} from 'react-native';

import {Fonts} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const TitleBar = memo(({title = '', style = {}}) => {
  return (
    <Text
      style={[
        Fonts.style.title,
        {marginTop: s(56), marginHorizontal: s(16)},
        style,
      ]}>
      {title}
    </Text>
  );
});

export default TitleBar;
