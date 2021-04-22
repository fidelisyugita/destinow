import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import I18n from '../I18n';

export default () => {
  return new Promise((resolve, reject) => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('whenInUse');
      Geolocation.getCurrentPosition(
        (position) => {
          console.tron.log({position});
          resolve(position.coords);
        },
        (error) => {
          console.tron.log({error});
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      )
        .then((granted) => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              (position) => {
                console.tron.log({position});
                resolve(position.coords);
              },
              (error) => {
                console.tron.log({error});
                reject(error);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
            );
          } else reject({message: I18n.t('permissionDenied')});
        })
        .catch((error) => reject(error));
    }
  });
};
