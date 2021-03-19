import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

const ButtonIcon = ({
  onPress = () => {},
  text = '',

  textStyle = Fonts.style.captionMedium,
  textColor = Colors.neutral1,
  textDistance = s(4),

  buttonColor = Colors.lightBlue,
  buttonStyle = {},

  SvgIcon = Svgs.IconPlace,
  iconSize = s(40),

  disabled = false,
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[AppStyles.alignCenter, buttonStyle]}>
    <View
      style={[
        AppStyles.alignCenter,
        AppStyles.justifyCenter,
        {
          width: s(56),
          height: s(56),
          backgroundColor: buttonColor,
          borderRadius: s(16),
        },
      ]}>
      <SvgIcon width={iconSize} height={iconSize} />
    </View>

    <Text style={[textStyle, {color: textColor, marginTop: textDistance}]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default ButtonIcon;
