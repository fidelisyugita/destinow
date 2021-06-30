import React, {memo} from 'react';
import {Modal, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import ButtonDefault from '../Button/ButtonDefault';
import ButtonList from '../Button/ButtonList';
import CustomFlatList from '../CustomFlatList';

const ModalConfirmation = ({
  onPressConfirm = () => {},
  onPressCancel = () => {},

  confirmText = I18n.t('ok'),
  cancelText = I18n.t('cancel'),

  visible = false,
  transparent = true,

  minHeight = s(213),
  containerStyle = {},

  title = '',
  description = '',
}) => (
  <Modal
    visible={visible}
    animationType="slide"
    transparent={transparent}
    statusBarTranslucent>
    <SafeAreaView
      style={[
        AppStyles.flex1,
        AppStyles.justifyCenter,
        {
          backgroundColor: Colors.backDrop,
        },
      ]}>
      <View
        style={[
          AppStyles.backgroundWhite,
          AppStyles.overflowHidden,
          {
            borderRadius: s(16),
            marginHorizontal: s(12),
            // minHeight: minHeight,
          },
          containerStyle,
        ]}>
        <View style={{padding: s(16)}}>
          <TouchableOpacity
            style={[AppStyles.alignEnd]}
            onPress={onPressCancel}>
            <Svgs.IconClose
              width={s(24)}
              height={s(24)}
              fill={Colors.neutral3}
            />
          </TouchableOpacity>
          <Text style={[Fonts.style.subTitle, {marginTop: s(8)}]}>{title}</Text>
          <Text style={[Fonts.style.descriptionRegular, {marginTop: s(4)}]}>
            {description}
          </Text>
          <View style={[AppStyles.row, {marginTop: s(24)}]}>
            <ButtonDefault
              onPress={onPressCancel}
              buttonStyle={AppStyles.flex1}
              text={cancelText}
              textColor={Colors.blue}
              buttonColor={Colors.white}
              isBordered
            />
            <View style={{width: s(8)}} />
            <ButtonDefault
              onPress={onPressConfirm}
              buttonStyle={AppStyles.flex1}
              text={confirmText}
              textColor={Colors.white}
              buttonColor={Colors.blue}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  </Modal>
);

export default ModalConfirmation;
