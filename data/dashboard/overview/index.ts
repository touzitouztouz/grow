
import type { MainContentCard } from '../../../types';

export const overviewCards: { [key: string]: MainContentCard[] } = {
    'dashboard_overview_': Array.from({ length: 18 }, (_, i) => ({
        id: `card-dash-${i}`,
        title: `Dashboard Metric ${i + 1}`,
        icon: 'home-icon'
    })),
};
