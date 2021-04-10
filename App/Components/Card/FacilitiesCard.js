import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';
import {IsNotEmpty} from '../../Lib';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';
import CustomFlatList from '../CustomFlatList';

const FacilitiesCard = ({
  containerStyle = {marginTop: s(40)},
  onPress = () => {},
  paramFacilities = {},
}) => {
  let facilities = [];

  if (paramFacilities)
    Object.entries(paramFacilities).forEach((item) => {
      console.log(`${item[0]}: ${item[1]}`);
      if (item[1]) facilities.push(item[0]);
    });

  if (!IsNotEmpty(facilities)) return <View />;

  let facilityData = [];

  if (facilities.includes('parking')) {
    facilityData.push({
      SvgIcon: Svgs.IconParking,
      name: I18n.t('parking'),
    });
  }
  if (facilities.includes('toilet')) {
    facilityData.push({
      SvgIcon: Svgs.IconToilet,
      name: I18n.t('toilet'),
    });
  }
  if (facilities.includes('wifi')) {
    facilityData.push({
      SvgIcon: Svgs.IconWifi,
      name: I18n.t('wifi'),
    });
  }
  if (facilities.includes('mushola')) {
    facilityData.push({
      SvgIcon: Svgs.IconMushola,
      name: I18n.t('mushola'),
    });
  }
  if (facilities.includes('restaurant')) {
    facilityData.push({
      SvgIcon: Svgs.IconRestaurant,
      name: I18n.t('restaurant'),
    });
  }
  if (facilities.includes('lodging')) {
    facilityData.push({
      SvgIcon: Svgs.IconLodging,
      name: I18n.t('lodging'),
    });
  }
  if (facilities.includes('playground')) {
    facilityData.push({
      SvgIcon: Svgs.IconPlayground,
      name: I18n.t('playground'),
    });
  }
  if (facilities.includes('watersport')) {
    facilityData.push({
      SvgIcon: Svgs.IconWatersport,
      name: I18n.t('watersport'),
    });
  }

  if (!IsNotEmpty(facilityData)) return <View />;

  return (
    <View style={containerStyle}>
      <Text style={[Fonts.style.subTitle]}>{I18n.t('facility')}</Text>
      <CustomFlatList
        data={facilityData}
        numColumns={2}
        renderItem={({item, index}) => (
          <View
            key={item + index}
            style={[
              AppStyles.flex1,
              AppStyles.row,
              AppStyles.alignCenter,
              {marginTop: s(16)},
            ]}>
            <item.SvgIcon width={s(24)} height={s(24)} fill={Colors.blue} />
            <Text
              style={[
                Fonts.style.descriptionRegular,
                Fonts.style.transformCapitalize,
                Fonts.style.alignCenter,
                {marginLeft: s(8)},
              ]}>
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default FacilitiesCard;
