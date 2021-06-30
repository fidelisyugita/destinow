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
  Linking,
  Platform,
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';
import BannerActions from '../../Redux/BannerRedux';
import PlaceActions from '../../Redux/PlaceRedux';
import NewsActions from '../../Redux/NewsRedux';
import LocalDiaryActions from '../../Redux/LocalDiaryRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';
import {DateFormatter, IsNotEmpty} from '../../Lib';

import ButtonIcon from '../../Components/Home/ButtonIcon';
import PlaceCard from '../../Components/Card/PlaceCard';
import LocalDiaryCard from '../../Components/Home/LocalDiaryCard';
import TitleBar from '../../Components/TitleBar';
import CustomBody from '../../Components/CustomBody';
import CustomImage from '../../Components/CustomImage';
import CustomCarausel from '../../Components/CustomCarausel';
import ButtonDefault from '../../Components/Button/ButtonDefault';
import CustomFlatList from '../../Components/CustomFlatList';
import NewsList from '../../Components/List/NewsList';

function HomeScreen({
  navigation,
  currentUser,

  getBanners,
  getBannersRequest,
  getFavoritePlaces,
  getFavoritePlacesRequest,
  news,
  getNewsRequest,
  localDiaries,
  getLocalDiariesRequest,
}) {
  const {navigate} = navigation;

  const [isScrolling, setScrolling] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getBannersRequest();

    getFavoritePlacesRequest();
    getNewsRequest();
    getLocalDiariesRequest();
  }

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    if (contentOffsetY > 0 && !isScrolling) setScrolling(true);
    if (contentOffsetY <= 0 && isScrolling) setScrolling(false);
  };

  return (
    <SafeAreaView>
      <View
        style={[
          AppStyles.positionAbstolute,
          {
            marginTop: Platform.OS === 'ios' ? Metrics.statusBarHeight : 0,
            width: '100%',
          },
        ]}>
        <Image
          source={Images.homepage}
          style={[
            AppStyles.positionAbstolute,
            {
              width: s(447),
              height: s(337),
              top: -s(69),
            },
          ]}
        />
      </View>

      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={1600} // default 16
        showsVerticalScrollIndicator={false}>
        <View style={{marginTop: s(80), marginHorizontal: s(16)}}>
          <TouchableOpacity
            style={[AppStyles.row, AppStyles.alignCenter]}
            onPress={!currentUser.email ? () => navigate('Auth') : null}>
            <Image
              source={
                currentUser.photoURL
                  ? {uri: currentUser.photoURL}
                  : Images.defaultProfile
              }
              style={{
                width: s(24),
                height: s(24),
                borderRadius: s(12),
                marginRight: s(8),
              }}
            />
            <Text
              numberOfLines={1}
              style={[
                AppStyles.flex1,
                Fonts.style.descriptionRegular,
                {color: Colors.white},
              ]}>
              {currentUser.email
                ? currentUser.displayName || currentUser.email
                : `${I18n.t('login')}/${I18n.t('signUp')}`}
            </Text>
          </TouchableOpacity>
          <Text
            style={[Fonts.style.title, {marginTop: s(2), color: Colors.white}]}>
            {`${I18n.t('findYourFavoriteDestinationHere')}!`}
          </Text>
        </View>
        <CustomBody style={{marginTop: s(16)}}>
          <View
            style={[
              AppStyles.row,
              AppStyles.justifyBetween,
              {marginTop: s(24), marginHorizontal: s(30)},
            ]}>
            <ButtonIcon
              onPress={() => navigate('PlaceScreen')}
              SvgIcon={Svgs.IconPlace}
              text={I18n.t('tourism')}
              buttonStyle={{width: s(69)}}
            />
            <ButtonIcon
              onPress={() => navigate('RestaurantScreen')}
              SvgIcon={Svgs.IconCulinary}
              text={I18n.t('culinary')}
              buttonStyle={{width: s(69)}}
            />
            <ButtonIcon
              onPress={() => navigate('SouvenirScreen')}
              SvgIcon={Svgs.IconSouvenir}
              text={I18n.t('souvenir')}
              buttonStyle={{width: s(69)}}
            />
            <ButtonIcon
              onPress={() => navigate('TransportScreen')}
              SvgIcon={Svgs.IconTransport}
              text={I18n.t('transport')}
              buttonStyle={{width: s(69)}}
            />
          </View>

          {IsNotEmpty(getBanners.payload) && (
            <CustomCarausel
              loop={true}
              autoplay={true}
              data={getBanners.payload || []}
              style={{height: s(150)}}
              containerStyle={{
                marginTop: s(40),
                // width: s(414 - 8),
                // backgroundColor: Colors.lightBlue,
              }}
              paginationStyle={{marginTop: s(16)}}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={item + index}
                  onPress={() => {
                    if (item.url) Linking.openURL(item.url);
                  }}
                  style={[AppStyles.alignSelfCenter]}>
                  <CustomImage
                    source={
                      item.cover ? {uri: item.cover.src} : Images.default31
                    }
                    defaultSource={Images.default31}
                    style={{
                      width: s(375),
                      height: s(150),
                      borderRadius: s(16),
                      borderWidth: s(1),
                      borderColor: Colors.neutral3,
                    }}
                    // resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
            />
          )}

          <TitleBar title={I18n.t('favoriteDestination')} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={{paddingHorizontal: s(16 - 8)}}
            style={{marginTop: s(24 - 8)}}
            data={getFavoritePlaces.payload || []}
            renderItem={({item, index}) => (
              <PlaceCard
                onPress={() => navigate('PlaceDetailScreen', {item})}
                imageSrc={item.cover ? {uri: item.cover.src} : Images.default23}
                location={item.location}
                name={item.name}
                rating={item.rating || 4}
              />
            )}
          />

          <TitleBar
            title={I18n.t('localDiary')}
            style={{marginTop: s(56 - 8)}}
          />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={{paddingHorizontal: s(16 - 8)}}
            style={{marginTop: s(24)}}
            data={localDiaries.slice(0, 10)}
            renderItem={({item, index}) => (
              <LocalDiaryCard
                onPress={() => navigate('LocalDiaryDetailScreen', {item})}
                imageSrc={item.cover ? {uri: item.cover} : Images.default32}
                title={item.title}
                description={item.paragraphs[0]?.text}
                authorImageSrc={item.createdBy?.photoURL}
                authorName={item.createdBy?.displayName}
              />
            )}
          />
          <ButtonDefault
            onPress={() => navigate('LocalDiaryScreen')}
            text={I18n.t('viewAll')}
            buttonStyle={{marginTop: s(32), marginHorizontal: s(16)}}
            buttonColor={Colors.white}
            textColor={Colors.blue}
            isBordered
          />

          <TitleBar title={I18n.t('news')} />
          <CustomFlatList
            data={news.slice(0, 5)}
            style={{marginTop: s(24 - 8)}}
            renderItem={({item, index}) => (
              <NewsList
                onPress={() => navigate('NewsDetailScreen', {item})}
                key={item + index}
                imageSrc={item.cover ? {uri: item.cover.src} : Images.default11}
                caption={DateFormatter(item.createdAt)}
                title={item.title}
                hideBorderTop={index === 0}
              />
            )}
          />
          <ButtonDefault
            onPress={() => navigate('NewsScreen')}
            text={I18n.t('viewAll')}
            buttonStyle={{marginTop: s(32 - 16), marginHorizontal: s(16)}}
            buttonColor={Colors.white}
            textColor={Colors.blue}
            isBordered
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
    getBanners: state.banner.getBanners,
    news: state.news.news,
    localDiaries: state.localDiary.localDiaries,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  getBannersRequest: (data, callback) =>
    dispatch(BannerActions.getBannersRequest(data, callback)),
  getFavoritePlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getFavoritePlacesRequest(data, callback)),
  getNewsRequest: (data, callback) =>
    dispatch(NewsActions.getNewsRequest(data, callback)),
  getLocalDiariesRequest: (data, callback) =>
    dispatch(LocalDiaryActions.getLocalDiariesRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
