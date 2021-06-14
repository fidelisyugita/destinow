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
import NewsActions from '../../Redux/NewsRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import * as Consts from '../../Lib/Consts';
import I18n from '../../I18n';
import {DateFormatter} from '../../Lib';

import CustomHeader from '../../Components/CustomHeader';
import CustomLoader from '../../Components/CustomLoader';
import NewsList from '../../Components/List/NewsList';
import EmptyState from '../../Components/EmptyState';
import NewsCard from '../../Components/Card/NewsCard';

function InboxScreen({
  navigation,
  currentUser,
  userPosition,

  news,

  getNews,
  getNewsRequest,
}) {
  const flatListRef = useRef();

  const {navigate} = navigation;

  const [isEnd, setEnd] = useState(false);

  const [page, setPage] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadNews();
  }, [page]);

  function loadData() {
    loadNews(0);
  }

  function loadNews(forcePage) {
    const data = {
      limit: Consts.DATA_PER_PAGE,
      page: forcePage || page,
    };

    console.log('data: ', data);

    if (!getNews.fetching || forcePage === 0) getNewsRequest(data);
  }

  const loadMore = () => {
    const {fetching, payload} = getNews;

    if (!fetching && payload && payload.length === Consts.DATA_PER_PAGE)
      setPage(page + 1);

    setEnd(!payload || payload.length !== Consts.DATA_PER_PAGE);
  };

  const goToTop = () => {
    flatListRef.current.scrollToOffset({animated: true, offset: 0});
  };

  const renderHeader = () => {
    return <View></View>;
  };

  const renderFooter = () => {
    return (
      <View style={{marginBottom: s(56)}}>
        {getNews.fetching && <CustomLoader />}
        {isEnd && (
          <View
            style={[
              AppStyles.alignCenter,
              {marginTop: s(48 - 24), marginHorizontal: s(16)},
            ]}>
            <Text
              style={[Fonts.style.captionRegular, {color: Colors.neutral2}]}>
              {I18n.t('youHaveSeenAllNews')}
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
      <FlatList
        ref={flatListRef}
        // onScroll={(event) => onScroll(event)}
        // scrollEventThrottle={160} //  default 16
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        data={news}
        renderItem={({item, index}) => (
          <NewsCard
            // onPress={() => navigate('NewsDetailScreen', {item})}
            key={item + index}
            imageSrc={item.cover ? {uri: item.cover.src} : null}
            caption={DateFormatter(item.createdAt)}
            title={item.title}
            description={item.description}
            hideBorderTop={index === 0}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            containerStyle={{
              minHeight:
                Metrics.pureScreenHeight - Metrics.bottomNavigationHeight,
            }}
            SvgImage={Svgs.EmptyNotification}
            text={I18n.t('emptyNotification')}
            caption={I18n.t('emptyNotificationDescription')}
          />
        }
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

    news: state.news.news,

    getNews: state.news.getNews,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  getNewsRequest: (data, callback) =>
    dispatch(NewsActions.getNewsRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InboxScreen);
