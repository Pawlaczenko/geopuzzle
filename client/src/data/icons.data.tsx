import { IconType } from "react-icons";
import {
    MdAddCircleOutline,
    MdOutlineHome,
    MdTravelExplore,
    MdLightbulbOutline,
    MdLogin
} from "react-icons/md";

export type IconName = 'home' | 'explore' | 'create' | 'puzzle' | 'login';

export const ICONS = new Map<IconName,IconType>([
    ['create',MdAddCircleOutline],
    ['home',MdOutlineHome],
    ['explore',MdTravelExplore],
    ['puzzle',MdLightbulbOutline],
    ['login',MdLogin],
]);