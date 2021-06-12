import Toast from 'react-native-toast-message';

import {s} from './Scaling';
import I18n from '../I18n';

import {hideLoader} from '../Components/Modal/Loader/Handler';

const show = (type, message, config = null) => {
  hideLoader();
  Toast.show({
    visibilityTime: 3000,
    bottomOffset: s(16),
    autoHide: true,
    position: 'bottom',
    type: type,
    text1:
      message ||
      (type === 'error' ? I18n.t('anErrorOccured') : I18n.t('success')),
    ...config,
  });
};

export default {show};
