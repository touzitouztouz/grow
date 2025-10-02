
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { gamificationSettingItems } from './settings';

export const gamificationCards: MainContentCard[] = [
    { 
        id: `gamification-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Gamification", settings: gamificationSettingItems })
    },
];