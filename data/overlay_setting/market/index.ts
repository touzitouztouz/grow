
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { marketSettingItems } from './settings';

export const marketCards: MainContentCard[] = [
    { 
        id: `market-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Market", settings: marketSettingItems })
    },
];