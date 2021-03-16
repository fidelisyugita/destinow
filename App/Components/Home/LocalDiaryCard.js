import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from './RatingStar';

const LocalDiaryCard = ({
  containerStyle = {margin: s(8)},
  onPress = () => {},

  imageSrc = Images.default11,
  title = '',
  description = '',
  author = '',
}) => (
  <TouchableOpacity style={containerStyle} onPress={onPress}>
    <Image
      source={imageSrc}
      style={{width: s(300), height: s(200), borderRadius: s(16)}}
    />
    <Text
      numberOfLines={2}
      style={[Fonts.style.descriptionBold, {width: s(300), marginTop: s(12)}]}>
      {title || '-'}
    </Text>
    <Text
      numberOfLines={2}
      style={[
        Fonts.style.subDescriptionRegular,
        {width: s(300), marginTop: s(2), color: Colors.neural2},
      ]}>
      {description || '-'}
    </Text>

    <View style={[AppStyles.row, AppStyles.alignCenter, {marginTop: s(8)}]}>
      <Image
        source={Images.defaultProfile}
        style={{width: s(32), height: s(32), borderRadius: s(16)}}
      />
      <Text
        style={[Fonts.style.captionMedium, {width: s(260), marginLeft: s(8)}]}>
        {author || '-'}
      </Text>
    </View>
  </TouchableOpacity>
);

export default LocalDiaryCard;
