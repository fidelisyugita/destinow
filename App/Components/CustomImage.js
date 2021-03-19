import React, {memo, useState} from 'react';
import {Image} from 'react-native';

import {Images} from '../Themes';

const CustomImage = memo(
  ({source = Images.default11, defaultSource = Images.default11, ...props}) => {
    const [isValidImage, setValidImage] = useState(true);

    return (
      <Image
        onError={() => setValidImage(false)}
        source={isValidImage ? source : defaultSource}
        defaultSource={defaultSource}
        resizeMethod="resize"
        {...props}
      />
    );
  },
);

export default CustomImage;
