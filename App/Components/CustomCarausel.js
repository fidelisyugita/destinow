import React from 'react';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';

import {AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

import PaginationDot from './PaginationDot';

const CustomCarausel = ({
  data = [],
  renderItem = () => <View />,
  style = {},
  paginationStyle = {},
  loop = true,
  autoplay = true,
  showsPagination = true,
}) => {
  return (
    <View style={AppStyles.flex1}>
      <Swiper
        index={0}
        loop={loop}
        autoplay={autoplay}
        showsPagination={showsPagination}
        style={style}
        renderPagination={(index, total) => (
          <PaginationDot
            index={index}
            total={total}
            style={[AppStyles.alignSelfCenter, paginationStyle]}
          />
        )}>
        {data.map((item, index) => renderItem({item, index}))}
      </Swiper>
    </View>
  );
};

export default CustomCarausel;
