import React, {memo} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

const ButtonList = ({
  onPress = () => {},

  SvgLeftIcon = null,
  iconSize = s(24),
  iconColor = Colors.blue,

  SvgRightIcon = Svgs.IconArrowRight,
  rightIconColor = Colors.neutral3,

  text = null,
  textStyle = Fonts.style.descriptionMedium,
  textColor = Colors.neutral1,

  description = null,
  descriptionStyle = Fonts.style.captionRegular,
  descriptionColor = Colors.neutral2,

  buttonStyle = {},

  isTopBordered = false,
  isBottomBordered = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      AppStyles.flex1,
      AppStyles.row,
      AppStyles.alignCenter,
      {
        paddingVertical: s(16),
        borderColor: Colors.neutral4,
        borderTopWidth: isTopBordered ? s(1) : 0,
        borderBottomWidth: isBottomBordered ? s(1) : 0,
      },
      buttonStyle,
    ]}>
    {SvgLeftIcon && (
      <View style={{marginRight: s(12)}}>
        <SvgLeftIcon width={iconSize} height={iconSize} fill={iconColor} />
      </View>
    )}
    <View style={[AppStyles.flex1]}>
      {text && <Text style={[textStyle, {color: textColor}]}>{text}</Text>}
      {description && (
        <Text
          style={[
            descriptionStyle,
            {color: descriptionColor, marginTop: s(2)},
          ]}>
          {description}
        </Text>
      )}
    </View>

    {SvgRightIcon && (
      <View style={{marginLeft: s(12)}}>
        <SvgRightIcon
          width={iconSize}
          height={iconSize}
          fill={rightIconColor}
        />
      </View>
    )}
  </TouchableOpacity>
);

export default ButtonList;
