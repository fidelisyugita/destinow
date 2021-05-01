import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  Platform,
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';
import RestaurantActions from '../../Redux/RestaurantRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {GetDistance} from '../../Lib';
import * as Consts from '../../Lib/Consts';
import I18n from '../../I18n';

import PlaceList from '../../Components/Place/PlaceList';
import TitleBar from '../../Components/TitleBar';
import PlaceCard from '../../Components/Card/PlaceCard';
import CustomHeader from '../../Components/CustomHeader';
import CustomBody from '../../Components/CustomBody';
import CustomLoader from '../../Components/CustomLoader';
import CustomFlatList from '../../Components/CustomFlatList';
import BackgroundImage from '../../Components/BackgroundImage';

function RestaurantScreen({
  navigation,
  currentUser,
  userPosition,

  restaurants,

  getRecommendedRestaurants,
  getRecommendedRestaurantsRequest,

  getRestaurants,
  getRestaurantsRequest,
}) {
  const flatListRef = useRef();

  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const [isEnd, setEnd] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadRestaurants();
  }, [page]);

  function loadData() {
    getRecommendedRestaurantsRequest();
    loadRestaurants(0);
  }

  function loadRestaurants(forcePage) {
    const data = {
      limit: Consts.DATA_PER_PAGE,
      page: forcePage || page,
    };

    console.log('data: ', data);

    if (!getRestaurants.fetching || forcePage === 0)
      getRestaurantsRequest(data);
  }

  const loadMore = () => {
    const {fetching, payload} = getRestaurants;

    if (!fetching && payload && payload.length === Consts.DATA_PER_PAGE)
      setPage(page + 1);

    setEnd(!payload || payload.length !== Consts.DATA_PER_PAGE);
  };

  const goToTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    const tempTransparentOpacity = contentOffsetY / (Metrics.headerHeight * 3);

    if (tempTransparentOpacity < 2)
      setTransparentOpacity(tempTransparentOpacity);
  };

  const renderHeader = () => {
    return (
      <CustomBody>
        <View
          style={[
            AppStyles.row,
            AppStyles.alignCenter,
            {marginTop: s(24), marginHorizontal: s(16)},
          ]}>
          <Svgs.IconRecommendation width={s(32)} height={s(32)} />
          <Text
            style={[
              Fonts.style.title,
              {
                marginLeft: s(8),
                color: `rgba(48,47,56, ${1 - transparentOpacity})`,
              },
            ]}>
            {I18n.t('recommended')}
          </Text>
        </View>

        <CustomFlatList
          horizontal
          contentContainerStyle={{paddingHorizontal: s(16 - 8)}}
          style={{marginTop: s(24 - 8)}}
          data={getRecommendedRestaurants.payload || []}
          renderItem={({item, index}) => (
            <PlaceCard
              key={item + index}
              onPress={() => navigate('RestaurantDetailScreen', {item})}
              imageSrc={item.cover ? {uri: item.cover.src} : Images.default23}
              location={item.city}
              name={item.name}
              rating={item.rating || 4}
            />
          )}
        />

        <TitleBar title={I18n.t('allCulinaryPlaces')} />
      </CustomBody>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{marginBottom: s(56)}}>
        {getRestaurants.fetching && <CustomLoader />}
        {isEnd && (
          <View
            style={[
              AppStyles.alignCenter,
              {marginTop: s(48 - 24), marginHorizontal: s(16)},
            ]}>
            <Text
              style={[Fonts.style.captionRegular, {color: Colors.neutral2}]}>
              {I18n.t('youHaveSeenAllCulinaryPlaces')}
            </Text>
            <Text
              onPress={goToTop}
              style={[
                Fonts.style.captionRegular,
                Fonts.style.underline,
                {marginTop: s(2), color: Colors.blue},
              ]}>
              {I18n.t('backToTop')}
            </Text>
          </View>
        )}
        {/* <View style={{height: s(56)}} /> */}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <CustomHeader
        onBack={() => navigation.pop()}
        transparent={true}
        transparentOpacity={transparentOpacity}
        title={transparentOpacity > 0.8 ? I18n.t('recommended') : null}
        titleColor={`rgba(48,47,56, ${transparentOpacity - 0.2})`}
        iconColor={transparentOpacity > 0.5 ? Colors.blue : Colors.white}
      />
      <BackgroundImage
        imageSrc={Images.tourismPlace}
        text={I18n.t('exploreBelitungCulinary')}
        description={`1,350 ${I18n.t('culinary')}`}
      />

      <FlatList
        ref={flatListRef}
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} //  default 16
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        data={restaurants}
        renderItem={({item, index}) => (
          <PlaceList
            onPress={() => navigate('RestaurantDetailScreen', {item})}
            imageSrc={item.cover ? {uri: item.cover.src} : Images.default11}
            name={item.name}
            rating={item.rating || 4}
            description={`${item.city} | ${item.openingHours}`}
            caption={GetDistance(userPosition, item.position)}
            hideBorderTop={index === 0}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.3}
        onEndReached={loadMore}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    currentUser: state.session.user,
    userPosition: state.session.userPosition,

    restaurants: state.restaurant.restaurants,

    getRecommendedRestaurants: state.restaurant.getRecommendedRestaurants,
    getRestaurants: state.restaurant.getRestaurants,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  getRecommendedRestaurantsRequest: (data, callback) =>
    dispatch(
      RestaurantActions.getRecommendedRestaurantsRequest(data, callback),
    ),
  getRestaurantsRequest: (data, callback) =>
    dispatch(RestaurantActions.getRestaurantsRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantScreen);
