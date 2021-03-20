import React, {memo} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

const ButtonDefault = memo(({onPress = () => {}, text = '',
  textStyle = Fonts.style.descriptionMedium, textColor = Colors.white,
  buttonColor = Colors.blue, buttonStyle = {},
  SvgIcon = null, iconSize = s(24), iconDistance = s(8),
  isBordered = false, disabled = false, isLoading = false}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[
      AppStyles.flex1,
      AppStyles.row,
      AppStyles.justifyCenter,
      AppStyles.alignCenter,
      {
        backgroundColor: buttonColor,
        borderRadius: s(8),
        height: s(48),
        borderColor: textColor,
        borderWidth: isBordered ? s(1) : 0,
      },
      buttonStyle,
    ]}>
    {isLoading ? (
      <ActivityIndicator
        size="small"
        color={textColor}
        style={{marginRight: s(8)}}
      />
    ) : (
      <View>
        {SvgIcon && (
          <View style={{marginRight: iconDistance}}>
            <SvgIcon
              width={iconSize}
              height={iconSize}
              style={{color: textColor}}
            />
          </View>
        )}
        <Text style={[textStyle, {color: textColor}]}>{text}</Text>
      </View>
    )}
  </TouchableOpacity>
));

export default ButtonDefault;
