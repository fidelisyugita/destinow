import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';
import PlaceActions from '../../Redux/PlaceRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {IsNotEmpty} from '../../Lib';
import I18n from '../../I18n';

import ButtonIcon from '../../Components/Home/ButtonIcon';
import PlaceCard from '../../Components/Card/PlaceCard';
import LocalDiaryCard from '../../Components/Home/LocalDiaryCard';
import TitleBar from '../../Components/TitleBar';
import CustomBody from '../../Components/CustomBody';
import CustomHeader from '../../Components/CustomHeader';
import CustomImage from '../../Components/CustomImage';
import RatingStar from '../../Components/RatingStar';
import CustomCarausel from '../../Components/CustomCarausel';
import VerticalLine from '../../Components/VerticalLine';
import ButtonDefault from '../../Components/Button/ButtonDefault';
import MainDetails from '../../Components/MainDetails';

function PlaceDetailScreen({
  navigation,
  currentUser,
  getFavoritePlaces,
  getFavoritePlacesRequest,
}) {
  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const paramItem = navigation.getParam('item', {});

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    console.log('paramItem: ', paramItem);
    // getFavoritePlacesRequest({});
  }

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    const tempTransparentOpacity = contentOffsetY / (Metrics.headerHeight * 3);

    if (tempTransparentOpacity < 2)
      setTransparentOpacity(tempTransparentOpacity);

    console.log('transparentOpacity: ', transparentOpacity);
  };

  const renderItem = ({src}, index) => {
    return (
      <CustomImage
        key={src}
        source={src ? {uri: src} : Images.default11}
        defaultSource={Images.default11}
        style={{width: s(414), height: s(414)}}
      />
    );
  };

  return (
    <SafeAreaView>
      <CustomHeader
        onBack={() => navigation.pop()}
        transparent={true}
        transparentOpacity={transparentOpacity}
      />
      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} // default 16
      >
        <View style={[AppStyles.positionAbstolute]}>
          {IsNotEmpty(paramItem.images) ? (
            <CustomCarausel
              loop={true}
              autoplay={true}
              data={paramItem.images}
              style={{height: s(414)}}
              paginationStyle={{top: -s(8 + 48 + Metrics.statusBarHeight)}}
              renderItem={({item, index}) => renderItem(item, index)}
            />
          ) : (
            <CustomImage
              source={
                paramItem.cover ? {uri: paramItem.cover.src} : Images.default11
              }
              defaultSource={Images.default11}
              style={{width: s(414), height: s(414)}}
            />
          )}
          <Image
            source={Images.overlayHeader}
            style={[
              AppStyles.positionAbstolute,
              {width: s(414), height: s(121)},
            ]}
          />
        </View>

        <CustomBody style={{marginTop: s(359)}}>
          <MainDetails
            name={paramItem.name}
            address={paramItem.address}
            rating={paramItem.rating}
            distance={paramItem.distance}
            openingHours={paramItem.openingHours}
            priceEstimation={paramItem.priceEstimation}
          />
        </CustomBody>
        <View style={{height: s(56)}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    currentUser: state.session.user,
    getFavoritePlaces: state.place.getFavoritePlaces,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  getFavoritePlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getFavoritePlacesRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailScreen);
