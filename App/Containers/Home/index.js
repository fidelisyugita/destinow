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
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';
import PlaceActions from '../../Redux/PlaceRedux';
import BannerActions from '../../Redux/BannerRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';
import {IsNotEmpty} from '../../Lib';

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

  getFavoritePlaces,
  getFavoritePlacesRequest,
  getBanners,
  getBannersRequest,
}) {
  const {navigate} = navigation;

  const [isScrolling, setScrolling] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getFavoritePlacesRequest();
    getBannersRequest();
  }

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    if (contentOffsetY > 0 && !isScrolling) setScrolling(true);
    if (contentOffsetY <= 0 && isScrolling) setScrolling(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={1600} // default 16
      >
        <Image
          source={Images.homepage}
          style={[
            AppStyles.positionAbstolute,
            {width: s(447), height: s(337), top: -s(69)},
          ]}
        />

        <View style={{marginTop: s(80), marginHorizontal: s(16)}}>
          <View style={[AppStyles.row, AppStyles.alignCenter]}>
            <Image
              source={Images.defaultProfile}
              style={{width: s(24), height: s(24), marginRight: s(8)}}
            />
            <Text
              style={[Fonts.style.descriptionRegular, {color: Colors.white}]}>
              {`${I18n.t('logIn')}/${I18n.t('signUp')}`}
            </Text>
          </View>
          <Text
            style={[Fonts.style.title, {marginTop: s(2), color: Colors.white}]}>
            {`${I18n.t('findYourFavoriteDestinationHere')}!`}
          </Text>
        </View>

        <CustomBody>
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
              SvgIcon={Svgs.IconCulinary}
              text={I18n.t('culinary')}
              buttonStyle={{width: s(69)}}
            />
            <ButtonIcon
              SvgIcon={Svgs.IconSouvenir}
              text={I18n.t('souvenir')}
              buttonStyle={{width: s(69)}}
            />
            <ButtonIcon
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
                marginTop: s(48),
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
            data={[
              {
                cover: {
                  src:
                    'https://www.pesonaindo.com/wp-content/uploads/2016/04/Paket-Wisata-Belitung-Island-Pesona-Indonesia-Foto-Trip-1.jpg',
                },
                title:
                  'Mi, at lobortis vitae pellentesque urna at senectus et ornare suspendisse et.',
                description:
                  'Nisl tristique facilisi lectus malesuada tristique in eget diam. Purus ultricies venenatis senec...',
                author: 'Ronald Richards',
              },
              {
                cover: {
                  src:
                    'https://cache.marriott.com/marriottassets/marriott/TJQSI/tjqsi-lobby-5988-hor-feat.jpg',
                },
                title:
                  'Mi, at lobortis vitae pellentesque urna at senectus et ornare suspendisse et.',
                description:
                  'Nisl tristique facilisi lectus malesuada tristique in eget diam. Purus ultricies venenatis senec...',
                author: 'Annette Black',
              },
            ]}
            renderItem={({item, index}) => (
              <LocalDiaryCard
                imageSrc={item.cover ? {uri: item.cover.src} : Images.default32}
                title={item.title}
                description={item.description}
                author={item.author}
              />
            )}
          />
          <ButtonDefault
            text={I18n.t('viewAll')}
            buttonStyle={{marginTop: s(32), marginHorizontal: s(16)}}
            buttonColor={Colors.white}
            textColor={Colors.blue}
            isBordered
          />

          <TitleBar title={I18n.t('news')} />
          <CustomFlatList
            data={[
              {
                cover: {
                  src:
                    'https://www.pesonaindo.com/wp-content/uploads/2016/04/Paket-Wisata-Belitung-Island-Pesona-Indonesia-Foto-Trip-1.jpg',
                },
                title: '3 jam yang lalu',
                description:
                  'Nisl tristique facilisi lectus malesuada tristique in eget diam. Purus ultricies venenatis senec...',
              },
              {
                cover: {
                  src:
                    'https://cache.marriott.com/marriottassets/marriott/TJQSI/tjqsi-lobby-5988-hor-feat.jpg',
                },
                title: '1 hari yang lalu',
                description:
                  'Nisl tristique facilisi lectus malesuada tristique in eget diam. Purus ultricies venenatis senec...',
              },
              {
                cover: {
                  src:
                    'https://www.pesonaindo.com/wp-content/uploads/2016/04/Paket-Wisata-Belitung-Island-Pesona-Indonesia-Foto-Trip-1.jpg',
                },
                title: '3 jam yang lalu',
                description:
                  'Nisl tristique facilisi lectus malesuada tristique in eget diam. Purus ultricies venenatis senec...',
              },
            ]}
            style={{marginTop: s(24 - 8)}}
            renderItem={({item, index}) => (
              <NewsList
                imageSrc={item.cover ? {uri: item.cover.src} : Images.default11}
                caption={item.title}
                text={item.description}
                hideBorderTop={index === 0}
              />
            )}
          />
          <ButtonDefault
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  getFavoritePlacesRequest: (data, callback) =>
    dispatch(PlaceActions.getFavoritePlacesRequest(data, callback)),
  getBannersRequest: (data, callback) =>
    dispatch(BannerActions.getBannersRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
