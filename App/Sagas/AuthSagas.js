import {put} from 'redux-saga/effects';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

import AuthActions from '../Redux/AuthRedux';
import SessionActions from '../Redux/SessionRedux';

import NavigationServices from '../Services/NavigationServices';
import {httpsCallable} from './Utils';
import {REGION} from './Consts';

export function* loginGoogle(api, action) {
  try {
    // Get the users ID token
    const {idToken} = yield GoogleSignin.signIn();
    console.tron.log({idToken});

    // Create a Google credential with the token
    const googleCredential = yield auth.GoogleAuthProvider.credential(idToken);
    console.tron.log({googleCredential});

    // Sign-in the user with the credential
    const googleResponse = yield auth().signInWithCredential(googleCredential);
    console.tron.log({googleResponse});

    const user = {
      id: googleResponse.user.uid,
      photoURL: googleResponse.user.photoURL,
      email: googleResponse.user.email,
      displayName: googleResponse.user.displayName,
      phoneNumber: googleResponse.user.phoneNumber,
      photoURL: googleResponse.user.photoURL,
    };

    yield put(SessionActions.removeOnboarding());
    yield put(SessionActions.saveUser(user));
    yield put(AuthActions.loginGoogleSuccess({ok: true, success: true}));
    // yield all([
    //   put(SessionActions.removeOnboarding()),
    //   put(SessionActions.saveUser(googleResponse.user)),
    //   put(AuthActions.loginGoogleSuccess({ok: true, success: true})),
    // ]);
    if (action.callback) {
      action.callback({ok: true, success: true});
      /**
       * TODO
       * - make navigationServices works
       */
      // NavigationServices.pop();
    }
  } catch (error) {
    console.tron.error({error});
    yield put(AuthActions.loginGoogleFailure(error));
    if (action.callback) action.callback({ok: false, error});
  }
}

export function* signOut(api, action) {
  try {
    yield GoogleSignin.signOut();
    // yield auth().signOut();

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
