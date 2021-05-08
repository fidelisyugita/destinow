import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';
import AuthActions from '../../Redux/AuthRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import ButtonDefault from '../../Components/Button/ButtonDefault';
import ButtonList from '../../Components/Button/ButtonList';
import CustomHeader from '../../Components/CustomHeader';
import CustomTextInput from '../../Components/CustomTextInput';

function LoginScreen({navigation, currentUser, logout, loginGoogleRequest}) {
  const {navigate} = navigation;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {}

  const onPressLoginGoogle = () => {
    loginGoogleRequest({}, loginGoogleCallback);
  };
  const loginGoogleCallback = (response) => {
    if (response.ok) navigate('Bottom');
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            AppStyles.positionAbstolute,
            {
              width: '100%',
              height: s(232),
              backgroundColor: Colors.blue,
            },
          ]}
        />
        <CustomHeader
          onBack={() => navigation.pop()}
          style={{backgroundColor: Colors.transparent}}
          iconColor={Colors.white}
        />
        <Text
          style={[
            Fonts.style.title,
            {color: Colors.white, marginTop: s(73), marginHorizontal: s(16)},
          ]}>
          {I18n.t('login')}
        </Text>
        <Text
          style={[
            Fonts.style.descriptionRegular,
            {color: Colors.white, marginTop: s(8), marginHorizontal: s(16)},
          ]}>
          {I18n.t('loginDescription')}
        </Text>

        <View
          style={[
            AppStyles.shadow,
            {
              marginTop: s(32),
              marginHorizontal: s(16),
              padding: s(16),
              borderRadius: s(8),
            },
          ]}>
          <CustomTextInput
            label={`${I18n.t('email')}*`}
            value={email}
            onChangeText={setEmail}
          />
          <CustomTextInput
            label={`${I18n.t('password')}*`}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            containerStyle={{marginTop: s(16)}}
          />
          <ButtonDefault
            text={I18n.t('login')}
            buttonStyle={{marginTop: s(22)}}
          />

          <View style={[AppStyles.alignCenter, {marginTop: s(22)}]}>
            <Text
              style={[
                Fonts.style.captionRegular,
                Fonts.style.alignCenter,
                AppStyles.backgroundWhite,
                AppStyles.zIndex1,
                {
                  color: Colors.neutral2,
                  width: s(108 + 16),
                },
              ]}>
              {I18n.t('orLoginWith')}
            </Text>
            <View
              style={[
                AppStyles.positionAbstolute,
                {
                  width: '100%',
                  height: s(1),
                  backgroundColor: Colors.neutral3,
                  top: s(8),
                },
              ]}
            />
          </View>

          <View
            style={[
              AppStyles.row,
              AppStyles.justifyCenter,
              {marginTop: s(16)},
            ]}>
            <View style={{width: s(56)}}>
              <ButtonDefault
                onPress={onPressLoginGoogle}
                SvgIcon={Svgs.IconGoogle}
                buttonColor={Colors.white}
                isBordered
                textColor={Colors.neutral3}
              />
            </View>
            <View style={{width: s(56), marginHorizontal: s(16)}}>
              <ButtonDefault
                SvgIcon={Svgs.IconFacebook}
                buttonColor={Colors.facebook}
              />
            </View>
            <View style={{width: s(56)}}>
              <ButtonDefault
                SvgIcon={Svgs.IconApple}
                buttonColor={Colors.black}
              />
            </View>
          </View>
        </View>

        <Text
          style={[
            Fonts.style.alignCenter,
            {width: s(382), marginTop: s(236), marginBottom: s(34)},
          ]}>
          <Text
            style={[Fonts.style.descriptionRegular, {color: Colors.neutral2}]}>
            {`${I18n.t('noAccount')}? `}
          </Text>
          <Text style={[Fonts.style.descriptionBold, {color: Colors.blue}]}>
            {I18n.t('signUpNow')}
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    currentUser: state.session.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  loginGoogleRequest: (data, callback) =>
    dispatch(AuthActions.loginGoogleRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
