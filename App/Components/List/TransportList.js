import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';

const TransportList = ({
  containerStyle = {},
  onPress = () => {},

  imageSrc = Images.default11,
  name = '',
  description = '',
  capacity = 0,
  hideBorderTop = false,
  hideBorderBottom = true,
}) => (
  <View style={[AppStyles.backgroundWhite, AppStyles.flex1]}>
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
      <TouchableOpacity onPress={onPress} style={[AppStyles.row]}>
        <CustomImage
          source={imageSrc}
          defaultSource={Images.default11}
          style={{width: s(78), height: s(78), borderRadius: s(16)}}
        />
        <View style={{marginLeft: s(16)}}>
          <Text style={[Fonts.style.descriptionBold]}>{name || '-'}</Text>
          <Text style={[Fonts.style.captionMedium, {marginTop: s(18)}]}>
            {description || '-'}
          </Text>
          <View
            style={[AppStyles.row, AppStyles.alignCenter, {marginTop: s(2)}]}>
            <Svgs.IconPeople width={s(16)} heigth={s(16)} fill={Colors.blue} />
            <Text
              style={[
                Fonts.style.captionRegular,
                {marginLeft: s(8), color: Colors.neutral2},
              ]}>
              {`${capacity} ${I18n.t('person')}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default TransportList;
