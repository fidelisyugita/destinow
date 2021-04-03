import React, {memo} from 'react';
import {ScrollView, View} from 'react-native';
import Swiper from 'react-native-swiper';

import {AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

import PaginationDot from './PaginationDot';

const CustomCarausel = memo(
  ({
    data = [],
    renderItem = () => <View />,
    style = {height: s(334)},
    containerStyle = {},
    paginationStyle = {},
    loop = true,
    autoplay = true,
    showsPagination = true,
  }) => {
    return (
      // <ScrollView>
      <Swiper
        index={0}
        loop={loop}
        autoplay={autoplay}
        showsPagination={showsPagination}
        style={style}
        containerStyle={containerStyle}
        renderPagination={(index, total) => (
          <PaginationDot
            index={index}
            total={total}
            style={[AppStyles.alignSelfCenter, paginationStyle]}
          />
        )}>
        {data.map((item, index) => renderItem({item, index}))}
      </Swiper>
      // </ScrollView>
    );
  },
);

export default CustomCarausel;
