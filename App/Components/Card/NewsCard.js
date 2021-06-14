import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';

const NewsCard = ({
  containerStyle = {marginHorizontal: s(16)},
  onPress = () => {},
  imageSrc = null,
  caption = '',
  title = '',
  description = null,
  hideBorderTop = false,
  hideBorderBottom = true,
}) => (
  <View
    style={[
      {
        paddingVertical: s(24),
        borderColor: Colors.neutral3,
        borderTopWidth: hideBorderTop ? 0 : s(1),
        borderBottomWidth: hideBorderBottom ? 0 : s(1),
      },
      containerStyle,
    ]}>
    <TouchableOpacity onPress={onPress}>
      <Text numberOfLines={2} style={[Fonts.style.subDescriptionMedium]}>
        {title}
      </Text>
      {description && (
        <Text
          numberOfLines={2}
          style={[
            Fonts.style.captionRegular,
            {marginTop: s(4), color: Colors.neutral2},
          ]}>
          {description}
        </Text>
      )}
      {imageSrc && (
        <CustomImage
          source={imageSrc}
          defaultSource={Images.default31}
          style={{
            width: '100%',
            height: s(153),
            borderRadius: s(16),
            marginTop: s(16),
          }}
        />
      )}
      <Text
        numberOfLines={1}
        style={[
          Fonts.style.footnoteRegular,
          {marginTop: s(8), color: Colors.neutral2},
        ]}>
        {caption}
      </Text>
    </TouchableOpacity>
  </View>
);

export default NewsCard;
