import React, {memo} from 'react';
import {View, Text, TouchableOpacity, Image, Platform} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

const CustomHeader = memo(
  ({
    onBack = null,
    BackIcon = Svgs.IconArrowLeft,
    title = null,
    description = null,
    rightIcons = [], // {onPress: () => {}, SvgIcon: Svgs.IconStar}
    style = {},
    transparent = false,
    transparentOpacity = 0, // 0-1 | float
  }) => {
    const distanceNotch = Platform.OS === 'ios' ? Metrics.statusBarHeight : 0;
    const distanceBody =
      Platform.OS === 'ios'
        ? Metrics.headerHeight + Metrics.statusBarHeight
        : Metrics.headerHeight;
    const iconColor =
      transparent && transparentOpacity < 0.7 ? Colors.white : Colors.blue;

    return (
      <View
        style={[
          AppStyles.zIndex1,
          AppStyles.row,
          AppStyles.alignCenter,
          transparent ? AppStyles.positionAbstolute : {},
          {
            height: Metrics.headerHeight + s(transparentOpacity),
            width: '100%',
            backgroundColor: transparent
              ? `rgba(255,255,255, ${transparentOpacity})`
              : Colors.white,
            marginTop: transparent ? distanceNotch : 0,
            marginBottom: transparent ? distanceBody : 0,
            borderBottomWidth: s(transparentOpacity),
            borderColor: Colors.neutral3,
          },
          style,
        ]}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={{
              padding: s(4),
              marginLeft: s(16 - 4),
            }}>
            <BackIcon width={s(24)} height={s(24)} fill={iconColor} />
          </TouchableOpacity>
        ) : (
          <View style={{width: s(4)}} />
        )}
        <View
          style={[
            AppStyles.flex1,
            AppStyles.justifyCenter,
            {marginHorizontal: s(16 - 4)},
          ]}>
          {title && (
            <Text style={[Fonts.style.subDescriptionMedium]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {description && (
            <Text
              style={[Fonts.style.footnoteRegular, {color: Colors.neutral2}]}
              numberOfLines={1}>
              {description}
            </Text>
          )}
        </View>
        <View
          style={[
            AppStyles.row,
            AppStyles.alignCenter,
            {marginRight: s(16 - 4)},
          ]}>
          {rightIcons.map(({SvgIcon, onPress}, index) => {
            if (SvgIcon)
              return (
                <TouchableOpacity
                  key={'headerRightIcon' + index}
                  onPress={onPress}
                  style={{padding: s(4)}}>
                  <SvgIcon width={s(24)} height={s(24)} fill={iconColor} />
                </TouchableOpacity>
              );
          })}
        </View>
      </View>
    );
  },
);

export default CustomHeader;
