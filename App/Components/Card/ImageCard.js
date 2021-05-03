import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import ImageView from 'react-native-image-viewing';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import I18n from '../../I18n';

import CustomImage from '../CustomImage';
import CustomFlatList from '../CustomFlatList';

const ImageCard = ({images = [], style = {}, small = false}) => {
  const [isImageViewVisible, setImageViewVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const onImageIndexChange = (value) => setImageIndex(value);
  const onRequestClose = () => setImageViewVisible(false);

  return (
    <View>
      <ImageView
        images={images.map((item) => {
          return {uri: item.image.src};
        })}
        imageIndex={imageIndex}
        visible={isImageViewVisible}
        FooterComponent={(footerProps) => (
          <ScrollView
            horizontal
            style={{backgroundColor: Colors.black}}
            contentContainerStyle={{
              paddingVertical: s(16),
              paddingHorizontal: s(16 - 4),
            }}>
            {images.map((item, index) => (
              <TouchableOpacity
                key={item + index}
                onPress={() => setImageIndex(index)}
                style={{
                  marginHorizontal: s(4),
                }}>
                <CustomImage
                  source={{uri: item.image.src}}
                  style={{
                    width: s(64),
                    height: s(64),
                    borderRadius: s(8),
                    opacity: footerProps.imageIndex === index ? 0.3 : 1,
                  }}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        onRequestClose={onRequestClose}
        // onImageIndexChange={onImageIndexChange}
        animationType="none"
      />

      <CustomFlatList
        data={images}
        numColumns={small ? 3 : 2}
        style={[
          {
            marginTop: small ? s(24 - 4) : s(24 - 12),
            marginHorizontal: small ? s(16 - 4) : s(16 - 8),
          },
          style,
        ]}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={item + index}
            onPress={() => {
              setImageViewVisible(true);
              setImageIndex(index);
            }}
            style={{
              marginVertical: small ? s(4) : s(12),
              marginHorizontal: small ? s(4) : s(8),
            }}>
            <CustomImage
              source={item.image.src ? {uri: item.image.src} : Images.default11}
              defaultSource={Images.default11}
              style={{
                width: small ? s(122) : s(183),
                height: small ? s(122) : s(181),
                borderRadius: s(16),
              }}
            />
            {!small && (
              <Text style={[Fonts.style.descriptionBold, {marginTop: s(16)}]}>
                {item.name || '-'}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ImageCard;
