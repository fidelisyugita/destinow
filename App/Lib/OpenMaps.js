import openMap, {createOpenLink} from 'react-native-open-maps';

export default (coordinate = {}) => {
  console.log('coordinate: ', coordinate);
  if (coordinate && coordinate.latitude && coordinate.longitude) {
    console.log('asdsa: ', coordinate);
    openMap({
      ...coordinate,
      zoom: 30,
      // navigate_mode: 'navigate',
      // end: item.name,
    });
  }
};
