import React, {memo} from 'react';
import {Text} from 'react-native';

import {Fonts} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const TitleBar = ({title = '', style = {}}) => {
  return (
    <Text
      style={[
        Fonts.style.title,
        {marginTop: s(48), marginHorizontal: s(16)},
        style,
      ]}>
      {title}
    </Text>
  );
};

export default TitleBar;
