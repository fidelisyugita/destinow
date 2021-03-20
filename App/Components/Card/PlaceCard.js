import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';

const PlaceCard = memo(({containerStyle = {margin: s(8)}, onPress = () => {},
  imageSrc = Images.default34, location = null, name = '', rating = 0}) => (
  <TouchableOpacity style={containerStyle} onPress={onPress}>
    <View>
      <CustomImage
        source={imageSrc}
        defaultSource={Images.default34}
        defa={imageSrc}
        style={{width: s(225), height: s(300), borderRadius: s(16)}}
      />
      <Image
        source={Images.overlay34}
        style={[
          AppStyles.positionAbstolute,
          {bottom: 0, width: s(225), height: s(145)},
        ]}
      />
    </View>
    <View
      style={[
        AppStyles.positionAbstolute,
        {bottom: s(16), left: s(16), width: s(225 - 32)},
      ]}>
      {location && (
        <Text style={[Fonts.style.captionRegular, {color: Colors.white}]}>
          {location}
        </Text>
      )}
      <Text
        style={[
          Fonts.style.descriptionBold,
          {color: Colors.white, marginTop: s(2)},
        ]}>
        {name || '-'}
      </Text>

      <RatingStar totalStar={rating} />
    </View>
  </TouchableOpacity>
));

export default PlaceCard;
