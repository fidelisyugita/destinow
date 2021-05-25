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

import SessionActions from '../../Redux/SessionRedux';

import {Colors, Fonts, Metrics, Images, Svgs, AppStyles} from '../../Themes';
import {s, vs} from '../../Lib/Scaling';
import {DateFormatter, GetDistance, IsNotEmpty} from '../../Lib';
import I18n from '../../I18n';

import CustomHeader from '../../Components/CustomHeader';
import CustomImage from '../../Components/CustomImage';
import CustomFlatList from '../../Components/CustomFlatList';
import CustomTextInput from '../../Components/CustomTextInput';
import ButtonDefault from '../../Components/Button/ButtonDefault';

const INITIATE_PARAGRAPH = {text: '', image: ''};

function SubmitLocalDiaryScreen({navigation, currentUser, userPosition}) {
  const {navigate} = navigation;
  const [transparentOpacity, setTransparentOpacity] = useState(0);

  const paramItem = navigation.getParam('item', {});

  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState([INITIATE_PARAGRAPH]);
  const [isValid, setValid] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (title.length > 0) setValid(true);
  }, [title]);

  function loadData() {
    console.log('paramItem: ', paramItem);
  }

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

        <TouchableOpacity
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
      </View>
    ));
  }

  return (
    <SafeAreaView>
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

          <TouchableOpacity
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
              {`+ ${I18n.t('uploadImageCover')}`}
            </Text>
          </TouchableOpacity>
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

          <ButtonDefault
            onPress={() => setParagraphs([...paragraphs, INITIATE_PARAGRAPH])}
            buttonStyle={{marginTop: s(16)}}
            SvgIcon={Svgs.IconBurger}
            text={I18n.t('addParagraph')}
            textColor={Colors.blue}
            buttonColor={Colors.white}
            isBordered
          />

          <ButtonDefault
            buttonStyle={{marginTop: s(89), marginBottom: s(56)}}
            text={I18n.t('submitStory')}
            textColor={isValid ? Colors.white : Colors.neutral3}
            buttonColor={isValid ? Colors.blue : Colors.neutral4}
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  logout: (data, callback) => dispatch(SessionActions.logout(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubmitLocalDiaryScreen);
