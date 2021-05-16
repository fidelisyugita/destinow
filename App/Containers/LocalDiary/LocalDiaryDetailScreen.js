import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-render-html';

import SessionActions from '../../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {DateFormatter, GetDistance, IsNotEmpty} from '../../Lib';
import I18n from '../../I18n';

import CustomHeader from '../../Components/CustomHeader';
import CustomImage from '../../Components/CustomImage';
import CustomFlatList from '../../Components/CustomFlatList';

function LocalDiaryDetailScreen({navigation, currentUser, userPosition}) {
  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const paramItem = navigation.getParam('item', {});

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    console.log('paramItem: ', paramItem);
  }

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    const tempTransparentOpacity = contentOffsetY / (Metrics.headerHeight * 3);

    if (tempTransparentOpacity < 2)
      setTransparentOpacity(tempTransparentOpacity);
  };

  return (
    <SafeAreaView>
      <CustomHeader
        onBack={() => navigation.pop()}
        transparent={true}
        transparentOpacity={transparentOpacity}
        title={transparentOpacity > 0.7 ? paramItem.title : null}
        titleColor={`rgba(48,47,56, ${transparentOpacity - 0.2})`}
        iconColor={Colors.blue}
      />
      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} // default 16
      >
        <View style={{marginTop: s(73), marginHorizontal: s(16)}}>
          <Text style={Fonts.style.title}>{paramItem.title}</Text>

          <View
            style={[AppStyles.row, AppStyles.alignCenter, {marginTop: s(16)}]}>
            <CustomImage
              source={
                paramItem.createdBy
                  ? {uri: paramItem.createdBy}
                  : Images.defaultProfile
              }
              defaultSource={Images.defaultProfile}
              style={{width: s(32), height: s(32), borderRadius: s(16)}}
            />
            <Text
              style={[
                Fonts.style.captionMedium,
                {width: s(260), marginLeft: s(8)},
              ]}>
              {paramItem.createdBy || '-'}
            </Text>
          </View>

          <CustomImage
            source={
              paramItem.cover ? {uri: paramItem.cover.src} : Images.default32
            }
            defaultSource={Images.default32}
            style={{
              width: s(382),
              height: s(179),
              borderRadius: s(16),
              marginTop: s(24),
            }}
          />

          <CustomFlatList
            data={paramItem.paragraphs}
            renderItem={({item, index}) => (
              <View key={item + index}>
                {item.content && (
                  <HTML
                    source={{html: item.content}}
                    containerStyle={{marginTop: s(24)}}
                    baseFontStyle={Fonts.style.descriptionRegular}
                    tagsStyles={{
                      p: Fonts.style.alignJustify,
                    }}
                  />
                )}

                {item.image && (
                  <CustomImage
                    source={{uri: item.image.src}}
                    defaultSource={Images.default32}
                    style={{
                      width: s(382),
                      height: s(266),
                      borderRadius: s(16),
                      marginTop: s(24),
                    }}
                  />
                )}
              </View>
            )}
          />
        </View>
        <View style={{height: s(56)}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    currentUser: state.session.user,
    userPosition: state.session.userPosition,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocalDiaryDetailScreen);
