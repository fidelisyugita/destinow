import React, {useState, useEffect, useRef} from 'react';
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
import * as Consts from '../../Lib/Consts';
import I18n from '../../I18n';

import PlaceList from '../../Components/Place/PlaceList';
import TitleBar from '../../Components/TitleBar';
import PlaceCard from '../../Components/Card/PlaceCard';
import CustomHeader from '../../Components/CustomHeader';
import CustomBody from '../../Components/CustomBody';
import CustomLoader from '../../Components/CustomLoader';

function PlaceScreen({
  navigation,
  currentUser,

  places,

  getRecommendedPlaces,
  getRecommendedPlacesRequest,

  getPlaces,
  getPlacesRequest,
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
    loadPlaces();
  }, [page]);

  function loadData() {
    getRecommendedPlacesRequest();
    loadPlaces(0);
  }

  function loadPlaces(forcePage) {
    const data = {
      limit: Consts.DATA_PER_PAGE,
      page: forcePage || page,
    };

    console.log('data: ', data);

    if (!getPlaces.fetching || forcePage === 0) getPlacesRequest(data);
  }

  const loadMore = () => {
    const {fetching, payload} = getPlaces;

    if (!fetching && payload && payload.length === Consts.DATA_PER_PAGE)
      setPage(page + 1);

    setEnd(!payload || payload.length !== Consts.DATA_PER_PAGE);
  };

  const goToTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    const tempTransparentOpacity = contentOffsetY / s(186 + 64);

    if (tempTransparentOpacity < 2)
      setTransparentOpacity(tempTransparentOpacity);

    console.log('transparentOpacity: ', transparentOpacity);
  };

  const renderHeader = () => {
    return (
      <View>
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

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={{paddingHorizontal: s(16 - 8)}}
            style={{marginTop: s(24 - 8)}}
            data={getRecommendedPlaces.payload || []}
            renderItem={({item, index}) => (
              <PlaceCard
                onPress={() => navigate('PlaceDetailScreen', {item})}
                imageSrc={item.cover ? {uri: item.cover.src} : Images.default23}
                location={item.city}
                name={item.name}
                rating={item.rating || 4}
              />
            )}
          />

          <TitleBar title={I18n.t('allTourismPlaces')} />
        </CustomBody>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{marginBottom: s(56)}}>
        {getPlaces.fetching && <CustomLoader />}
        {isEnd && (
          <View
            style={[
              AppStyles.alignCenter,
              {marginTop: s(48 - 24), marginHorizontal: s(16)},
            ]}>
            <Text
              style={[Fonts.style.captionRegular, {color: Colors.neutral2}]}>
              {I18n.t('youHaveSeenAllTourismPlaces')}
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
      <View style={[AppStyles.positionAbstolute, {width: '100%'}]}>
        <Image
          source={Images.tourismPlace}
          style={[AppStyles.positionAbstolute, {width: s(414), height: s(225)}]}
        />
        <View
          style={[
            AppStyles.alignCenter,
            {marginTop: s(64), marginHorizontal: s(16)},
          ]}>
          <Text style={[Fonts.style.title, {color: Colors.white}]}>
            {I18n.t('exploreBelitungTourismPlace')}
          </Text>
          <View
            style={{
              marginTop: s(4),
              paddingVertical: s(4),
              paddingHorizontal: s(8),
              borderRadius: s(16),
              backgroundColor: Colors.blue,
            }}>
            <Text style={[Fonts.style.footnoteRegular, {color: Colors.white}]}>
              {`1,350 ${I18n.t('tourismPlace')}`}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} //  default 16
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        data={places}
        renderItem={({item, index}) => (
          <PlaceList
            onPress={() => navigate('PlaceDetailScreen', {item})}
            imageSrc={item.cover ? {uri: item.cover.src} : Images.default23}
            name={item.name}
            rating={item.rating || 4}
            description={`${item.city} | ${item.openingHours}`}
            caption={item.distance}
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
    places: state.place.places,

    getRecommendedPlaces: state.place.getRecommendedPlaces,
    getPlaces: state.place.getPlaces,
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
