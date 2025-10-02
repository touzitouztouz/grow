
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { leisureSettingItems } from './settings';

export const leisureCards: MainContentCard[] = [
    { 
        id: `leisure-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Leisure", settings: leisureSettingItems })
    },
];