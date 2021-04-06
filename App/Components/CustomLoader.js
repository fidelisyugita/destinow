import React from 'react';
import {View, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const CustomLoader = ({size = s(100), imageSrc = Images.loader}) => (
  <View style={[AppStyles.alignCenter, {marginVertical: s(16)}]}>
    <Image
      source={imageSrc}
      style={{width: size, height: size / 2}}
      resizeMode="contain"
    />
  </View>
);

export default CustomLoader;
