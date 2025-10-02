
import type { MainContentCard } from '../../../types';

export const marketCards: { [key: string]: MainContentCard[] } = {
    'dashboard_market_': Array.from({ length: 10 }, (_, i) => ({
        id: `card-market-${i}`,
        title: `Market Info ${i + 1}`,
        icon: 'building-storefront-icon'
    })),
};
