import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAnchor,
  faBug,
  faCar,
  faFlask,
  faFutbol,
  faHandSpock,
  faLiraSign,
  faSnowflake,
  faSun,
  faHouse,
  faFaceSmile,
  faStar,
  faGhost,
  faFire,
  faCompass,
  faPalette,
  faFeather,
} from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-regular-svg-icons';

export function getIcons() {
  return [
    <FontAwesomeIcon icon={faAnchor} />,
    <FontAwesomeIcon icon={faBug} />,
    <FontAwesomeIcon icon={faCar} />,
    <FontAwesomeIcon icon={faFlask} />,
    <FontAwesomeIcon icon={faFutbol} />,
    <FontAwesomeIcon icon={faHandSpock} />,
    <FontAwesomeIcon icon={faLiraSign} />,
    <FontAwesomeIcon icon={faMoon} />,
    <FontAwesomeIcon icon={faSnowflake} />,
    <FontAwesomeIcon icon={faSun} />,
    <FontAwesomeIcon icon={faHouse} />,
    <FontAwesomeIcon icon={faFaceSmile} />,
    <FontAwesomeIcon icon={faStar} />,
    <FontAwesomeIcon icon={faGhost} />,
    <FontAwesomeIcon icon={faFire} />,
    <FontAwesomeIcon icon={faCompass} />,
    <FontAwesomeIcon icon={faPalette} />,
    <FontAwesomeIcon icon={faFeather} />,
  ];
}
