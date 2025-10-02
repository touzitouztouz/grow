
import type { MainContentCard } from '../../../types';

export const emailCards: { [key: string]: MainContentCard[] } = {
    'communication_email_inbox': Array.from({ length: 24 }, (_, i) => ({
        id: `card-email-${i}`,
        title: `Email Item ${i + 1}`,
        icon: 'inbox-arrow-down-icon'
    })),
    // Other email subnavs like 'starred', 'spam', etc., can be added here
};
