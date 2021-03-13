import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from './RatingStar';

const PlaceCard = ({
  containerStyle = {margin: s(8)},

  imageUri = null,
  location = '',
  name = '',
  rating = 0,
}) => (
  <TouchableOpacity style={containerStyle}>
    <View>
      <Image
        source={{uri: imageUri}}
        style={{width: s(225), height: s(300), borderRadius: s(16)}}
      />
      <Image
        source={Images.overlayBackground}
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
      <Text style={[Fonts.style.subDescriptionRegular, {color: Colors.white}]}>
        {location}
      </Text>
      <Text
        style={[
          Fonts.style.descriptionBold,
          {color: Colors.white, marginTop: s(2)},
        ]}>
        {name}
      </Text>

      <RatingStar totalStar={rating} />
    </View>
  </TouchableOpacity>
);

export default PlaceCard;
