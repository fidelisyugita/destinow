import {s, vs, ms} from '../Lib/Scaling';
import Colors from './Colors';

const type = {
  bold: 'Roboto-Bold',
  medium: 'Roboto-Medium',
  regular: 'Roboto-Regular',
};

const size = {
  title: s(24),
  subTitle: s(20),
  description: s(16),
  subDescription: s(14),
  caption: s(12),
  footnote: s(10.5),
};

const style = {
  alignCenter: {
    textAlign: 'center',
  },
  alignJustify: {
    textAlign: 'justify',
  },
  transformCapitalize: {
    textTransform: 'capitalize',
  },
  underline: {
    textDecorationLine: 'underline',
  },

  title: {
    fontFamily: type.bold,
    fontSize: size.title,
    color: Colors.neural1,
  },
  subTitle: {
    fontFamily: type.medium,
    fontSize: size.subTitle,
    color: Colors.neural1,
  },
  descriptionBold: {
    fontFamily: type.bold,
    fontSize: size.description,
    color: Colors.neural1,
  },
  descriptionMedium: {
    fontFamily: type.medium,
    fontSize: size.description,
    color: Colors.neural1,
  },
  descriptionRegular: {
    fontFamily: type.regular,
    fontSize: size.description,
    color: Colors.neural1,
  },
  subDescriptionMedium: {
    fontFamily: type.medium,
    fontSize: size.subDescription,
    color: Colors.neural1,
  },
  subDescriptionRegular: {
    fontFamily: type.regular,
    fontSize: size.subDescription,
    color: Colors.neural1,
  },
  captionMedium: {
    fontFamily: type.medium,
    fontSize: size.caption,
    color: Colors.neural1,
  },
  captionRegular: {
    fontFamily: type.regular,
    fontSize: size.caption,
    color: Colors.neural1,
  },
  footnoteMedium: {
    fontFamily: type.medium,
    fontSize: size.footnote,
    color: Colors.neural1,
  },
  footnoteRegular: {
    fontFamily: type.regular,
    fontSize: size.footnote,
    color: Colors.neural1,
  },
};

export default {
  type,
  size,
  style,
};
