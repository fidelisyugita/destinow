import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const AppStyles = {
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },

  positionAbstolute: {
    position: 'absolute',
  },
  zIndex1: {
    zIndex: 1,
  },
  overflowHidden: {
    overflow: 'hidden',
  },

  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },

  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },

  backgroundWhite: {
    backgroundColor: Colors.white,
  },

  shadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  smallShadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
};

export default AppStyles;
