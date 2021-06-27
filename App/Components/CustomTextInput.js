import React, {useState, useEffect, memo} from 'react';
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
  textInputStyle = {},
  multiline = false,
  ...textInputProps
}) => {
  const [isFocus, setFocus] = useState(false);

  return (
    <View>
      <View
        style={[
          AppStyles.justifyCenter,
          {
            height: s(48),
            paddingHorizontal: s(16),
            borderRadius: s(6),
            borderWidth: s(1),
            borderColor: errorMessage
              ? Colors.red
              : isFocus
              ? Colors.blue
              : Colors.neutral3,
          },
          containerStyle,
        ]}>
        {(placeholder || value.length > 0) && label && (
          <Text style={[Fonts.style.footnoteRegular, {color: Colors.neutral2}]}>
            {label}
          </Text>
        )}
        <TextInput
          onFocus={() => setFocus(true)}
          onEndEditing={() => setFocus(false)}
          // onTouchEnd={() => setFocus(false)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder || label}
          style={[
            Fonts.style.subDescriptionRegular,
            {padding: 0, height: s(20), textAlignVertical: 'top'},
            textInputStyle,
          ]}
          placeholderTextColor={placeholder ? Colors.neutral3 : Colors.neutral2}
          multiline={multiline}
          {...textInputProps}
        />
      </View>

      {errorMessage && (
        <Text
          style={[
            Fonts.style.subDescriptionRegular,
            {marginTop: s(8), color: Colors.red},
          ]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default CustomTextInput;
