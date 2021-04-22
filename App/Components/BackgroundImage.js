import React, {memo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const BackgroundImage = ({
  style = {},
  imageSrc = Images.tourismPlace,
  text = I18n.t('exploreBelitungTourismPlace'),
  description = `1,350 ${I18n.t('tourismPlace')}`,
}) => {
  return (
    <View
      style={[
        AppStyles.positionAbstolute,
        {
          marginTop: Platform.OS === 'ios' ? Metrics.statusBarHeight : 0,
          width: '100%',
        },
        style,
      ]}>
      <Image
        source={imageSrc}
        style={[AppStyles.positionAbstolute, {width: s(414), height: s(225)}]}
      />
      <View
        style={[
          AppStyles.alignCenter,
          {marginTop: s(64), marginHorizontal: s(16)},
        ]}>
        <Text style={[Fonts.style.title, {color: Colors.white}]}>{text}</Text>
        <View
          style={{
            marginTop: s(4),
            paddingVertical: s(4),
            paddingHorizontal: s(8),
            borderRadius: s(16),
            backgroundColor: Colors.blue,
          }}>
          <Text style={[Fonts.style.footnoteRegular, {color: Colors.white}]}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BackgroundImage;
