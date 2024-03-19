import {AppImage} from '../assets/icon';
import {AppConstant} from '../constant';

const getFlightImg = (airLine: string) => {
  let image;
  switch (airLine) {
    case AppConstant.INDIGO:
      image = AppImage.indigo;
      break;
    case AppConstant.AIR_INDIA:
      image = AppImage.airindia;
      break;
    case AppConstant.SPICEJET:
      image = AppImage.spiceJet;
      break;
    case AppConstant.VISTARA:
      image = AppImage.vistara;
      break;
    case AppConstant.GOAIR:
      image = AppImage.goAir;
      break;
    case AppConstant.AIRASIA:
      image = AppImage.airAsia;
      break;
    default:
      image = AppImage.flightLogo;
      break;
  }
  return image;
};

export {getFlightImg};
