
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { lifestyleSettingItems } from './settings';

export const lifestyleCards: MainContentCard[] = [
    { 
        id: `lifestyle-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Lifestyle", settings: lifestyleSettingItems })
    },
];