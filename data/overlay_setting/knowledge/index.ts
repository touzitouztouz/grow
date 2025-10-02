
import React from 'react';
import type { MainContentCard } from '../../../types';
import OverlayAppSettings from '../../../components/custom/OverlayAppSettings';
import { knowledgeSettingItems } from './settings';

export const knowledgeCards: MainContentCard[] = [
    { 
        id: `knowledge-settings-view`,
        // Fix: Replaced JSX with React.createElement to be valid in a .ts file.
        component: () => React.createElement(OverlayAppSettings, { title: "Knowledge", settings: knowledgeSettingItems })
    },
];