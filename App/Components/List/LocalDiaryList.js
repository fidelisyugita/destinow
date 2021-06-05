import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';

const LocalDiaryList = ({
  containerStyle = {marginHorizontal: s(16)},
  onPress = () => {},
  imageSrc = Images.default11,
  title = '',
  description = '',
  authorImageSrc = null,
  authorName = '',
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
    <TouchableOpacity style={[AppStyles.row]} onPress={onPress}>
      <CustomImage
        source={imageSrc}
        defaultSource={Images.default11}
        style={{width: s(84), height: s(84), borderRadius: s(16)}}
      />
      <View style={{marginLeft: s(16), width: s(282)}}>
        <Text numberOfLines={2} style={[Fonts.style.descriptionBold]}>
          {title || '-'}
        </Text>
        <Text
          numberOfLines={2}
          style={[Fonts.style.subDescriptionRegular, {marginTop: s(2)}]}>
          {description || '-'}
        </Text>

        <View style={[AppStyles.row, AppStyles.alignCenter, {marginTop: s(8)}]}>
          <CustomImage
            source={
              authorImageSrc ? {uri: authorImageSrc} : Images.defaultProfile
            }
            defaultSource={Images.defaultProfile}
            style={{width: s(32), height: s(32), borderRadius: s(16)}}
          />
          <Text
            style={[
              Fonts.style.captionMedium,
              {width: s(242), marginLeft: s(8)},
            ]}>
            {authorName || '-'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

export default LocalDiaryList;
