
import type { NavigationGroup, MainContentCard } from '../../types';

// Import cards from sub-folders
import { emailCards } from './email';
import { socialMediaCards } from './social_media';
import { communityCards } from './community';
import { templatesCards } from './templates';
import { managementCards } from './management';

export const communicationNav: NavigationGroup = {
    header: [
        { id: 'email', label: 'Email' },
        { id: 'social_media', label: 'Social-Media' },
        { id: 'community', label: 'Community' },
        { id: 'templates', label: 'Templates' },
        { id: 'management', label: 'Management' },
    ],
    subnav: {
        email: [
            { id: 'inbox', label: 'INBOX', icon: 'inbox-arrow-down-icon' },
            { id: 'starred', label: 'STARRED', icon: 'star-icon' },
            { id: 'spam', label: 'SPAM', icon: 'exclamation-triangle-icon' },
            { id: 'scheduler', label: 'SCHEDULER', icon: 'calendar-days-icon' },
            { id: 'sent', label: 'SENT', icon: 'paper-airplane-icon' },
        ],
        social_media: [
            { id: 'feed', label: 'FEED', icon: 'home-icon' },
            { id: 'messages', label: 'MESSAGES', icon: 'chat-bubble-left-right-icon' },
        ],
        community: [
            { id: 'general', label: 'GENERAL', icon: 'chat-bubble-left-right-icon' },
            { id: 'announcements', label: 'ANNOUNCEMENTS', icon: 'bell-icon' },
        ],
        templates: [
            { id: 'email-templates', label: 'EMAIL', icon: 'inbox-arrow-down-icon' },
            { id: 'post-templates', label: 'POSTS', icon: 'paper-airplane-icon' },
        ],
        management: [
            { id: 'email_management', label: 'Email', icon: 'inbox-arrow-down-icon' },
            { id: 'social_media_management', label: 'Social-Media', icon: 'paper-airplane-icon' },
            { id: 'community_management', label: 'Community', icon: 'chat-bubble-left-right-icon' },
            { id: 'templates_management', label: 'Templates', icon: 'photo-icon' },
        ],
    },
};

export const communicationCards: { [key: string]: MainContentCard[] } = {
    ...emailCards,
    ...socialMediaCards,
    ...communityCards,
    ...templatesCards,
    ...managementCards,
};
