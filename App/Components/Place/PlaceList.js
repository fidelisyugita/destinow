import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from '../RatingStar';

const PlaceList = ({
  containerStyle = {marginHorizontal: s(16)},
  onPress = () => {},

  imageSrc = Images.default11,
  name = '',
  rating = 0,
  description = '',
  caption = '',
}) => (
  <View
    style={[
      {
        paddingVertical: s(24),
        borderColor: Colors.neural3,
        borderBottomWidth: s(1),
      },
      containerStyle,
    ]}>
    <TouchableOpacity onPress={onPress} style={[AppStyles.row]}>
      <Image
        source={imageSrc}
        style={{width: s(100), height: s(100), borderRadius: s(16)}}
      />
      <View style={{marginLeft: s(16)}}>
        <Text style={[Fonts.style.descriptionBold]}>{name || '-'}</Text>
        <RatingStar
          totalStar={rating}
          color={Colors.blue}
          containerStyle={{marginTop: s(4)}}
        />
        <Text style={[Fonts.style.captionRegular, {marginTop: s(18)}]}>
          {description || '-'}
        </Text>
        <Text
          style={[
            Fonts.style.captionRegular,
            {marginTop: s(2), color: Colors.neural2},
          ]}>
          {caption || '-'}
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default PlaceList;
