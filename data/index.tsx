
import React from 'react';
import type { RightSidebarItem, NavigationLogic, MainContentCard, IconName } from '../types';

import { communicationNav, communicationCards } from './communication/index';
import { dashboardNav, dashboardCards } from './dashboard/index';
import { schoolNav, schoolCards } from './school/index';
import { crmNav } from './crm/index';
import { toolPlatformNav } from './tool_platform/index';
import { conciergeAiNav } from './concierge_ai/index';
import { overlaySettingNav, overlaySettingCards } from './overlay_setting/index';
import { settingNav } from './setting/index';

// Re-export shared data
export { OVERLAY_APPS } from './shared/apps';
export { OVERLAY_APP_NAVIGATION } from './shared/overlay_apps_nav';

export const ICONS: { [key in IconName]: React.ReactNode } = {
    'home-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />,
    'graduation-cap-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.258-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0l-1.07-1.07a50.57 50.57 0 013.727-3.727L12 2.25l8.354 8.354a50.57 50.57 0 013.727 3.727l-1.07 1.07" />,
    'calculator-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm0 3h.008v.008H8.25v-.008zm3-6h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm0 3h.008v.008H11.25v-.008zm3-6h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zm0 3h.008v.008H14.25v-.008zM6 18.75h12A2.25 2.25 0 0020.25 16.5V7.5A2.25 2.25 0 0018 5.25H6A2.25 2.25 0 003.75 7.5v9A2.25 2.25 0 006 18.75z" />,
    'briefcase-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.25v-2.25c0-1.244-1.006-2.25-2.25-2.25H6c-1.244 0-2.25 1.006-2.25 2.25v2.25m16.5 0v2.25c0 1.244-1.006-2.25-2.25-2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25m16.5 0h-16.5" />,
    'chat-bubble-left-right-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72-3.72a1.054 1.054 0 00-1.49 0l-3.72 3.72a2.1 2.1 0 01-2.193 1.98 2.1 2.1 0 01-2.193-1.98v-4.286c0-.97.616-1.813 1.5-2.097m14.25-3.866l-3.72-3.72a1.054 1.054 0 00-1.49 0l-3.72 3.72a2.1 2.1 0 01-2.193 1.98 2.1 2.1 0 01-2.193-1.98V5.25c0-1.136.847-2.1 1.98-2.193l3.72 3.72a1.054 1.054 0 001.49 0l3.72-3.72a2.1 2.1 0 012.193-1.98 2.1 2.1 0 012.193 1.98v4.286c0 .97-.616 1.813-1.5 2.097z" />,
    'bell-alert-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.31 6.032 23.849 23.849 0 005.454 1.31M15 17.5c-.87 0-1.732-.405-2.25-1.082A4.5 4.5 0 009 17.5" />,
    'squares-plus-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15M3.75 3.75h16.5v16.5H3.75V3.75z" />,
    'cog-6-tooth-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-1.226M15 19.5v-2.25m0-10.5v-2.25c0-.966-.784-1.75-1.75-1.75H7.25c-.966 0-1.75.784-1.75 1.75v2.25m11.25 6.75v2.25c0 .966-.784 1.75-1.75 1.75H7.25c-.966 0-1.75-.784-1.75-1.75v-2.25m11.25-6.75H5.5a1.75 1.75 0 00-1.75 1.75v.058c.42-.152.87-.246 1.32-.294M19.5 7.25v.058c-.42-.152-.87-.246-1.32-.294M15 13.5a3 3 0 11-6 0 3 3 0 016 0z" />,
    'bell-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.31 6.032 23.849 23.849 0 005.454 1.31M15 17.5c-.87 0-1.732-.405-2.25-1.082A4.5 4.5 0 009 17.5" />,
    'chat-bubble-left-ellipsis-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.455.09-.934.018-1.402A8.958 8.958 0 012.25 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />,
    'arrow-right-circle-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    'plus-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />,
    'arrow-left-circle-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    'inbox-arrow-down-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.12-1.588H6.88a2.25 2.25 0 00-2.12 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />,
    'star-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.479.038.673.684.314 1.003l-4.018 3.882a.563.563 0 00-.162.524l1.08 5.432c.09.441-.393.785-.782.57l-4.915-2.919a.563.563 0 00-.528 0l-4.915 2.919c-.39.215-.872-.13-.782-.57l1.08-5.432a.563.563 0 00-.162.524l-4.018-3.882c-.359-.319-.165-.965.314-1.003l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />,
    'exclamation-triangle-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />,
    'calendar-days-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" />,
    'paper-airplane-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />,
    'photo-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />,
    'film-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />,
    'puzzle-piece-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zM16.5 9.75a.75.75 0 00-.75.75v.01a.75.75 0 00.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zM10.5 9.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zM12.75 9.75a.75.75 0 00-.75.75v.01a.75.75 0 00.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zM9 12a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zM11.25 12a.75.75 0 00-.75.75v.01a.75.75 0 00.75.75h.01a.75.75 0 00.75-.75v-.01a.75.75 0 00-.75-.75h-.01zM9 14.25a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75v-.01zm-3.11-4.19a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 000 1.06l1.06 1.06a.75.75 0 001.06 0l1.06-1.06a.75.75 0 000-1.06l-1.06-1.06zM17.36 10.06a.75.75 0 00-1.06 0l-1.06 1.06a.75.75 0 000 1.06l1.06 1.06a.75.75 0 001.06 0l1.06-1.06a.75.75 0 000-1.06l-1.06-1.06z" />,
    'building-storefront-icon': <path d="M12 21V11.25M6 21V11.25M18 21V11.25M12 2.25C6.477 2.25 2.25 6.477 2.25 12c0 2.22.868 4.257 2.28 5.836M21.75 12c0-5.523-4.477-9.75-9.75-9.75M12 21a8.962 8.962 0 01-5.71-2.164" />,
    'beach-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.75h16.5M3.75 12h16.5m-16.5 2.25h16.5M17.25 6a2.25 2.25 0 00-2.25-2.25H9a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25h6a2.25 2.25 0 002.25-2.25v-1.5z" />,
    'heart-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />,
    'minus-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />,
    'x-mark-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
    'sun-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364L5.636 5.636" />,
    'moon-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.733 0 5.257-1.12 7.002-2.998z" />,
    'chevron-down-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />,
    'check-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />,
    'book-open-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.25a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-3 0V7.75a1.5 1.5 0 011.5-1.5zM12 6.25h-3.375a3.375 3.375 0 00-3.375 3.375V19.5a.75.75 0 00.75.75h.038a2.25 2.25 0 012.112-2.112v-5.25a.75.75 0 01.75-.75h3.375m0 0h3.375a3.375 3.375 0 013.375 3.375V19.5a.75.75 0 01-.75.75h-.038a2.25 2.25 0 00-2.112-2.112v-5.25a.75.75 0 00-.75-.75H12z" />,
    'trophy-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 119 0zM12 15.75v3.75m-3.75-3.75H12m3.75 0H12m-3.75 0V9.75m3.75 0V9.75m0 6V9.75m-3.75 0h3.75" />,
    'sparkles-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18.259 15.285L18 14.25l-.259 1.035a3.375 3.375 0 00-2.455 2.456L14.25 18l1.036.259a3.375 3.375 0 002.455 2.456L18 21.75l.259-1.035a3.375 3.375 0 002.456-2.456L21.75 18l-1.035.259a3.375 3.375 0 00-2.456-2.456z" />,
    'wrench-screwdriver-icon': <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 12.75L12 12m0 0l.75-.75M12 12l-.75-.75m.75.75V15m0-3l.75.75M12 12l-.75.75m2.09-4.508a3.375 3.375 0 014.772 0 3.375 3.375 0 010 4.772l-1.06 1.06-4.772-4.772 1.06-1.06zm-4.772 0a3.375 3.375 0 00-4.772 0 3.375 3.375 0 000 4.772l1.06 1.06 4.772-4.772-1.06-1.06z" />,
};

