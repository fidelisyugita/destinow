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
import EmptyState from '../../Components/EmptyState';

function InboxScreen({navigation, currentUser, logout}) {
  const {navigate} = navigation;

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {}

  return (
    <SafeAreaView>
      <ScrollView>
        <EmptyState
          containerStyle={{
            minHeight:
              Metrics.pureScreenHeight - Metrics.bottomNavigationHeight,
          }}
          SvgImage={Svgs.EmptyNotification}
          text={I18n.t('emptyNotification')}
          caption={I18n.t('emptyNotificationDescription')}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);
