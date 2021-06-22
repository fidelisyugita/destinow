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
import ReviewActions from '../../Redux/ReviewRedux';

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
import {showLoader} from '../../Components/Modal/Loader/Handler';

const INITIATE_PARAGRAPH = {text: '', image: null};

function SubmitReviewScreen({
  navigation,
  currentUser,
  userPosition,
  saveReview,
  saveReviewRequest,
}) {
  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const paramItem = navigation.getParam('item', {});

  const [reviewText, setReviewText] = useState('');
  const [reviewRate, setReviewRate] = useState(0);
  const [reviewPics, setReviewPics] = useState([]);

  const [isValid, setValid] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (reviewText.length > 0 && reviewRate > 0) setValid(true);
    else setValid(false);
  }, [reviewText, reviewRate]);

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
    setReviewPics([...reviewPics, base64Image]);
  };

  const onPressSubmit = () => {
    showLoader();
    setLoading(true);
    const data = {
      placeId: paramItem.id,
      rate: reviewRate,
      text: reviewText,
      images: reviewPics,
    };

    saveReviewRequest(data, submitCallback);
  };

  const submitCallback = (response) => {
    setLoading(false);
    if (response.ok) {
      Toast.show('success', I18n.t('reviewSubmitted'));
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
        title={I18n.t('submitReview')}
        iconColor={Colors.blue}
      />
      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} // default 16
      >
        <View style={[{marginHorizontal: s(16)}]}>
          <View style={[AppStyles.row, {marginTop: s(20)}]}>
            <CustomImage
              source={
                paramItem.cover ? {uri: paramItem.cover.src} : Images.default11
              }
              style={{
                width: s(44),
                height: s(44),
                borderRadius: s(8),
              }}
            />
            <View
              style={[
                AppStyles.flex1,
                AppStyles.justifyCenter,
                {marginLeft: s(8)},
              ]}>
              <Text numberOfLines={1} style={[Fonts.style.descriptionBold]}>
                {paramItem.name || '-'}
              </Text>
              <Text
                numberOfLines={1}
                style={[
                  Fonts.style.captionRegular,
                  {color: Colors.neutral2, marginTop: s(4)},
                ]}>
                {paramItem.address || '-'}
              </Text>
            </View>
          </View>

          <View
            style={[
              AppStyles.row,
              AppStyles.alignCenter,
              AppStyles.justifyCenter,
              {
                width: '100%',
                height: s(80),
                borderRadius: s(16),
                backgroundColor: Colors.lightBlue,
                marginTop: s(24),
              },
            ]}>
            {Array(5)
              .fill(false)
              .map((item, index) => {
                const SvgIcon =
                  index < reviewRate ? Svgs.IconStarFilled : Svgs.IconStar;
                return (
                  <TouchableOpacity
                    key={item + index}
                    onPress={() => setReviewRate(index + 1)}>
                    <SvgIcon width={s(48)} height={s(48)} fill={Colors.blue} />
                  </TouchableOpacity>
                );
              })}
          </View>

          <Text style={[Fonts.style.descriptionMedium, {marginTop: s(24)}]}>
            {I18n.t('photo')}
          </Text>
          {IsNotEmpty(reviewPics) && (
            <View style={[AppStyles.row, {marginTop: s(8)}]}>
              {reviewPics.map((item, index) => (
                <CustomImage
                  key={item + index}
                  source={{uri: item}}
                  style={{
                    width: s(70),
                    height: s(70),
                    borderRadius: s(8),
                    marginRight: s(8),
                  }}
                />
              ))}
            </View>
          )}
          {reviewPics.length < 3 && (
            <ButtonDefault
              onPress={() => setModalVisible(true)}
              buttonStyle={{marginTop: s(16)}}
              text={I18n.t('addPhoto')}
              textColor={Colors.blue}
              buttonColor={Colors.white}
              isBordered
              SvgIcon={Svgs.IconCamera}
            />
          )}

          <CustomTextInput
            placeholder={`${I18n.t('submitReviewPlaceholder')}`}
            value={reviewText}
            onChangeText={setReviewText}
            containerStyle={{height: s(142), marginTop: s(16)}}
            textInputStyle={{height: s(142 - 28)}}
            multiline
          />

          <ButtonDefault
            onPress={onPressSubmit}
            buttonStyle={{marginTop: s(85), marginBottom: s(56)}}
            text={I18n.t('saveReview')}
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

    saveReview: state.review.saveReview,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  saveReviewRequest: (data, callback) =>
    dispatch(ReviewActions.saveReviewRequest(data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubmitReviewScreen);
