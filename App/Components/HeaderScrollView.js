import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';

import CustomHeader from './CustomHeader';

const HEADER_MAX_HEIGHT = s(104);
const HEADER_MIN_HEIGHT = s(56);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const HeaderScrollView = ({
  onBack,
  BackIcon = Svgs.IconArrowLeft,
  title = null,
  description = null,
  rightIcons = [],
  children,
  containerStyle,
  contentContainerStyle,
  scrollViewProps,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const bigHeaderTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });
  const backOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.83],
    extrapolate: 'clamp',
  });
  const headerOpacity = scrollY.interpolate({
    inputRange: [HEADER_SCROLL_DISTANCE - 0.01, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={containerStyle}>
      <Animated.ScrollView
        contentContainerStyle={[
          {paddingTop: HEADER_MAX_HEIGHT},
          contentContainerStyle,
        ]}
        // scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: true,
          },
        )}
        {...scrollViewProps}>
        {children && children}
      </Animated.ScrollView>

      <Animated.View
        style={[
          AppStyles.positionAbstolute,
          {
            width: '100%',
            transform: [{translateY: bigHeaderTranslateY}],
          },
        ]}>
        <Animated.View
          style={[
            AppStyles.row,
            AppStyles.alignCenter,
            {opacity: backOpacity},
          ]}>
          <TouchableOpacity
            onPress={onBack}
            style={{padding: s(8), margin: s(8)}}>
            <BackIcon
              width={s(24)}
              height={s(24)}
              style={{color: Colors.neutral1}}
            />
          </TouchableOpacity>
          <View style={[AppStyles.flex1]} />
          <View style={[AppStyles.row, {marginLeft: s(16), marginRight: s(8)}]}>
            {rightIcons.map(
              ({SvgIcon, onPress}, index) =>
                SvgIcon && (
                  <TouchableOpacity
                    key={'rightIcon' + index}
                    onPress={onPress}
                    style={{padding: s(8)}}>
                    <SvgIcon
                      width={s(24)}
                      height={s(24)}
                      style={{color: Colors.neutral1}}
                    />
                  </TouchableOpacity>
                ),
            )}
          </View>
        </Animated.View>

        <Animated.View
          style={[
            AppStyles.flex1,
            {paddingHorizontal: s(16), marginBottom: s(14)},
            {
              transform: [{scale: titleScale}],
            },
          ]}>
          {title && (
            <Text style={[Fonts.style.title]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {/* {description && (
            <Text
              style={[
                Fonts.style.subDescriptionRegular,
                {color: Colors.neutral2},
              ]}
              numberOfLines={1}>
              {description}
            </Text>
          )} */}
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          AppStyles.positionAbstolute,
          {
            width: '100%',
            opacity: headerOpacity,
            // transform: [{translateY: headerTranslateY}],
          },
        ]}>
        <CustomHeader
          onBack={onBack}
          BackIcon={BackIcon}
          title={title}
          description={description}
          rightIcons={rightIcons}
        />
      </Animated.View>
    </View>
  );
};

export default HeaderScrollView;