export const RIGHT_SIDEBAR_ITEMS: RightSidebarItem[] = [
    { id: 'dashboard', label: 'DASHBOARD', icon: 'home-icon' },
    { id: 'school', label: 'SCHOOL', icon: 'graduation-cap-icon' },
    { id: 'crm', label: 'CRM', icon: 'calculator-icon' },
    { id: 'tool_platform', label: 'TOOL-PLATFORM', icon: 'briefcase-icon' },
    { id: 'communication', label: 'COMMUNICATION', icon: 'chat-bubble-left-right-icon' },
    { id: 'concierge_ai', label: 'CONCIERGE AI', icon: 'bell-alert-icon' },
    { id: 'overlay_setting', label: 'OVERLAY-SETTING', icon: 'squares-plus-icon' },
    { id: 'setting', label: 'SETTING', icon: 'cog-6-tooth-icon' },
];

export const NAVIGATION_LOGIC: NavigationLogic = {
    dashboard: dashboardNav,
    school: schoolNav,
    crm: crmNav,
    tool_platform: toolPlatformNav,
    communication: communicationNav,
    concierge_ai: conciergeAiNav,
    overlay_setting: overlaySettingNav,
    setting: settingNav,
};

export const MAIN_CONTENT_CARDS: { [key: string]: MainContentCard[] } = {
    ...dashboardCards,
    ...schoolCards,
    ...communicationCards,
    ...overlaySettingCards,
};
