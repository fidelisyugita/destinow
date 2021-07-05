import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import AuthActions from '../../Redux/AuthRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import ButtonDefault from '../../Components/Button/ButtonDefault';
import ButtonList from '../../Components/Button/ButtonList';
import ModalConfirmation from '../../Components/Modal/ModalConfirmation';

function ProfileScreen({navigation, currentUser, signOutRequest}) {
  const {navigate} = navigation;

  const [isScrolling, setScrolling] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {}

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    if (contentOffsetY > 0 && !isScrolling) setScrolling(true);
    if (contentOffsetY <= 0 && isScrolling) setScrolling(false);
  };

  const onPressLogout = () => {
    setModalVisible(false);
    signOutRequest();
  };

  const renderNotLoggedInUser = () => (
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

      {/* <Text
        style={[Fonts.style.alignCenter, {width: s(382), marginTop: s(24)}]}>
        <Text
          style={[Fonts.style.descriptionRegular, {color: Colors.neutral2}]}>
          {`${I18n.t('noAccount')}? `}
        </Text>
        <Text style={[Fonts.style.descriptionBold, {color: Colors.blue}]}>
          {I18n.t('signUpNow')}
        </Text>
      </Text> */}

      <View
        style={{
          marginTop: s(32),
          width: '100%',
          height: s(6),
          backgroundColor: Colors.neutral4,
        }}
      />
    </View>
  );

  const renderLoggedInUser = () => (
    <View style={[{marginTop: s(24)}]}>
      <View
        style={[
          AppStyles.row,
          AppStyles.alignCenter,
          {marginHorizontal: s(16)},
        ]}>
        <View style={{width: s(310), marginRight: s(16)}}>
          <Text numberOfLines={1} style={[Fonts.style.title]}>
            {currentUser.displayName || currentUser.email}
          </Text>
          <TouchableOpacity
            onPress={() => navigate('EditProfileScreen')}
            style={[AppStyles.row, AppStyles.alignCenter, {marginTop: s(2)}]}>
            <Svgs.IconEdit width={s(16)} height={s(16)} fill={Colors.blue} />
            <Text
              style={[
                Fonts.style.descriptionBold,
                {marginLeft: s(8), color: Colors.blue},
              ]}>
              {I18n.t('editProfile')}
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={
            currentUser.photoURL
              ? {uri: currentUser.photoURL}
              : Images.defaultProfile
          }
          style={{
            width: s(56),
            height: s(56),
            borderRadius: s(28),
          }}
        />
      </View>

      <View
        style={{
          marginTop: s(32),
          width: '100%',
          height: s(6),
          backgroundColor: Colors.neutral4,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView>
      <ModalConfirmation
        title={I18n.t('logoutTitle')}
        description={I18n.t('logoutDescription')}
        visible={isModalVisible}
        onPressConfirm={onPressLogout}
        onPressCancel={() => setModalVisible(false)}
        confirmText={I18n.t('logout')}
      />
      <ScrollView
        onScroll={(event) => onScroll(event)}
        showsVerticalScrollIndicator={false}>
        {currentUser.email ? renderLoggedInUser() : renderNotLoggedInUser()}

        <View style={{marginVertical: s(32), marginHorizontal: s(16)}}>
          <Text style={[Fonts.style.captionMedium, {color: Colors.neutral2}]}>
            {I18n.t('setting')}
          </Text>

          <ButtonList
            SvgIcon={Svgs.IconLanguage}
            text={I18n.t('language')}
            description={I18n.t('currentLanguage')}
          />

          {currentUser.email && (
            <ButtonList
              onPress={() => setModalVisible(true)}
              SvgIcon={Svgs.IconLogout}
              text={I18n.t('logOut')}
            />
          )}
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
  signOutRequest: (data, callback) =>
    dispatch(AuthActions.signOutRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
