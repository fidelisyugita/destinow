import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';
import {IsNotEmpty} from '../../Lib';

import RatingStar from '../RatingStar';
import CustomImage from '../CustomImage';
import CustomFlatList from '../CustomFlatList';

const TypesCard = ({
  containerStyle = {marginTop: s(40)},
  onPress = () => {},
  paramTransportTypes = {},
}) => {
  let transportTypes = [];

  if (paramTransportTypes)
    Object.entries(paramTransportTypes).forEach((item) => {
      console.log(`${item[0]}: ${item[1]}`);
      if (item[1]) transportTypes.push(item[0]);
    });

  if (!IsNotEmpty(transportTypes)) return <View />;

  let transportTypeData = [];

  if (transportTypes.includes('car')) {
    transportTypeData.push({
      SvgIcon: Svgs.IconCar,
      name: I18n.t('car'),
    });
  }
  if (transportTypes.includes('motorcycle')) {
    transportTypeData.push({
      SvgIcon: Svgs.IconMotorcycle,
      name: I18n.t('motorcycle'),
    });
  }
  if (transportTypes.includes('bike')) {
    transportTypeData.push({
      SvgIcon: Svgs.IconBike,
      name: I18n.t('bike'),
    });
  }
  if (transportTypes.includes('boat')) {
    transportTypeData.push({
      SvgIcon: Svgs.IconBoat,
      name: I18n.t('boat'),
    });
  }

  if (!IsNotEmpty(transportTypeData)) return <View />;

  return (
    <View style={containerStyle}>
      <Text style={[Fonts.style.subTitle]}>{I18n.t('transportType')}</Text>
      <CustomFlatList
        data={transportTypeData}
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

export default TypesCard;
