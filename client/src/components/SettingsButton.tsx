import { FC } from 'react'
import { MdSettings } from "react-icons/md";
import CircleButton from './CircleButton.styled';
import { useDispatch, useSelector } from 'react-redux';
import { toggleOpen } from 'src/features/popMenu/popMenuSlice';
import { RootState } from 'src/app/store';

const SettingsButton : FC = () => {
    const isActive = useSelector((state:RootState) => state.popMenu);
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(toggleOpen());
    }

    return (
        <CircleButton onClick={handleClick} isActive={isActive}>
            <MdSettings />
        </CircleButton>
    )
}

export default SettingsButton