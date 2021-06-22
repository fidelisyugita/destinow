import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {IsNotEmpty} from '../../Lib';
import I18n from '../../I18n';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';

const ReviewList = ({
  containerStyle = {},
  creatorName = '',
  creatorImageSrc = Images.defaultProfile,
  rate = 0,
  caption = '',
  text = '',
  images = null,
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
    <View style={[AppStyles.row, AppStyles.alignCenter, AppStyles.flex1]}>
      <CustomImage
        source={creatorImageSrc}
        style={{
          width: s(48),
          height: s(48),
          borderRadius: s(48 / 2),
        }}
      />
      <View style={[{marginLeft: s(16)}]}>
        <Text
          numberOfLines={1}
          style={[Fonts.style.descriptionBold, {width: s(316)}]}>
          {creatorName}
        </Text>
        <View style={[AppStyles.row, AppStyles.alignCenter, {marginTop: s(4)}]}>
          {Array(5)
            .fill(false)
            .map((item, index) => {
              const SvgIcon =
                index < rate ? Svgs.IconStarFilled : Svgs.IconStar;
              return (
                <View key={item + index}>
                  <SvgIcon width={s(16)} height={s(16)} fill={Colors.blue} />
                </View>
              );
            })}
          <Text
            style={[
              AppStyles.flex1,
              Fonts.style.captionMedium,
              {color: Colors.blue, marginLeft: s(8)},
            ]}>
            {rate}.0
          </Text>
          <Text style={[Fonts.style.captionRegular, {color: Colors.neutral2}]}>
            {caption}
          </Text>
        </View>
      </View>
    </View>
    <Text style={[Fonts.style.descriptionRegular, {marginTop: s(16)}]}>
      {text}
    </Text>

    {IsNotEmpty(images) && (
      <View style={[AppStyles.row, {marginTop: s(8)}]}>
        {images.map((item, index) => (
          <CustomImage
            key={item + index}
            source={{uri: item}}
            style={{
              width: s(70),
              height: s(70),
              borderRadius: s(8),
              marginRight: s(8),
            }}
          />
        ))}
      </View>
    )}
  </View>
);

export default ReviewList;
