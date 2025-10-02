
import type { NavigationGroup, MainContentCard } from '../../types';

// Import cards from sub-folders
import { overviewCards } from './overview';
import { analyticsCards } from './analytics';
import { marketCards } from './market';
import { systemCards } from './system';

export const dashboardNav: NavigationGroup = {
    header: [
        { id: 'overview', label: 'Overview' },
        { id: 'analytics', label: 'Analytics' },
        { id: 'market', label: 'Market' },
        { id: 'system', label: 'System' }
    ],
    subnav: {
        overview: [],
        analytics: [],
        market: [],
        system: []
    },
};

export const dashboardCards: { [key: string]: MainContentCard[] } = {
    ...overviewCards,
    ...analyticsCards,
    ...marketCards,
    ...systemCards,
};
