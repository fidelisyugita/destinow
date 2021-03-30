import React, {memo} from 'react';
import {View, ScrollView} from 'react-native';

import {Colors, Fonts, Images, Metrics, AppStyles, Svgs} from '../Themes';
import I18n from '../I18n';

const CustomFlatList = memo(
  ({
    data = [],
    renderItem = () => <View />,
    numColumns = 1,
    style = {},
    contentContainerStyle = {},
    horizontal = false,
  }) => {
    let flatList = [];
    for (let i = 0; i < data.length; i += numColumns) {
      let tempColumn = [];
      for (
        let j = i;
        j < numColumns * (flatList.length + 1) && j < data.length;
        j++
      ) {
        tempColumn.push(renderItem({item: data[j], index: j}));
      }
      flatList.push(
        <View key={data[i] + i} style={horizontal ? {} : AppStyles.row}>
          {tempColumn}
        </View>,
      );
    }

    if (horizontal)
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={style}
          contentContainerStyle={contentContainerStyle}>
          {flatList}
        </ScrollView>
      );

    return <View style={[style]}>{flatList}</View>;
  },
);

export default CustomFlatList;
