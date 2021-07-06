import {Platform} from 'react-native';
import {put} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {v4 as uuid} from 'uuid';

import AuthActions from '../Redux/AuthRedux';
import SessionActions from '../Redux/SessionRedux';

import NavigationServices from '../Services/NavigationServices';
import {httpsCallable} from './Utils';
import {REGION, SAVE_USER} from './Consts';

export function* loginGoogle(api, action) {
  try {
    yield GoogleSignin.hasPlayServices();
    const {idToken} = yield GoogleSignin.signIn();
    console.tron.log({idToken});

    const {accessToken} = yield GoogleSignin.getTokens();
    console.tron.log({accessToken});

    // Create a Google credential with the token
    const googleCredential = yield auth.GoogleAuthProvider.credential(
      idToken,
      accessToken,
    );
    console.tron.log({googleCredential});

    // Sign-in the user with the credential
    const googleResponse = yield auth().signInWithCredential(googleCredential);
    console.tron.log({googleResponse});

    let user = {
      id: googleResponse.user.uid,
      photoURL: googleResponse.user.photoURL,
      email: googleResponse.user.email,
      displayName: googleResponse.user.displayName,
      phoneNumber: googleResponse.user.phoneNumber,
    };

    const authStatus = yield messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    let fcmToken = null;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
      fcmToken = yield messaging().getToken();
      // console.log('fcmToken:', fcmToken);
      user = {
        ...user,
        fcmToken,
      };
    }

    const response = yield httpsCallable(SAVE_USER, {fcmToken});
    console.tron.log({response});

    if (response.data.ok) user = {...user, ...response.data.payload};
    console.tron.log({user});

    yield put(SessionActions.removeOnboarding());
    yield put(SessionActions.saveUser(user));
    yield put(AuthActions.loginGoogleSuccess({ok: true, success: true}));
    if (action.callback) {
      action.callback({ok: true, success: true});
      /**
       * TODO
       * - make navigationServices works
       */
      NavigationServices.navigate('Bottom');
      // NavigationServices.pop();
    }
  } catch (error) {
    console.tron.error({error});
    yield put(AuthActions.loginGoogleFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* loginApple(api, action) {
  try {
    let appleResponse = {};
    if (Platform.OS === 'ios') {
      // Start the sign-in request
      const appleAuthRequestResponse = yield appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw 'Apple Sign-In failed - no identify token returned';
      }

      // Create a Firebase credential from the response
      const {identityToken, nonce} = appleAuthRequestResponse;
      const appleCredential = yield auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Sign the user in with the credential
      appleResponse = yield auth().signInWithCredential(appleCredential);
      console.tron.log({appleResponse});
      // console.log('appleResponse: ', appleResponse);
    } else {
      // Generate secure, random values for state and nonce
      const rawNonce = uuid();
      const state = uuid();

      // Configure the request
      appleAuthAndroid.configure({
        clientId: 'id.destinow.service',
        redirectUri: 'https://destinow.firebaseapp.com/__/auth/handler',
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
      });

      // Open the browser window for user sign in
      const appleAuthRequestResponse = yield appleAuthAndroid.signIn();
      console.tron.log({appleAuthRequestResponse});

      // // Create a Firebase credential from the response
      // const appleCredential = yield auth.AppleAuthProvider.credential(
      //   appleAuthRequestResponse.id_token,
      //   rawNonce,
      // );

      // // Sign the user in with the credential
      // appleResponse = yield auth().signInWithCredential(appleCredential);
      // console.tron.log({appleResponse});
      // console.log('appleResponse: ', appleResponse);
      throw 'Not ready';
    }

    let user = {
      // id: appleResponse.additionalUserInfo.profile.uid,
      // photoURL: appleResponse.additionalUserInfo.profile.photoURL,
      email: appleResponse.additionalUserInfo.profile.email,
      // displayName: appleResponse.additionalUserInfo.profile.displayName,
      // phoneNumber: appleResponse.additionalUserInfo.profile.phoneNumber,
    };

    const authStatus = yield messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    let fcmToken = null;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
      fcmToken = yield messaging().getToken();
      // console.log('fcmToken:', fcmToken);
      user = {
        ...user,
        fcmToken,
      };
    }

    const response = yield httpsCallable(SAVE_USER, {fcmToken});
    console.tron.log({response});

    if (response.data.ok) user = {...user, ...response.data.payload};
    console.tron.log({user});

    yield put(SessionActions.removeOnboarding());
    yield put(SessionActions.saveUser(user));
    yield put(AuthActions.loginAppleSuccess({ok: true, success: true}));
    if (action.callback) {
      action.callback({ok: true, success: true});
      /**
       * TODO
       * - make navigationServices works
       */
      NavigationServices.navigate('Bottom');
      // NavigationServices.pop();
    }
  } catch (error) {
    console.tron.error({error});
    yield put(AuthActions.loginAppleFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* signOut(api, action) {
  try {
    yield GoogleSignin.signOut();
    yield auth().signOut();

    console.tron.log({logout: 'success'});

    yield put(SessionActions.logout());
    yield put(AuthActions.signOutSuccess({ok: true, success: true}));
    if (action.callback) action.callback({ok: true, success: true});
  } catch (error) {
    console.tron.error({error});
    yield put(AuthActions.signOutFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}
