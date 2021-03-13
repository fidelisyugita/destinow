import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

import SessionActions from '../../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';
import ButtonIcon from '../../Components/Home/ButtonIcon';
import RatingStar from '../../Components/Home/RatingStar';
import PlaceCard from '../../Components/Home/PlaceCard';

function HomeScreen({navigation, currentUser, logout}) {
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
                backgroundColor: Colors.neural4,
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
              SvgIcon={Svgs.IconPlace}
              text={I18n.t('tourismPlace')}
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

          <Text
            style={[
              Fonts.style.title,
              {marginTop: 56, marginHorizontal: s(16)},
            ]}>
            {I18n.t('favoriteDestination')}
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            contentContainerStyle={{paddingHorizontal: s(16 - 8)}}
            data={[
              {
                name: 'Tanjung Kelayang Beach',
                location: 'Tanjung Pandan',
                rating: 4,
                imageUri:
                  'https://asset.kompas.com/crops/c0Myaf3AFwCFbsEvDrT3zLOCG2M=/171x0:1000x553/750x500/data/photo/2020/02/27/5e5788fb2f500.jpg',
              },
              {
                name: 'Hatchlings Babel SeaTurtle Conservation',
                location: 'Sungailiat',
                rating: 4,
                imageUri:
                  'https://share.america.gov/wp-content/uploads/2020/06/shutterstock_341379554-2-1024x512.jpg',
              },
            ]}
            renderItem={({item, index}) => (
              <PlaceCard
                imageUri={item.imageUri}
                location={item.location}
                name={item.name}
                rating={item.rating}
              />
            )}
          />

          <Text
            style={[
              Fonts.style.title,
              {marginTop: 56, marginHorizontal: s(16)},
            ]}>
            {I18n.t('localPride')}
          </Text>

          <Text
            style={[
              Fonts.style.title,
              {marginTop: 56, marginHorizontal: s(16)},
            ]}>
            {I18n.t('news')}
          </Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
