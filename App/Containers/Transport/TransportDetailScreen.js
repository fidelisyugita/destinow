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
import TransportActions from '../../Redux/TransportRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {GetDistance, IsNotEmpty} from '../../Lib';
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
import CarauselTop from '../../Components/CarauselTop';
import CustomFlatList from '../../Components/CustomFlatList';
import TypesCard from '../../Components/Card/TypesCard';
import FacilitiesCard from '../../Components/Card/FacilitiesCard';

function TransportDetailScreen({navigation, currentUser, userPosition}) {
  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const paramItem = navigation.getParam('item', {});

  const TAB_MENUS = [
    {
      title: I18n.t('description'),
      renderContent: () => renderDescription(),
    },
    {
      title: I18n.t('review'),
      renderContent: () => renderReview(),
    },
  ];
  const [selectedMenu, setSelectedMenu] = useState(TAB_MENUS[0]);

  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    console.log('paramItem: ', paramItem);
  }

  const renderDescription = () => {
    return (
      <View>
        {paramItem.policy && (
          <View style={{marginTop: s(24)}}>
            <Text style={[Fonts.style.subTitle]}>{I18n.t('rentPolicy')}</Text>
            <HTML
              source={{html: paramItem.policy}}
              // contentWidth={contentWidth}
              containerStyle={{marginTop: s(24 - 16)}}
              baseFontStyle={Fonts.style.descriptionRegular}
              tagsStyles={{
                p: Fonts.style.alignJustify,
              }}
            />
          </View>
        )}

        <TypesCard paramTransportTypes={paramItem.types} />

        {paramItem.termConditions && (
          <View style={{marginTop: s(40)}}>
            <Text style={[Fonts.style.subTitle]}>
              {I18n.t('rentTermsCondition')}
            </Text>
            <HTML
              source={{html: paramItem.termConditions}}
              // contentWidth={contentWidth}
              containerStyle={{marginTop: s(24 - 16)}}
              baseFontStyle={Fonts.style.descriptionRegular}
              tagsStyles={{
                p: Fonts.style.alignJustify,
              }}
            />
          </View>
        )}
      </View>
    );
  };

  const renderReview = () => {
    return (
      <View style={{marginTop: s(24)}}>
        <View style={[AppStyles.alignCenter]}>
          <Svgs.EmptyReview width={s(224)} height={s(224)} fill={Colors.blue} />
          <Text
            style={[
              Fonts.style.descriptionBold,
              {marginTop: s(16), color: Colors.black},
            ]}>
            {I18n.t('emptyReview')}
          </Text>
          <Text
            style={[
              Fonts.style.descriptionRegular,
              Fonts.style.alignCenter,
              {marginTop: s(8), color: Colors.neutral2, width: s(348)},
            ]}>
            {I18n.t('emptyReviewDescription')}
          </Text>
          <ButtonDefault
            text={I18n.t('submitYourReview')}
            textColor={Colors.blue}
            buttonStyle={{marginTop: s(24), width: s(382)}}
            buttonColor={Colors.white}
            isBordered
          />
        </View>
      </View>
    );
  };

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
        title={transparentOpacity > 0.8 ? paramItem.name : null}
        titleColor={`rgba(48,47,56, ${transparentOpacity - 0.2})`}
        iconColor={transparentOpacity > 0.5 ? Colors.blue : Colors.white}
      />
      <CarauselTop images={paramItem.images} cover={paramItem.cover} />
      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} // default 16
      >
        <CustomBody style={{marginTop: s(359)}}>
          <MainDetails
            name={paramItem.name}
            nameColor={`rgba(48,47,56, ${1 - transparentOpacity})`}
            address={paramItem.address}
            rating={paramItem.rating}
            distance={paramItem.distance}
            openingHours={paramItem.openingHours}
            priceEstimation={paramItem.priceEstimation}
          />

          <View
            style={{
              marginTop: s(56),
              marginHorizontal: s(16),
            }}>
            <View
              style={[
                AppStyles.row,
                {
                  borderBottomWidth: s(1),
                  borderColor: Colors.neutral3,
                },
              ]}>
              {TAB_MENUS.map((menu) => {
                return menu.title === selectedMenu.title ? (
                  <TouchableOpacity
                    key={menu.title}
                    style={{marginRight: s(32)}}>
                    <Text style={[Fonts.style.descriptionBold]}>
                      {menu.title}
                    </Text>
                    <View
                      style={[
                        {
                          height: s(3),
                          marginTop: s(8),
                          backgroundColor: Colors.blue,
                          borderTopLeftRadius: s(3),
                          borderTopRightRadius: s(3),
                        },
                      ]}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    key={menu.title}
                    style={{marginRight: s(32)}}
                    onPress={() => setSelectedMenu(menu)}>
                    <Text
                      style={[
                        Fonts.style.descriptionRegular,
                        {color: Colors.neutral2},
                      ]}>
                      {menu.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {selectedMenu.renderContent()}
          </View>
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
    userPosition: state.session.userPosition,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransportDetailScreen);
