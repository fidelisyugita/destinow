import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';
import I18n from '../I18n';
import {IsNotEmpty} from '../Lib';

import CustomCarausel from './CustomCarausel';
import CustomImage from './CustomImage';

const CarauselTop = ({
  style = {},
  images = [],
  cover = null,
  width = s(414),
  height = s(414),
}) => {
  const renderItem = ({src}, index) => {
    return (
      <CustomImage
        key={src}
        source={src ? {uri: src} : Images.default11}
        defaultSource={Images.default11}
        style={{width: width, height: height}}
      />
    );
  };

  return (
    <View style={[AppStyles.positionAbstolute, style]}>
      {IsNotEmpty(images) ? (
        <CustomCarausel
          loop={true}
          autoplay={true}
          data={images}
          style={{height: height}}
          paginationStyle={{top: -s(8 + 48 + Metrics.statusBarHeight)}}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      ) : (
        <CustomImage
          source={cover ? {uri: cover.src} : Images.default11}
          defaultSource={Images.default11}
          style={{width: width, height: height}}
        />
      )}
      <Image
        source={Images.overlayHeader}
        style={[AppStyles.positionAbstolute, {width: width, height: s(121)}]}
      />
    </View>
  );
};

export default CarauselTop;
