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
import I18n from '../../I18n';
import PlaceList from '../../Components/Place/PlaceList';
import TitleBar from '../../Components/TitleBar';
import PlaceCard from '../../Components/Card/PlaceCard';

function PlaceScreen({
  navigation,
  currentUser,

  getRecommendedPlaces,
  getRecommendedPlacesRequest,

  places,
  getPlacesRequest,
}) {
  const {navigate} = navigation;

  const [isScrolling, setScrolling] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getRecommendedPlacesRequest({});
    getPlacesRequest({});
  }

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    if (contentOffsetY > 0 && !isScrolling) setScrolling(true);
    if (contentOffsetY <= 0 && isScrolling) setScrolling(false);
  };

  const renderHeader = () => {
    return (
      <View>
        <TitleBar title={I18n.t('recommended')} />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          contentContainerStyle={{paddingHorizontal: s(16 - 8)}}
          style={{marginTop: s(24 - 8)}}
          data={getRecommendedPlaces.payload || []}
          renderItem={({item, index}) => (
            <PlaceCard
              imageSrc={item.cover ? {uri: item.cover.src} : Images.default34}
              location={item.location}
              name={item.name}
              rating={item.rating || 4}
            />
          )}
        />

        <TitleBar title={I18n.t('allTourismPlace')} />
      </View>
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        onScroll={(event) => onScroll(event)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        data={places}
        renderItem={({item, index}) => (
          <PlaceList
            imageSrc={item.cover ? {uri: item.cover.src} : Images.default34}
            location={item.location}
            name={item.name}
            rating={item.rating || 4}
          />
        )}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    currentUser: state.session.user,
    getRecommendedPlaces: state.place.getRecommendedPlaces,
    places: state.place.places,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  getRecommendedPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getRecommendedPlacesRequest(data, callback)),
  getPlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getPlacesRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceScreen);
