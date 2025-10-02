
import type { MainContentCard } from '../../../types';

export const systemCards: { [key: string]: MainContentCard[] } = {
    'dashboard_system_': Array.from({ length: 6 }, (_, i) => ({
        id: `card-system-${i}`,
        title: `System Status ${i + 1}`,
        icon: 'cog-6-tooth-icon'
    })),
};
