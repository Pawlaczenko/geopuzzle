import { IconType } from "react-icons";
import {
    MdAddCircleOutline,
    MdOutlineHome,
    MdTravelExplore,
    MdLightbulbOutline,
    MdLogin,
    MdPlayCircle,
    MdCheckCircle,
    MdNavigateBefore,
    MdNavigateNext,
} from "react-icons/md";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RiEyeLine, RiEyeCloseLine  } from "react-icons/ri";


export type IconName = 'home' | 'explore' | 'create' | 'puzzle' | 'login' | 'start' | 'check' | 'google' | 'arrow-down';

export const ICONS = new Map<String,IconType>([
    ['create',MdAddCircleOutline],
    ['home',MdOutlineHome],
    ['explore',MdTravelExplore],
    ['puzzle',MdLightbulbOutline],
    ['login',MdLogin],
    ['start',MdPlayCircle],
    ['check',MdCheckCircle ],
    ['next',MdNavigateNext],
    ['prev',MdNavigateBefore],
    ['google',FcGoogle],
    ['eye-open', RiEyeLine],
    ['eye-closed', RiEyeCloseLine],
    ['arrow-down', FaArrowAltCircleDown]
]);