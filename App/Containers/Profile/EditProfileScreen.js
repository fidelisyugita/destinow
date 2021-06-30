import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import HTML from 'react-native-render-html';
import ImagePicker from 'react-native-image-crop-picker';

import SessionActions from '../../Redux/SessionRedux';
import UserActions from '../../Redux/UserRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {DateFormatter, GetDistance, IsNotEmpty, Toast} from '../../Lib';
import I18n from '../../I18n';

import CustomHeader from '../../Components/CustomHeader';
import CustomImage from '../../Components/CustomImage';
import CustomFlatList from '../../Components/CustomFlatList';
import CustomTextInput from '../../Components/CustomTextInput';
import ButtonDefault from '../../Components/Button/ButtonDefault';
import ModalOption from '../../Components/Modal/ModalOption';
import {hideLoader, showLoader} from '../../Components/Modal/Loader/Handler';

const INITIATE_PARAGRAPH = {text: '', image: null};

function EditProfileScreen({
  navigation,
  currentUser,
  userPosition,
  saveUser,
  saveUserRequest,
}) {
  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const paramItem = navigation.getParam('item', {});

  const [displayName, setDisplayName] = useState(currentUser.displayName || '');
  const [photoURL, setPhotoURL] = useState(currentUser.photoURL);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber || '');

  const [isValid, setValid] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (displayName.length > 0 && photoURL && photoURL.length > 0)
      setValid(true);
    else setValid(false);
  }, [displayName, photoURL]);

  function loadData() {
    console.log('paramItem: ', paramItem);
  }

  const onPressChooseImage = () => {
    ImagePicker.openPicker({
      width: 512,
      height: 512,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.7,
    })
      .then(updateImage)
      .catch((error) => {
        console.tron.log({error});
      })
      .finally(() => {
        setModalVisible(false);
      });
  };

  const onPressTakePhoto = () => {
    ImagePicker.openCamera({
      width: 512,
      height: 512,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 0.7,
    })
      .then(updateImage)
      .catch((error) => {
        console.tron.log({error});
      })
      .finally(() => {
        setModalVisible(false);
      });
  };

  const updateImage = (image) => {
    const base64Image = `data:${image.mime};base64,${image.data}`;
    setPhotoURL(base64Image);
  };

  const onPressSubmit = () => {
    showLoader();
    setLoading(true);
    const data = {
      displayName: displayName,
      photoURL: photoURL,
      phoneNumber: phoneNumber,
    };

    saveUserRequest(data, submitCallback);
  };

  const submitCallback = (response) => {
    hideLoader();
    setLoading(false);
    if (response.ok) {
      Toast.show('success', I18n.t('profileUpdated'));
      navigation.pop();
    }
  };

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    const tempTransparentOpacity = contentOffsetY / (Metrics.headerHeight * 3);

    if (tempTransparentOpacity < 2)
      setTransparentOpacity(tempTransparentOpacity);
  };

  return (
    <SafeAreaView>
      <ModalOption
        onPressCancel={() => setModalVisible(false)}
        visible={isModalVisible}
        transparent
        title={I18n.t('uploadImage')}
        options={[
          {
            onPress: onPressTakePhoto,
            text: I18n.t('camera'),
            SvgIcon: Svgs.IconCamera,
          },
          {
            onPress: onPressChooseImage,
            text: I18n.t('gallery'),
            SvgIcon: Svgs.IconGallery,
          },
        ]}
      />

      <CustomHeader
        onBack={() => navigation.pop()}
        // transparent={true}
        transparentOpacity={1}
        title={I18n.t('editProfile')}
        iconColor={Colors.blue}
      />
      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} // default 16
      >
        <TouchableOpacity
          style={[AppStyles.alignCenter, {marginTop: s(24)}]}
          onPress={() => setModalVisible(true)}>
          <View>
            <CustomImage
              source={{uri: photoURL}}
              style={{
                width: s(104),
                height: s(104),
                borderRadius: s(104 / 2),
                backgroundColor: Colors.black,
                opacity: 0.7,
              }}
            />
            <View
              style={[AppStyles.positionAbstolute, {top: s(40), left: s(40)}]}>
              <Svgs.IconEdit width={s(24)} height={s(24)} fill={Colors.white} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={[{marginTop: s(32), marginHorizontal: s(16)}]}>
          <CustomTextInput
            label={`${I18n.t('fullName')}*`}
            value={displayName}
            onChangeText={setDisplayName}
          />
          <CustomTextInput
            label={`${I18n.t('phoneNumber')}`}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            containerStyle={{marginTop: s(16)}}
            keyboardType="phone-pad"
          />

          <ButtonDefault
            onPress={onPressSubmit}
            buttonStyle={{marginTop: s(24), marginBottom: s(56)}}
            text={I18n.t('save')}
            textColor={isValid ? Colors.white : Colors.neutral3}
            buttonColor={isValid ? Colors.blue : Colors.neutral4}
            isLoading={isLoading}
            disabled={isLoading || !isValid}
          />
        </View>

        <View style={{height: s(56)}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  console.tron.log({state});
  return {
    currentUser: state.session.user,
    userPosition: state.session.userPosition,

    saveUser: state.user.saveUser,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  saveUserRequest: (data, callback) =>
    dispatch(UserActions.saveUserRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
