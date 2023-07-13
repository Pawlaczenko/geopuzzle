import { IconType } from "react-icons";
import {
    MdAddCircleOutline,
    MdOutlineHome,
    MdTravelExplore,
    MdLightbulbOutline,
    MdLogin,
    MdPlayCircle
} from "react-icons/md";

export type IconName = 'home' | 'explore' | 'create' | 'puzzle' | 'login' | 'start';

export const ICONS = new Map<IconName,IconType>([
    ['create',MdAddCircleOutline],
    ['home',MdOutlineHome],
    ['explore',MdTravelExplore],
    ['puzzle',MdLightbulbOutline],
    ['login',MdLogin],
    ['start',MdPlayCircle]
]);