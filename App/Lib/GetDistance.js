import {getDistance} from 'geolib';

import ConvertDistance from './ConvertDistance';
import I18n from '../I18n';

export default (fromPosition = {}, toPosition = {}) => {
  console.tron.log({fromPosition});
  console.tron.log({toPosition});

  const distance = ConvertDistance(
    getDistance(fromPosition, toPosition),
    1000, //  in km
  );

  const caption = fromPosition.isDefault
    ? I18n.t('fromCentralCity')
    : I18n.t('kmAway');

  return `${distance} ${distance ? caption : ''}`;
};
