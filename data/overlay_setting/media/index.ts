
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { mediaSettingItems } from './settings';

export const mediaCards: MainContentCard[] = [
    { 
        id: `media-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Media", settings: mediaSettingItems })
    },
];