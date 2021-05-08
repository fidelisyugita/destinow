import {put, select} from 'redux-saga/effects';
import Secrets from 'react-native-config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import SessionActions, {SessionSelectors} from '../Redux/SessionRedux';

import {GetUserPosition} from '../Lib';

const {getUser} = SessionSelectors;

// process STARTUP actions
export function* startup(action) {
  try {
    const coords = yield GetUserPosition();
    console.tron.log({getUserPosition: coords});
    yield put(SessionActions.saveUserPosition(coords));
  } catch (error) {
    console.tron.error({error});
    // DropDownHolder.alert(
    //   'error',
    //   error.message || I18n.t('errorDefault'),
    //   I18n.t('needLocationAccess'),
    // );
    // setTimeout(() => BackHandler.exitApp(), 10000);
  }

  GoogleSignin.configure({
    webClientId: Secrets.WEB_CLIENT_ID,
    iosClientId: Secrets.IOS_CLIENT_ID,
  });

  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log("Hello, I'm an example of how to log via Reactotron.");
  }
}
