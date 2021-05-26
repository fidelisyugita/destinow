import React, {memo} from 'react';
import {Modal, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import ButtonDefault from '../Button/ButtonDefault';
import ButtonList from '../Button/ButtonList';
import CustomFlatList from '../CustomFlatList';

const ModalOption = ({
  onPress = () => {},
  onPressCancel = () => {},

  visible = false,
  transparent = false,

  options = [{onPress: null, text: null, SvgIcon: null}],

  minHeight = s(266),
  containerStyle = {},

  title = '',
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={transparent}
    statusBarTranslucent>
    <SafeAreaView
      style={[
        AppStyles.flex1,
        AppStyles.justifyEnd,
        {
          backgroundColor: Colors.backDrop,
        },
      ]}>
      <View
        style={[
          AppStyles.backgroundWhite,
          AppStyles.overflowHidden,
          {
            borderTopRightRadius: s(16),
            borderTopLeftRadius: s(16),
            // minHeight: minHeight,
          },
          containerStyle,
        ]}>
        <View
          style={[
            AppStyles.alignSelfCenter,
            {
              marginTop: s(8),
              height: s(4),
              width: s(54),
              backgroundColor: Colors.neutral4,
            },
          ]}
        />
        <View style={[{margin: s(16), marginTop: s(24)}]}>
          <Text style={[Fonts.style.title]}>{title}</Text>
          <CustomFlatList
            data={options}
            style={{marginTop: s(8)}}
            renderItem={({item, index}) => (
              <ButtonList
                key={item + index}
                onPress={item.onPress}
                text={item.text}
                textStyle={Fonts.style.descriptionRegular}
                SvgRightIcon={item.SvgIcon}
                rightIconColor={Colors.blue}
                isTopBordered={index !== 0}
              />
            )}
          />
          <ButtonDefault
            onPress={onPressCancel}
            buttonStyle={{marginTop: s(8)}}
            text={I18n.t('cancel')}
            textColor={Colors.blue}
            buttonColor={Colors.white}
            isBordered
          />
        </View>
        {/* <View style={{height: s(16)}} /> */}
      </View>
    </SafeAreaView>
  </Modal>
);

export default ModalOption;
