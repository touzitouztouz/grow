
import type { NavigationGroup, MainContentCard } from '../../types';
import { OVERLAY_APPS } from '../shared/apps';

// Import cards from sub-folders
import { gamificationCards } from './gamification';
import { hobbiesCards } from './hobbies';
import { knowledgeCards } from './knowledge';
import { leisureCards } from './leisure';
import { lifestyleCards } from './lifestyle';
import { marketCards } from './market';
import { mediaCards } from './media';
import { religionCards } from './religion';
import { servicesCards } from './services';
import { sportsCards } from './sports';
import { studioCards } from './studio';

export const overlaySettingNav: NavigationGroup = {
    header: [{ id: 'management', label: 'Management' }],
    subnav: {
        management: OVERLAY_APPS.map(app => ({
            id: app.id,
            label: app.label.toUpperCase(),
            icon: app.icon,
        })),
    },
};

export const overlaySettingCards: { [key: string]: MainContentCard[] } = {
    'overlay_setting_management_studio': studioCards,
    'overlay_setting_management_media': mediaCards,
    'overlay_setting_management_gamification': gamificationCards,
    'overlay_setting_management_leisure': leisureCards,
    'overlay_setting_management_market': marketCards,
    'overlay_setting_management_lifestyle': lifestyleCards,
    'overlay_setting_management_hobbies': hobbiesCards,
    'overlay_setting_management_knowledge': knowledgeCards,
    'overlay_setting_management_sports': sportsCards,
    'overlay_setting_management_religion': religionCards,
    'overlay_setting_management_services': servicesCards,
};
