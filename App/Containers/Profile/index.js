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

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import ButtonDefault from '../../Components/Button/ButtonDefault';
import ButtonList from '../../Components/Button/ButtonList';

function ProfileScreen({navigation, currentUser, logout}) {
  const {navigate} = navigation;

  const [isScrolling, setScrolling] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {}

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    if (contentOffsetY > 0 && !isScrolling) setScrolling(true);
    if (contentOffsetY <= 0 && isScrolling) setScrolling(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        onScroll={(event) => onScroll(event)}
        showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.alignCenter, {marginTop: s(24)}]}>
          <Svgs.LoginSignUp width={s(224)} height={s(224)} />

          <Text
            style={[
              Fonts.style.descriptionBold,
              Fonts.style.alignCenter,
              {width: s(348), marginTop: s(32)},
            ]}>
            {I18n.t('loginNow')}
          </Text>
          <Text
            style={[
              Fonts.style.descriptionRegular,
              Fonts.style.alignCenter,
              {width: s(348), marginTop: s(8)},
            ]}>
            {I18n.t('loginNowDescription')}
          </Text>
          <ButtonDefault
            onPress={() => navigate('Auth')}
            buttonStyle={{width: s(382), marginTop: s(32)}}
            text={I18n.t('login')}
          />

          <Text
            style={[
              Fonts.style.alignCenter,
              {width: s(382), marginTop: s(24)},
            ]}>
            <Text
              style={[
                Fonts.style.descriptionRegular,
                {color: Colors.neutral2},
              ]}>
              {`${I18n.t('noAccount')}? `}
            </Text>
            <Text style={[Fonts.style.descriptionBold, {color: Colors.blue}]}>
              {I18n.t('signUpNow')}
            </Text>
          </Text>

          <View
            style={{
              marginTop: s(32),
              width: '100%',
              height: s(6),
              backgroundColor: Colors.neutral4,
            }}
          />
        </View>

        <View style={{marginVertical: s(32), marginHorizontal: s(16)}}>
          <Text style={[Fonts.style.captionMedium, {color: Colors.neutral2}]}>
            {I18n.t('setting')}
          </Text>

          <ButtonList
            SvgIcon={Svgs.IconLanguage}
            text={I18n.t('language')}
            description={I18n.t('currentLanguage')}
          />
        </View>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
