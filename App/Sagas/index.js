import {takeLatest, all} from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux';
import {GithubTypes} from '../Redux/GithubRedux';

import {AuthTypes} from '../Redux/AuthRedux';
import {BannerTypes} from '../Redux/BannerRedux';

import {PlaceTypes} from '../Redux/PlaceRedux';
import {RestaurantTypes} from '../Redux/RestaurantRedux';
import {SouvenirTypes} from '../Redux/SouvenirRedux';
import {TransportTypes} from '../Redux/TransportRedux';
import {NewsTypes} from '../Redux/NewsRedux';
import {LocalDiaryTypes} from '../Redux/LocalDiaryRedux';

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas';
import {getUserAvatar} from './GithubSagas';

import {loginGoogle, signOut} from './AuthSagas';
import {getBanners} from './BannerSagas';

import {getPlaces, getFavoritePlaces, getRecommendedPlaces} from './PlaceSagas';
import {getRestaurants, getRecommendedRestaurants} from './RestaurantSagas';
import {getSouvenirs, getRecommendedSouvenirs} from './SouvenirSagas';
import {getTransports, getRecommendedTransports} from './TransportSagas';
import {getNews, getRecommendedNews} from './NewsSagas';
import {getLocalDiaries, getRecommendedLocalDiaries} from './LocalDiarySagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(AuthTypes.LOGIN_GOOGLE_REQUEST, loginGoogle, api),
    takeLatest(AuthTypes.SIGN_OUT_REQUEST, signOut, api),

    takeLatest(BannerTypes.GET_BANNERS_REQUEST, getBanners, api),

    takeLatest(PlaceTypes.GET_PLACES_REQUEST, getPlaces, api),
    takeLatest(PlaceTypes.GET_FAVORITE_PLACES_REQUEST, getFavoritePlaces, api),
    takeLatest(
      PlaceTypes.GET_RECOMMENDED_PLACES_REQUEST,
      getRecommendedPlaces,
      api,
    ),

    takeLatest(RestaurantTypes.GET_RESTAURANTS_REQUEST, getRestaurants, api),
    takeLatest(
      RestaurantTypes.GET_RECOMMENDED_RESTAURANTS_REQUEST,
      getRecommendedRestaurants,
      api,
    ),

    takeLatest(SouvenirTypes.GET_SOUVENIRS_REQUEST, getSouvenirs, api),
    takeLatest(
      SouvenirTypes.GET_RECOMMENDED_SOUVENIRS_REQUEST,
      getRecommendedSouvenirs,
      api,
    ),

    takeLatest(TransportTypes.GET_TRANSPORTS_REQUEST, getTransports, api),
    takeLatest(
      TransportTypes.GET_RECOMMENDED_TRANSPORTS_REQUEST,
      getRecommendedTransports,
      api,
    ),

    takeLatest(NewsTypes.GET_NEWS_REQUEST, getNews, api),
    takeLatest(NewsTypes.GET_RECOMMENDED_NEWS_REQUEST, getRecommendedNews, api),

    takeLatest(LocalDiaryTypes.GET_LOCAL_DIARIES_REQUEST, getLocalDiaries, api),
    takeLatest(
      LocalDiaryTypes.GET_RECOMMENDED_LOCAL_DIARIES_REQUEST,
      getRecommendedLocalDiaries,
      api,
    ),
  ]);
}
