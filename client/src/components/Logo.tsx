import { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import { Themes } from 'src/styles/theme';
import { NavLink } from 'react-router-dom';
import { NAV_ROUTES } from 'src/data/navigation.data';

export type LogoType = 'filled' | 'compact'

const Logo: FC = () => {
    const theme = useTheme();
    const isDarkTheme = theme?.name === Themes.dark;

    return (
        <StyledLogo to={NAV_ROUTES.home}>
            <svg width="98" height="22" viewBox="0 0 98 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_415_46)">
                    <path d="M15.2669 13.3411L17.1377 9.67276L18.1618 7.89709L12.2302 4.46907L8.79054 10.4331L12.5424 12.6016L15.2669 13.3411ZM11.5373 13.2416L8.26177 11.3494L2.35255 21.5849C2.20834 21.8379 1.88545 21.9248 1.63247 21.7801L0.263208 20.9891C0.141819 20.9187 0.0539333 20.8032 0.0180022 20.6677C-0.0184145 20.5317 0.00100772 20.3875 0.0709277 20.2652L10.0947 2.88955C10.0695 2.81866 10.0433 2.74486 10.0234 2.6696C9.87867 2.12335 9.95441 1.55282 10.2375 1.06192C10.5177 0.572483 10.9755 0.221912 11.5194 0.0747886C12.0661 -0.0733059 12.6332 1.30526e-05 13.1212 0.281635C13.6092 0.563743 13.9573 1.01919 14.1025 1.56544C14.2472 2.11169 14.171 2.68222 13.8884 3.17312C13.7286 3.45231 13.5155 3.67518 13.2698 3.84804L19.1513 7.2445C19.4043 7.38968 19.4898 7.71258 19.3426 7.96555L18.3113 9.7524L21.5869 11.6446C21.7486 11.7364 21.8457 11.9073 21.85 12.0937C21.8515 12.2812 21.7568 12.4555 21.5975 12.5536L18.003 14.7716L17.8811 18.9969C17.8763 19.1824 17.7709 19.3533 17.6097 19.4455C17.4451 19.5383 17.2465 19.5373 17.0872 19.4446L10.6993 15.7553C10.574 15.6825 10.488 15.5635 10.4536 15.4334C10.4186 15.3008 10.4346 15.1571 10.507 15.0309L11.5373 13.2416ZM11.5364 3.03619C12.0365 3.32801 12.6847 3.15273 12.9765 2.64678C13.1197 2.40109 13.1562 2.11606 13.0843 1.84464C13.012 1.57273 12.8362 1.34549 12.5939 1.20419C12.3516 1.06241 12.0666 1.02648 11.7947 1.10028C11.5228 1.1736 11.2965 1.34792 11.1537 1.59361C10.8707 2.0845 11.0484 2.75457 11.5364 3.03619ZM1.70968 20.5978L11.2309 4.08305L10.7779 3.82376L1.25568 20.3356L1.70968 20.5978Z" fill="currentColor" />
                    <path d="M12.035 3.67468L18.9119 7.68489L14.9415 14.6308L8.06412 10.6206L12.035 3.67468ZM12.0195 7.35519L12.5744 8.72883L11.1882 9.28916C10.9396 9.38967 10.8196 9.67227 10.9202 9.92136L11.1018 10.3715C11.2023 10.6201 11.4849 10.7405 11.7339 10.6395L13.1202 10.0796L13.666 11.43C13.7665 11.6786 14.0496 11.799 14.2982 11.6985L14.7483 11.5164C14.9969 11.4164 15.1168 11.1328 15.0163 10.8847L14.471 9.53388L15.8092 8.99297C16.0578 8.89295 16.1777 8.60938 16.0777 8.36126L15.8956 7.91067C15.7951 7.66207 15.5121 7.54213 15.2634 7.64264L13.9253 8.18355L13.3698 6.80943C13.2698 6.56083 12.9862 6.44041 12.7381 6.54092L12.2875 6.723C12.0394 6.82351 11.9189 7.10659 12.0195 7.35519Z" fill="currentColor" />
                </g>
                <path d="M29.894 16.084C29.1473 16.084 28.4567 15.9627 27.822 15.72C27.1967 15.468 26.6507 15.118 26.184 14.67C25.7267 14.222 25.3673 13.6947 25.106 13.088C24.854 12.4813 24.728 11.8187 24.728 11.1C24.728 10.3813 24.854 9.71867 25.106 9.112C25.3673 8.50533 25.7313 7.978 26.198 7.53C26.6647 7.082 27.2107 6.73667 27.836 6.494C28.4707 6.242 29.1613 6.116 29.908 6.116C30.6547 6.116 31.336 6.23267 31.952 6.466C32.5773 6.69933 33.1093 7.054 33.548 7.53L32.904 8.188C32.4933 7.77733 32.0407 7.48333 31.546 7.306C31.0513 7.12867 30.5193 7.04 29.95 7.04C29.3433 7.04 28.7833 7.14267 28.27 7.348C27.766 7.544 27.3227 7.82867 26.94 8.202C26.5667 8.566 26.2727 8.99533 26.058 9.49C25.8527 9.97533 25.75 10.512 25.75 11.1C25.75 11.6787 25.8527 12.2153 26.058 12.71C26.2727 13.2047 26.5667 13.6387 26.94 14.012C27.3227 14.376 27.766 14.6607 28.27 14.866C28.7833 15.062 29.3387 15.16 29.936 15.16C30.496 15.16 31.0233 15.076 31.518 14.908C32.022 14.74 32.484 14.4553 32.904 14.054L33.492 14.838C33.0253 15.2487 32.4793 15.5613 31.854 15.776C31.2287 15.9813 30.5753 16.084 29.894 16.084ZM32.498 14.712V11.1H33.492V14.838L32.498 14.712Z" fill="currentColor" />
                <path d="M39.3361 16.07C38.5708 16.07 37.8988 15.9113 37.3201 15.594C36.7415 15.2673 36.2888 14.824 35.9621 14.264C35.6355 13.6947 35.4721 13.046 35.4721 12.318C35.4721 11.59 35.6261 10.946 35.9341 10.386C36.2515 9.826 36.6808 9.38733 37.2221 9.07C37.7728 8.74333 38.3888 8.58 39.0701 8.58C39.7608 8.58 40.3721 8.73867 40.9041 9.056C41.4455 9.364 41.8701 9.80267 42.1781 10.372C42.4861 10.932 42.6401 11.5807 42.6401 12.318C42.6401 12.3647 42.6355 12.416 42.6261 12.472C42.6261 12.5187 42.6261 12.57 42.6261 12.626H36.2281V11.884H42.0941L41.7021 12.178C41.7021 11.646 41.5855 11.1747 41.3521 10.764C41.1281 10.344 40.8201 10.0173 40.4281 9.784C40.0361 9.55067 39.5835 9.434 39.0701 9.434C38.5661 9.434 38.1135 9.55067 37.7121 9.784C37.3108 10.0173 36.9981 10.344 36.7741 10.764C36.5501 11.184 36.4381 11.6647 36.4381 12.206V12.36C36.4381 12.92 36.5595 13.4147 36.8021 13.844C37.0541 14.264 37.3995 14.5953 37.8381 14.838C38.2861 15.0713 38.7948 15.188 39.3641 15.188C39.8121 15.188 40.2275 15.1087 40.6101 14.95C41.0021 14.7913 41.3381 14.5487 41.6181 14.222L42.1781 14.866C41.8515 15.258 41.4408 15.5567 40.9461 15.762C40.4608 15.9673 39.9241 16.07 39.3361 16.07Z" fill="currentColor" />
                <path d="M47.6593 16.07C46.95 16.07 46.3107 15.9113 45.7413 15.594C45.1813 15.2673 44.738 14.824 44.4113 14.264C44.0847 13.6947 43.9213 13.046 43.9213 12.318C43.9213 11.5807 44.0847 10.932 44.4113 10.372C44.738 9.812 45.1813 9.37333 45.7413 9.056C46.3013 8.73867 46.9407 8.58 47.6593 8.58C48.3873 8.58 49.0313 8.73867 49.5913 9.056C50.1607 9.37333 50.604 9.812 50.9213 10.372C51.248 10.932 51.4113 11.5807 51.4113 12.318C51.4113 13.046 51.248 13.6947 50.9213 14.264C50.604 14.824 50.1607 15.2673 49.5913 15.594C49.022 15.9113 48.378 16.07 47.6593 16.07ZM47.6593 15.188C48.1913 15.188 48.6627 15.0713 49.0733 14.838C49.484 14.5953 49.806 14.2593 50.0393 13.83C50.282 13.3913 50.4033 12.8873 50.4033 12.318C50.4033 11.7393 50.282 11.2353 50.0393 10.806C49.806 10.3767 49.484 10.0453 49.0733 9.812C48.6627 9.56933 48.196 9.448 47.6733 9.448C47.1507 9.448 46.684 9.56933 46.2733 9.812C45.8627 10.0453 45.536 10.3767 45.2933 10.806C45.0507 11.2353 44.9293 11.7393 44.9293 12.318C44.9293 12.8873 45.0507 13.3913 45.2933 13.83C45.536 14.2593 45.8627 14.5953 46.2733 14.838C46.684 15.0713 47.146 15.188 47.6593 15.188Z" fill="currentColor" />
                <path d="M53.6507 16V6.2H57.3187C58.1494 6.2 58.8634 6.33533 59.4607 6.606C60.058 6.86733 60.5154 7.25 60.8327 7.754C61.1594 8.24867 61.3227 8.85067 61.3227 9.56C61.3227 10.2507 61.1594 10.848 60.8327 11.352C60.5154 11.8467 60.058 12.2293 59.4607 12.5C58.8634 12.7707 58.1494 12.906 57.3187 12.906H54.2247L54.6867 12.416V16H53.6507ZM54.6867 12.5L54.2247 11.996H57.2907C58.2707 11.996 59.0127 11.786 59.5167 11.366C60.03 10.9367 60.2867 10.3347 60.2867 9.56C60.2867 8.776 60.03 8.16933 59.5167 7.74C59.0127 7.31067 58.2707 7.096 57.2907 7.096H54.2247L54.6867 6.606V12.5Z" fill="currentColor" />
                <path d="M66.5275 16.07C65.9022 16.07 65.3562 15.9533 64.8895 15.72C64.4228 15.4867 64.0588 15.1367 63.7975 14.67C63.5455 14.2033 63.4195 13.62 63.4195 12.92V8.65H64.4135V12.808C64.4135 13.592 64.6048 14.1847 64.9875 14.586C65.3795 14.978 65.9255 15.174 66.6255 15.174C67.1388 15.174 67.5822 15.0713 67.9555 14.866C68.3382 14.6513 68.6275 14.3433 68.8235 13.942C69.0288 13.5407 69.1315 13.06 69.1315 12.5V8.65H70.1255V16H69.1735V13.984L69.3275 14.348C69.0942 14.8893 68.7302 15.314 68.2355 15.622C67.7502 15.9207 67.1808 16.07 66.5275 16.07Z" fill="currentColor" />
                <path d="M72.0978 16V15.342L76.9978 9.14L77.2078 9.476H72.1818V8.65H77.9918V9.294L73.1058 15.51L72.8538 15.174H78.0898V16H72.0978Z" fill="currentColor" />
                <path d="M79.2482 16V15.342L84.1482 9.14L84.3582 9.476H79.3322V8.65H85.1422V9.294L80.2562 15.51L80.0042 15.174H85.2402V16H79.2482Z" fill="currentColor" />
                <path d="M87.1965 16V5.612H88.1905V16H87.1965Z" fill="currentColor" />
                <path d="M94.0783 16.07C93.313 16.07 92.641 15.9113 92.0623 15.594C91.4836 15.2673 91.031 14.824 90.7043 14.264C90.3776 13.6947 90.2143 13.046 90.2143 12.318C90.2143 11.59 90.3683 10.946 90.6763 10.386C90.9936 9.826 91.423 9.38733 91.9643 9.07C92.515 8.74333 93.131 8.58 93.8123 8.58C94.503 8.58 95.1143 8.73867 95.6463 9.056C96.1876 9.364 96.6123 9.80267 96.9203 10.372C97.2283 10.932 97.3823 11.5807 97.3823 12.318C97.3823 12.3647 97.3776 12.416 97.3683 12.472C97.3683 12.5187 97.3683 12.57 97.3683 12.626H90.9703V11.884H96.8363L96.4443 12.178C96.4443 11.646 96.3276 11.1747 96.0943 10.764C95.8703 10.344 95.5623 10.0173 95.1703 9.784C94.7783 9.55067 94.3256 9.434 93.8123 9.434C93.3083 9.434 92.8556 9.55067 92.4543 9.784C92.053 10.0173 91.7403 10.344 91.5163 10.764C91.2923 11.184 91.1803 11.6647 91.1803 12.206V12.36C91.1803 12.92 91.3016 13.4147 91.5443 13.844C91.7963 14.264 92.1416 14.5953 92.5803 14.838C93.0283 15.0713 93.537 15.188 94.1063 15.188C94.5543 15.188 94.9696 15.1087 95.3523 14.95C95.7443 14.7913 96.0803 14.5487 96.3603 14.222L96.9203 14.866C96.5936 15.258 96.183 15.5567 95.6883 15.762C95.203 15.9673 94.6663 16.07 94.0783 16.07Z" fill="currentColor" />
                <defs>
                    <clipPath id="clip0_415_46">
                        <rect width="21.85" height="21.85" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </StyledLogo>
    )
}

export const StyledLogo = styled(NavLink)`
    svg {
        color: var(--color-secondary);
        width: 100%;
        height: 100%;
    }

    &:hover {
        svg {
            color: var(--color-black);
        }
    }
`;


export default Logo