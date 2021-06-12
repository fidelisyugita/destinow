import '../Config';
import DebugConfig from '../Config/DebugConfig';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import RootContainer from './RootContainer';
import createStore from '../Redux';

import Toast from 'react-native-toast-message';

import {Failed, Success} from '../Components/Toast';

// create our store
const store = createStore();

const toastConfig = {
  error: ({text1, props, ...rest}) => <Failed message={text1} />,
  success: (props) => <Success {...props} />,
};

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron ? console.tron.overlay(App) : App;
