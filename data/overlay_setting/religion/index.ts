
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { religionSettingItems } from './settings';

export const religionCards: MainContentCard[] = [
    { 
        id: `religion-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Religion", settings: religionSettingItems })
    },
];