
import type { MainContentCard } from '../../../types';

export const socialMediaCards: { [key: string]: MainContentCard[] } = {
    'communication_social_media_feed': Array.from({ length: 15 }, (_, i) => ({
        id: `card-feed-${i}`,
        title: `Social Post ${i + 1}`,
        icon: 'paper-airplane-icon'
    })),
    // Other social media subnavs can be added here
};
