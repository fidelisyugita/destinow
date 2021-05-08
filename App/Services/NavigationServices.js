import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  if (navigatorRef !== null && navigatorRef !== undefined) {
    _navigator = navigatorRef;
  }
}

function navigate(routeName, params) {
  if (_navigator) {
    const navigation = _navigator.getCurrentNavigation();
    navigation.navigate(routeName, params);
  }
}

function dispatch(action) {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    navigation.dispatch(action);
  }
}

function findActiveScreen(state, topRoute) {
  const {routes, index} = state;
  if (routes && routes[index]) {
    return findActiveScreen(routes[index], topRoute);
  }
  return {
    ...state,
    topRoute,
  };
}

function getActiveScreenAndParams() {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    const {state} = navigation;
    const topRoute = state.routes[state.index];
    return findActiveScreen(state, {
      key: topRoute.key,
      routeName: topRoute.routeName,
    });
  } else {
    return undefined;
  }
}

function goBack() {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    navigation.goBack();
  }
}

function pop(number = 1) {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    const action = StackActions.pop({n: number});
    navigation.dispatch(action);
  }
}

function popToTop() {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    const action = StackActions.popToTop();
    navigation.dispatch(action);
  }
}

function replace(routeName, params) {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    const action = StackActions.replace({routeName, params});
    navigation.dispatch(action);
  }
}

function push(routeName, params) {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    const action = StackActions.push({routeName, params});
    navigation.dispatch(action);
  }
}

function reset(routeName, params) {
  if (_navigator && _navigator.currentNavProp) {
    const navigation = _navigator.currentNavProp;
    const action = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: routeName,
        }),
      ],
    });
    navigation.dispatch(action);
  }
}
// add other navigation functions that you need and export them

export default {
  navigate,
  dispatch,
  setTopLevelNavigator,
  getActiveScreenAndParams,
  goBack,
  pop,
  popToTop,
  replace,
  push,
  reset,
};
