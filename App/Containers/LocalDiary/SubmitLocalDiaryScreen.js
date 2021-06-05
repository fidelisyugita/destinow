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
import LocalDiaryActions from '../../Redux/LocalDiaryRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {DateFormatter, GetDistance, IsNotEmpty} from '../../Lib';
import I18n from '../../I18n';

import CustomHeader from '../../Components/CustomHeader';
import CustomImage from '../../Components/CustomImage';
import CustomFlatList from '../../Components/CustomFlatList';
import CustomTextInput from '../../Components/CustomTextInput';
import ButtonDefault from '../../Components/Button/ButtonDefault';
import ModalOption from '../../Components/Modal/ModalOption';

const INITIATE_PARAGRAPH = {text: '', image: null};

function SubmitLocalDiaryScreen({
  navigation,
  currentUser,
  userPosition,
  saveLocalDiary,
  saveLocalDiaryRequest,
}) {
  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const paramItem = navigation.getParam('item', {});

  const [title, setTitle] = useState('');
  const [imageCover, setImageCover] = useState(null);
  const [paragraphs, setParagraphs] = useState([INITIATE_PARAGRAPH]);
  const [isValid, setValid] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const [selectedParagraphIndex, setSelectedParagraphIndex] = useState(-1);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (title.length > 0 && imageCover && imageCover.length > 0) setValid(true);
  }, [title, imageCover]);

  function loadData() {
    console.log('paramItem: ', paramItem);
  }

  const onPressChooseImage = () => {
    ImagePicker.openPicker({
      width: s(382 * 2),
      height: s(266 * 2),
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
        setSelectedParagraphIndex(-1);
      });
  };

  const onPressTakePhoto = () => {
    ImagePicker.openCamera({
      width: s(382 * 2),
      height: s(266 * 2),
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
        setSelectedParagraphIndex(-1);
      });
  };

  const updateImage = (image) => {
    console.log('selectedParagraphIndex: ', selectedParagraphIndex);
    const base64Image = `data:${image.mime};base64,${image.data}`;
    if (selectedParagraphIndex > -1) {
      console.log('asdasdsadas: ', selectedParagraphIndex);
      const updatedParagraph = {
        ...paragraphs[selectedParagraphIndex],
        image: base64Image,
      };

      let updatedParagraphs = [...paragraphs];
      updatedParagraphs.splice(selectedParagraphIndex, 1, updatedParagraph);

      setParagraphs(updatedParagraphs);
    } else {
      setImageCover(base64Image);
    }
  };

  const onPressSubmit = () => {
    setLoading(true);
    const data = {
      title: title,
      cover: imageCover,
      paragraphs: paragraphs,
    };

    saveLocalDiaryRequest(data, submitCallback);
  };

  const submitCallback = (response) => {
    setLoading(false);
    if (response.ok) navigation.pop();
  };

  const onScroll = (event) => {
    const contentOffsetY = event.nativeEvent.contentOffset.y;

    const tempTransparentOpacity = contentOffsetY / (Metrics.headerHeight * 3);

    if (tempTransparentOpacity < 2)
      setTransparentOpacity(tempTransparentOpacity);
  };

  function onChangeParagraphText(text, index) {
    const updatedParagraph = {...paragraphs[index], text};

    let updatedParagraphs = [...paragraphs];
    updatedParagraphs.splice(index, 1, updatedParagraph);

    setParagraphs(updatedParagraphs);
  }

  function renderParagraphs() {
    return paragraphs.map((p, index) => (
      <View key={p + index} style={{marginTop: s(24)}}>
        <Text
          style={[Fonts.style.subDescriptionRegular, {color: Colors.neutral2}]}>
          {`${I18n.t('paragraph')} ${index + 1}`}
        </Text>

        <CustomTextInput
          placeholder={I18n.t('typeYourStory')}
          value={p.text}
          onChangeText={(text) => onChangeParagraphText(text, index)}
          containerStyle={{marginTop: s(8), height: s(118)}}
          textInputStyle={{height: s(90)}}
          multiline
        />
        {p.image ? (
          <CustomImage
            source={{uri: p.image}}
            style={{
              width: s(382),
              height: s(266),
              borderRadius: s(8),
              marginTop: s(16),
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSelectedParagraphIndex(index);
              setModalVisible(true);
            }}
            style={[
              AppStyles.alignCenter,
              AppStyles.justifyCenter,
              {
                width: s(382),
                height: s(123),
                borderRadius: s(8),
                borderWidth: s(1),
                borderStyle: 'dashed',
                borderColor: Colors.neutral3,
                marginTop: s(16),
              },
            ]}>
            <Text
              style={[Fonts.style.subDescriptionMedium, {color: Colors.blue}]}>
              {`+ ${I18n.t('uploadImage')}`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    ));
  }

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
        title={I18n.t('submitLocalDiary')}
        iconColor={Colors.blue}
      />
      <ScrollView
        onScroll={(event) => onScroll(event)}
        scrollEventThrottle={160} // default 16
      >
        <View style={{marginTop: s(24), marginHorizontal: s(16)}}>
          <CustomTextInput
            label={`${I18n.t('title')}*`}
            value={title}
            onChangeText={setTitle}
          />

          {imageCover ? (
            <CustomImage
              source={{uri: imageCover}}
              style={{
                width: s(382),
                height: s(167),
                borderRadius: s(8),
                marginTop: s(16),
              }}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[
                AppStyles.alignCenter,
                AppStyles.justifyCenter,
                {
                  width: s(382),
                  height: s(123),
                  borderRadius: s(8),
                  borderWidth: s(1),
                  borderStyle: 'dashed',
                  borderColor: Colors.neutral3,
                  marginTop: s(16),
                },
              ]}>
              <Text
                style={[
                  Fonts.style.subDescriptionMedium,
                  {color: Colors.blue},
                ]}>
                {`+ ${I18n.t('uploadImageCover')}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            marginTop: s(24),
            height: s(1),
            backgroundColor: Colors.neutral3,
          }}
        />

        <View style={{marginTop: s(24), marginHorizontal: s(16)}}>
          <Text style={[Fonts.style.descriptionMedium]}>
            {I18n.t('tellYourStory')}
          </Text>

          {renderParagraphs()}

          {paragraphs.length < 5 && (
            <ButtonDefault
              onPress={() => setParagraphs([...paragraphs, INITIATE_PARAGRAPH])}
              buttonStyle={{marginTop: s(16)}}
              SvgIcon={Svgs.IconBurger}
              text={I18n.t('addParagraph')}
              textColor={Colors.blue}
              buttonColor={Colors.white}
              isBordered
            />
          )}

          <ButtonDefault
            onPress={onPressSubmit}
            buttonStyle={{marginTop: s(89), marginBottom: s(56)}}
            text={I18n.t('submitStory')}
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

    saveLocalDiary: state.localDiary.saveLocalDiary,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
  saveLocalDiaryRequest: (data, callback) =>
    dispatch(LocalDiaryActions.saveLocalDiaryRequest(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitLocalDiaryScreen);
