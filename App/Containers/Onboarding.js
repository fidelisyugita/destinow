import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {connect} from 'react-redux';

import SessionActions from '../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';
import I18n from '../I18n';

import CustomCarausel from '../Components/CustomCarausel';
import ButtonDefault from '../Components/Button/ButtonDefault';

const data = [
  {
    title: I18n.t('onboardingTitle1'),
    description: I18n.t('onboardingDescription1'),
    ImageSvg: Svgs.Onboarding1,
  },
  {
    title: I18n.t('onboardingTitle2'),
    description: I18n.t('onboardingDescription2'),
    ImageSvg: Svgs.Onboarding2,
  },
  {
    title: I18n.t('onboardingTitle3'),
    description: I18n.t('onboardingDescription3'),
    ImageSvg: Svgs.Onboarding3,
  },
];

function OnboardingScreen({navigation, removeOnboarding}) {
  const {navigate} = navigation;

  const renderItem = ({title, description, ImageSvg}, index) => {
    return (
      <View key={'onboarding' + index} style={[AppStyles.alignCenter]}>
        {ImageSvg ? (
          <ImageSvg width={s(334)} height={s(334)} />
        ) : (
          <View style={{width: s(334), height: s(334)}} />
        )}

        <View style={{marginTop: vs(32), marginHorizontal: s(24)}}>
          <Text style={[Fonts.style.subTitle, Fonts.style.alignCenter]}>
            {title}
          </Text>
          <Text
            style={[
              Fonts.style.descriptionRegular,
              Fonts.style.alignCenter,
              {marginTop: vs(8)},
            ]}>
            {description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    // <SafeAreaView style={[AppStyles.flex1]}>
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <View style={[AppStyles.flex1, AppStyles.justifyEnd]}> */}
        <View style={[AppStyles.alignCenter, {marginTop: vs(37)}]}>
          {/* <Svgs.LogoHorizontal width={s(135.25)} height={s(25)} /> */}
          <Image
            source={Images.logoHorizontal}
            style={{
              width: s(154),
              height: s(37),
            }}
            resizeMode="contain"
          />
        </View>

        <CustomCarausel
          loop={false}
          autoplay={false}
          data={data}
          // style={{height: s(334) + vs(32) + s(76)}}

          style={{
            marginTop: vs(20),
            // height: s(334) + vs(32) + s(28) + vs(8) + s(44) + vs(36) + s(8),
            height: Metrics.pureScreenHeight - vs(94) - vs(152),
          }}
          paginationStyle={{marginTop: vs(36)}}
          renderItem={({item, index}) => renderItem(item, index)}
        />

        <View
          style={[
            AppStyles.row,
            AppStyles.justifyBetween,
            {
              marginHorizontal: s(16),
              marginTop: vs(32),
            },
          ]}>
          <ButtonDefault
            text={I18n.t('logIn')}
            textColor={Colors.blue}
            buttonColor={Colors.white}
            isBordered
          />
          <View style={{width: s(8)}} />
          <ButtonDefault text={I18n.t('signUp')} />
        </View>

        <TouchableOpacity
          onPress={() => {
            removeOnboarding();
            navigate('Main');
          }}
          style={[
            AppStyles.alignCenter,
            {marginTop: vs(20), marginBottom: vs(30)},
          ]}>
          <Text style={[Fonts.style.descriptionMedium, {color: Colors.blue}]}>
            {I18n.t('skip')}
          </Text>
        </TouchableOpacity>
        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    isFirstOpen: state.session.isFirstOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeOnboarding: () => dispatch(SessionActions.removeOnboarding()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
