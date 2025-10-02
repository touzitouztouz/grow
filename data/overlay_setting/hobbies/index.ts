
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { hobbiesSettingItems } from './settings';

export const hobbiesCards: MainContentCard[] = [
    { 
        id: `hobbies-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Hobbies", settings: hobbiesSettingItems })
    },
];