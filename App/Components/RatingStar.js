import React, {memo} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';
import I18n from '../I18n';

const RatingStar = ({
  totalStar = 4,
  containerStyle = {marginTop: s(8)},
  iconSize = s(16),
  color = Colors.lightBlue,
  showText = true,
}) => (
  <View style={[AppStyles.row, AppStyles.alignCenter, containerStyle]}>
    {Array(5)
      .fill({})
      .map((item, index) => {
        const SvgIcon = index < totalStar ? Svgs.IconStarFilled : Svgs.IconStar;

        return (
          <View key={item + index}>
            <SvgIcon width={iconSize} height={iconSize} fill={color} />
          </View>
        );
      })}
    {showText && (
      <Text
        style={[Fonts.style.captionMedium, {color: color, marginLeft: s(6)}]}>
        {parseFloat(totalStar).toFixed(1)}
      </Text>
    )}
  </View>
);

export default RatingStar;
