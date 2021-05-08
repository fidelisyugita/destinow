import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';
import I18n from '../I18n';

const CustomTextInput = ({
  label = null,
  placeholder = null,
  value = '',
  secureTextEntry = false,
  errorMessage = null,
  onChangeText = () => {},
  containerStyle = {},
}) => (
  <View
    style={[
      AppStyles.justifyCenter,
      {
        height: s(48),
        paddingHorizontal: s(16),
        borderRadius: s(6),
        borderColor: Colors.neutral3,
        borderWidth: s(1),
      },
      containerStyle,
    ]}>
    {(placeholder || value.length > 0) && label && (
      <Text style={[Fonts.style.footnoteRegular, {color: Colors.neutral2}]}>
        {label}
      </Text>
    )}
    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder || label}
      style={[Fonts.style.subDescriptionRegular]}
      placeholderTextColor={placeholder ? Colors.neutral3 : Colors.neutral2}
    />
    {errorMessage && (
      <Text
        style={[
          Fonts.style.captionRegular,
          {marginTop: s(4), color: Colors.red},
        ]}>
        {errorMessage}
      </Text>
    )}
  </View>
);

export default CustomTextInput;
