
import type { MainContentCard } from '../../../types';

export const managementCards: { [key: string]: MainContentCard[] } = {
    'communication_management_email_management': [
        { id: `email-management-1`, title: `Email Settings`, icon: 'cog-6-tooth-icon' },
        { id: `email-management-2`, title: 'Signature Editor', icon: 'wrench-screwdriver-icon' },
        { id: `email-management-3`, title: 'Auto Responders', icon: 'paper-airplane-icon' },
    ],
    'communication_management_social_media_management': [
        { id: `sm-management-1`, title: `Account Linking`, icon: 'squares-plus-icon' },
        { id: `sm-management-2`, title: 'Posting Defaults', icon: 'cog-6-tooth-icon' },
        { id: `sm-management-3`, title: 'Analytics Setup', icon: 'calculator-icon' },
    ],
    'communication_management_community_management': [
        { id: `comm-management-1`, title: `Moderation Rules`, icon: 'exclamation-triangle-icon' },
        { id: `comm-management-2`, title: 'User Roles', icon: 'wrench-screwdriver-icon' },
        { id: `comm-management-3`, title: 'Welcome Messages', icon: 'chat-bubble-left-right-icon' },
    ],
    'communication_management_templates_management': [
        { id: `temp-management-1`, title: `Manage Templates`, icon: 'briefcase-icon' },
        { id: `temp-management-2`, title: 'Create New Template', icon: 'plus-icon' },
        { id: `temp-management-3`, title: 'Template Analytics', icon: 'calculator-icon' },
    ],
};
