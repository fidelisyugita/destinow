import React, {memo} from 'react';
import {View, Text} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const EmptyState = ({
  containerStyle = {},
  SvgImage = Svgs.EmptyNotification,
  imageSize = s(224),
  text = '',
  caption = '',
}) => {
  return (
    <View
      style={[
        AppStyles.flex1,
        AppStyles.alignCenter,
        AppStyles.justifyCenter,
        {marginHorizontal: s(32)},
        containerStyle,
      ]}>
      <SvgImage width={imageSize} height={imageSize} />
      <Text style={[Fonts.style.descriptionBold, {marginTop: s(16)}]}>
        {text}
      </Text>
      <Text
        style={[
          Fonts.style.descriptionRegular,
          Fonts.style.alignCenter,
          {marginTop: s(8)},
        ]}>
        {caption}
      </Text>
    </View>
  );
};

export default EmptyState;
