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

function InboxScreen({navigation, currentUser, logout}) {
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
      <ScrollView onScroll={(event) => onScroll(event)}>
        <TouchableOpacity>
          <Text>{I18n.t('inbox')}</Text>
        </TouchableOpacity>
        <View style={{height: s(1080)}} />
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
