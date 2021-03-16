import React from 'react';
import {Text} from 'react-native';

import {Fonts} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const TitleBar = ({title = ''}) => {
  return (
    <Text
      style={[Fonts.style.title, {marginTop: s(56), marginHorizontal: s(16)}]}>
      {title}
    </Text>
  );
};

export default TitleBar;
