import {takeLatest, all} from 'redux-saga/effects';
import API from '../Services/Api';
import FixtureAPI from '../Services/FixtureApi';
import DebugConfig from '../Config/DebugConfig';

/* ------------- Types ------------- */

import {StartupTypes} from '../Redux/StartupRedux';
import {GithubTypes} from '../Redux/GithubRedux';

import {PlaceTypes} from '../Redux/PlaceRedux';
import {BannerTypes} from '../Redux/BannerRedux';

/* ------------- Sagas ------------- */

import {startup} from './StartupSagas';
import {getUserAvatar} from './GithubSagas';

import {getPlaces, getFavoritePlaces, getRecommendedPlaces} from './PlaceSagas';
import {getBanners} from './BannerSagas';

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

    takeLatest(PlaceTypes.GET_PLACES_REQUEST, getPlaces, api),
    takeLatest(PlaceTypes.GET_FAVORITE_PLACES_REQUEST, getFavoritePlaces, api),
    takeLatest(
      PlaceTypes.GET_RECOMMENDED_PLACES_REQUEST,
      getRecommendedPlaces,
      api,
    ),

    takeLatest(BannerTypes.GET_BANNERS_REQUEST, getBanners, api),
  ]);
}
