
import type { MainContentCard } from '../../../types';

export const analyticsCards: { [key: string]: MainContentCard[] } = {
    'dashboard_analytics_': Array.from({ length: 8 }, (_, i) => ({
        id: `card-analytics-${i}`,
        title: `Analytics Data ${i + 1}`,
        icon: 'calculator-icon'
    })),
};
