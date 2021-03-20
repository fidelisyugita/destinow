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
import ButtonIcon from '../../Components/Home/ButtonIcon';
import PlaceCard from '../../Components/Card/PlaceCard';
import LocalDiaryCard from '../../Components/Home/LocalDiaryCard';
import TitleBar from '../../Components/TitleBar';

function HomeScreen({
  navigation,
  currentUser,
  getFavoritePlaces,
  getFavoritePlacesRequest,
}) {
  const {navigate} = navigation;

  const [isScrolling, setScrolling] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    getFavoritePlacesRequest({});
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

        <View
          style={[
            AppStyles.flex1,
            AppStyles.backgroundWhite,
            {
              marginTop: s(16),
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
              SvgIcon={Svgs.IconRestaurant}
              text={I18n.t('restaurant')}
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
                imageSrc={item.cover ? {uri: item.cover.src} : Images.default34}
                location={item.location}
                name={item.name}
                rating={item.rating || 4}
              />
            )}
          />

          <TitleBar title={I18n.t('localDiary')} />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={{paddingHorizontal: s(16 - 8)}}
            style={{marginTop: s(24 - 8)}}
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

          <TitleBar title={I18n.t('news')} />
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
