import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Modal from 'react-native-modal';

import CustomLoader from '../../CustomLoader';

const Loader = forwardRef((props, ref) => {
  const [isVisible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  return (
    <Modal
      ref={ref}
      transparent
      style={{margin: 0}}
      statusBarTranslucent
      isVisible={isVisible}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}>
      <CustomLoader />
    </Modal>
  );
});

export default Loader;
