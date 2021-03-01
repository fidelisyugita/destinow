import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';

// import SessionActions from '../../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../Themes';
import {s, vs} from '../Lib/Scaling';
import I18n from '../I18n';

import CustomCarausel from '../Components/CustomCarausel';

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
            style={[Fonts.style.descriptionRegular, Fonts.style.alignCenter]}>
            {description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[AppStyles.alignCenter]}>
          <Text>Destinow</Text>
          <CustomCarausel
            loop={false}
            autoplay={false}
            data={data}
            style={{height: s(334) + vs(32) + s(76)}}
            paginationStyle={{marginTop: vs(32)}}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    // isFirstOpen: state.session.isFirstOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // removeOnboarding: () => dispatch(SessionActions.removeOnboarding()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingScreen);
