import {Dimensions, Platform} from 'react-native';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';

const {width, height} = Dimensions.get('window');

import {s, vs} from '../Lib/Scaling';

// Used via Metrics.baseMargin
const metrics = {
  headerHeight: s(48),
  bottomNavigationHeight: s(56),
  statusBarHeight: getStatusBarHeight(true),
  bottomSpace: getBottomSpace(),
  pureScreenHeight:
    width < height
      ? height - getStatusBarHeight(true) - getBottomSpace()
      : width - getStatusBarHeight(true) - getBottomSpace(),
};

export default metrics;
