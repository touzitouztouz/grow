
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { servicesSettingItems } from './settings';

export const servicesCards: MainContentCard[] = [
    { 
        id: `services-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Services", settings: servicesSettingItems })
    },
];