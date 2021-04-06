import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';

const NewsList = ({
  containerStyle = {marginHorizontal: s(16)},
  onPress = () => {},
  imageSrc = Images.default11,
  caption = '',
  text = '',
  hideBorderTop = false,
  hideBorderBottom = true,
}) => (
  <View
    style={[
      {
        paddingVertical: s(16),
        borderColor: Colors.neutral3,
        borderTopWidth: hideBorderTop ? 0 : s(1),
        borderBottomWidth: hideBorderBottom ? 0 : s(1),
      },
      containerStyle,
    ]}>
    <TouchableOpacity
      style={[AppStyles.row, AppStyles.alignCenter]}
      onPress={onPress}>
      <CustomImage
        source={imageSrc}
        defaultSource={Images.default11}
        style={{width: s(84), height: s(84), borderRadius: s(16)}}
      />
      <View style={{marginLeft: s(16), width: s(282)}}>
        <Text
          numberOfLines={1}
          style={[Fonts.style.captionRegular, {color: Colors.neutral2}]}>
          {caption}
        </Text>
        <Text
          numberOfLines={2}
          style={[Fonts.style.descriptionBold, {marginTop: s(8)}]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default NewsList;
