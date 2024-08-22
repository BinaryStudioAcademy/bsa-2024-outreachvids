import { type IconProps } from '@chakra-ui/react';
import { type ReactElement } from 'react';

import { Icon } from '../../components.js';

const HomeIcon = (properties: IconProps): ReactElement => {
    return (
        <Icon viewBox="0 0 16 18" {...properties}>
            <path
                d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16ZM0 18V6L8 0L16 6V18H9V12H7V18H0Z"
                fill="currentColor"
            />
        </Icon>
    );
};

const LogOutIcon = (properties: IconProps): ReactElement => {
    return (
        <Icon viewBox="0 0 18 19" {...properties}>
            <path
                d="M2 18.5C1.45 18.5 0.979167 18.3042 0.5875 17.9125C0.195833 17.5208 0 17.05 0 16.5V2.5C0 1.95 0.195833 1.47917 0.5875 1.0875C0.979167 0.695833 1.45 0.5 2 0.5H8C8.28333 0.5 8.52083 0.595833 8.7125 0.7875C8.90417 0.979167 9 1.21667 9 1.5C9 1.78333 8.90417 2.02083 8.7125 2.2125C8.52083 2.40417 8.28333 2.5 8 2.5H2V16.5H8C8.28333 16.5 8.52083 16.5958 8.7125 16.7875C8.90417 16.9792 9 17.2167 9 17.5C9 17.7833 8.90417 18.0208 8.7125 18.2125C8.52083 18.4042 8.28333 18.5 8 18.5H2ZM14.175 10.5H7C6.71667 10.5 6.47917 10.4042 6.2875 10.2125C6.09583 10.0208 6 9.78333 6 9.5C6 9.21667 6.09583 8.97917 6.2875 8.7875C6.47917 8.59583 6.71667 8.5 7 8.5H14.175L12.3 6.625C12.1167 6.44167 12.025 6.21667 12.025 5.95C12.025 5.68333 12.1167 5.45 12.3 5.25C12.4833 5.05 12.7167 4.94583 13 4.9375C13.2833 4.92917 13.525 5.025 13.725 5.225L17.3 8.8C17.5 9 17.6 9.23333 17.6 9.5C17.6 9.76667 17.5 10 17.3 10.2L13.725 13.775C13.525 13.975 13.2875 14.0708 13.0125 14.0625C12.7375 14.0542 12.5 13.95 12.3 13.75C12.1167 13.55 12.0292 13.3125 12.0375 13.0375C12.0458 12.7625 12.1417 12.5333 12.325 12.35L14.175 10.5Z"
                fill="currentColor"
            />
        </Icon>
    );
};

export { HomeIcon, LogOutIcon };
