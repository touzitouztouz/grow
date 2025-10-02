
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { sportsSettingItems } from './settings';

export const sportsCards: MainContentCard[] = [
    { 
        id: `sports-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Sports", settings: sportsSettingItems })
    },
];