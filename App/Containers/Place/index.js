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
import CustomHeader from '../../Components/CustomHeader';

function PlaceScreen({
  navigation,
  currentUser,

  getRecommendedPlaces,
  getRecommendedPlacesRequest,

  places,
  getPlacesRequest,
}) {
  const {navigate} = navigation;

  const [transparentOpacity, setTransparentOpacity] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getRecommendedPlacesRequest({});
    getPlacesRequest({});
  }

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    const tempTransparentOpacity = contentOffsetY / (Metrics.headerHeight * 3);

    // if (tempTransparentOpacity <= 1)
    setTransparentOpacity(tempTransparentOpacity);

    console.log('transparentOpacity: ', transparentOpacity);
  };

  const renderHeader = () => {
    return (
      <View>
        <View>
          <Image
            source={Images.tourismPlace}
            style={[
              AppStyles.positionAbstolute,
              {width: s(414), height: s(225)},
            ]}
          />
        </View>

        <View
          style={[
            AppStyles.flex1,
            AppStyles.backgroundWhite,
            {
              marginTop: s(154),
              borderTopLeftRadius: s(32),
              borderTopRightRadius: s(32),
            },
          ]}>
          <View
            style={[
              AppStyles.alignSelfCenter,
              {
                width: s(54),
                height: s(4),
                marginTop: s(8),
                backgroundColor: Colors.neutral4,
                borderRadius: s(2),
              },
            ]}
          />
          <View
            style={[
              AppStyles.row,
              AppStyles.alignCenter,
              {marginTop: s(24), marginHorizontal: s(16)},
            ]}>
            <Svgs.IconRecommendation width={s(32)} height={s(32)} />
            <Text style={[Fonts.style.title, {marginLeft: s(8)}]}>
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
                imageSrc={item.cover ? {uri: item.cover.src} : Images.default34}
                location={item.location}
                name={item.name}
                rating={item.rating || 4}
              />
            )}
          />

          <TitleBar title={I18n.t('allTourismPlace')} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <CustomHeader
        onBack={() => navigation.pop()}
        // title={'test'}
        // description={'test123'}
        // rightIcons={[
        //   {
        //     SvgIcon: Svgs.IconStar,
        //   },
        //   {
        //     SvgIcon: Svgs.IconStar,
        //   },
        // ]}
        transparent={true}
        transparentOpacity={transparentOpacity}
      />

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
