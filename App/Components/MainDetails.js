import React, {memo} from 'react';
import {View, Text} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';
import I18n from '../I18n';

import RatingStar from './RatingStar';
import VerticalLine from './VerticalLine';
import ButtonDefault from './Button/ButtonDefault';
import {OpenMaps} from '../Lib';

const MainDetails = ({
  style = {},
  name = '',
  nameColor = Colors.neutral1,
  address = '',
  rating = 0,
  distance,
  openingHours,
  startFrom,
  coordinate = {},
  caption = null,
}) => {
  return (
    <View style={[{marginTop: s(24), marginHorizontal: s(16)}, style]}>
      <Text style={[Fonts.style.title, {color: nameColor}]}>{name || '-'}</Text>
      <Text style={[Fonts.style.captionRegular, {marginTop: s(2)}]}>
        {address || '-'}
      </Text>
      <RatingStar
        totalStar={rating || 4}
        color={Colors.blue}
        containerStyle={{marginTop: s(4)}}
      />

      <View style={[AppStyles.row, {marginTop: s(24)}]}>
        <View style={[AppStyles.flex1]}>
          <Text style={[Fonts.style.footnoteRegular, {color: Colors.neutral2}]}>
            {I18n.t('distance')}
          </Text>
          <Text style={[Fonts.style.subDescriptionMedium]}>
            {distance || '-'}
          </Text>
        </View>
        <VerticalLine />
        <View style={[AppStyles.flex1]}>
          <Text style={[Fonts.style.footnoteRegular, {color: Colors.neutral2}]}>
            {I18n.t('openingHours')}
          </Text>
          <Text style={[Fonts.style.subDescriptionMedium]}>
            {openingHours || '-'}
          </Text>
        </View>
        <VerticalLine />
        <View style={[AppStyles.flex1]}>
          <Text style={[Fonts.style.footnoteRegular, {color: Colors.neutral2}]}>
            {I18n.t('startFrom')}
          </Text>
          <Text style={[Fonts.style.subDescriptionMedium]}>
            {`IDR ${startFrom}`}
          </Text>
        </View>
      </View>

      <View style={[AppStyles.row, {marginTop: s(24)}]}>
        <ButtonDefault
          SvgIcon={Svgs.IconDirection}
          text={I18n.t('openLocation')}
          onPress={() => OpenMaps(coordinate)}
        />
        <ButtonDefault
          SvgIcon={Svgs.IconPhone}
          buttonStyle={{flex: 0, width: s(48), marginLeft: s(8)}}
          textColor={Colors.blue}
          buttonColor={Colors.white}
          isBordered
        />
      </View>

      {caption && (
        <Text
          style={[
            Fonts.style.captionRegular,
            Fonts.style.alignCenter,
            {color: Colors.neutral2, marginTop: s(16)},
          ]}>
          {caption}
        </Text>
      )}
    </View>
  );
};

export default MainDetails;
