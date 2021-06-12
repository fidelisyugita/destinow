import React, {memo} from 'react';
import {Text, TouchableOpacity} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {DateFormatter, GetDistance, IsNotEmpty, Toast} from '../../Lib';
import I18n from '../../I18n';

const Success = memo(
  ({
    text1 = '',
    onTrailingIconPress = null,
    onPress = null,
    trailingIcon = I18n.t('view'),
  }) => {
    return (
      <TouchableOpacity
        disabled
        style={[
          AppStyles.justifyBetween,
          AppStyles.row,
          AppStyles.alignCenter,
          {
            minHeight: s(44),
            width: s(382),
            backgroundColor: Colors.blue,
            borderRadius: s(3),
            marginHorizontal: s(16),
            padding: s(12),
            bottom: s(0),
          },
        ]}>
        <Text
          style={[Fonts.style.subDescriptionRegular, {color: Colors.white}]}>
          {text1}
        </Text>
        {onPress ? (
          <TouchableOpacity delayPressIn={0} onPress={onPress}>
            <Text
              style={[
                Fonts.style.subDescriptionSemibold,
                Fonts.style.underline,
                {color: Colors.white},
              ]}>
              {trailingIcon}
            </Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  },
);

export default Success;
