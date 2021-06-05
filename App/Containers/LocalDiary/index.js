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
import LocalDiaryActions from '../../Redux/LocalDiaryRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import * as Consts from '../../Lib/Consts';
import I18n from '../../I18n';

import CustomHeader from '../../Components/CustomHeader';
import CustomLoader from '../../Components/CustomLoader';
import NewsList from '../../Components/List/NewsList';
import {DateFormatter} from '../../Lib';
import LocalDiaryList from '../../Components/List/LocalDiaryList';

function LocalDiaryScreen({
  navigation,
  currentUser,
  userPosition,

  localDiaries,

  getLocalDiaries,
  getLocalDiariesRequest,
}) {
  const flatListRef = useRef();

  const {navigate} = navigation;

  const [isEnd, setEnd] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadLocalDiaries();
  }, [page]);

  function loadData() {
    loadLocalDiaries(0);
  }

  function loadLocalDiaries(forcePage) {
    const data = {
      limit: Consts.DATA_PER_PAGE,
      page: forcePage || page,
    };

    console.log('data: ', data);

    if (!getLocalDiaries.fetching || forcePage === 0)
      getLocalDiariesRequest(data);
  }

  const loadMore = () => {
    const {fetching, payload} = getLocalDiaries;

    if (!fetching && payload && payload.length === Consts.DATA_PER_PAGE)
      setPage(page + 1);

    setEnd(!payload || payload.length !== Consts.DATA_PER_PAGE);
  };

  const goToTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const onPressAdd = () => {
    if (currentUser.email) navigate('SubmitLocalDiaryScreen');
    else navigate('Auth');
  };

  const renderHeader = () => {
    return <View></View>;
  };

  const renderFooter = () => {
    return (
      <View style={{marginBottom: s(56)}}>
        {getLocalDiaries.fetching && <CustomLoader />}
        {isEnd && (
          <View
            style={[
              AppStyles.alignCenter,
              {marginTop: s(48 - 24), marginHorizontal: s(16)},
            ]}>
            <Text
              style={[Fonts.style.captionRegular, {color: Colors.neutral2}]}>
              {I18n.t('youHaveSeenAllLocalDiaries')}
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
        // transparent={true}
        transparentOpacity={1}
        title={I18n.t('localDiaries')}
        iconColor={Colors.blue}
        rightIcons={[
          {
            SvgIcon: Svgs.IconPlus,
            onPress: onPressAdd,
          },
        ]}
      />

      <View
        style={[
          AppStyles.row,
          AppStyles.alignCenter,
          {
            margin: s(16),
            paddingHorizontal: s(16),
            paddingVertical: s(8),
            borderRadius: s(8),
            backgroundColor: Colors.lightBlue,
          },
        ]}>
        <Svgs.IconStarComment
          width={s(32)}
          height={s(32)}
          fill={Colors.darkBlue}
        />
        <View style={{marginLeft: s(16)}}>
          <Text style={[Fonts.style.subDescriptionMedium]}>
            {`${I18n.t('submitYourThoughtAboutBelitung')}!`}
          </Text>
          <Text style={[Fonts.style.captionRegular, {marginTop: s(2)}]}>
            {I18n.t('submitYourThoughtAboutBelitungDescription')}
          </Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} //  default 16
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        data={localDiaries}
        renderItem={({item, index}) => (
          <LocalDiaryList
            onPress={() => navigate('LocalDiaryDetailScreen', {item})}
            key={item + index}
            imageSrc={item.cover ? {uri: item.cover} : Images.default32}
            caption={DateFormatter(item.createdAt)}
            title={item.title}
            description={item.paragraphs[0]?.text}
            authorImageSrc={item.createdBy?.photoURL}
            authorName={item.createdBy?.displayName}
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

    localDiaries: state.localDiary.localDiaries,

    getLocalDiaries: state.localDiary.getLocalDiaries,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  getLocalDiariesRequest: (data, callback) =>
    dispatch(LocalDiaryActions.getLocalDiariesRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocalDiaryScreen);
