import type { ElementType } from 'react';

export type IconName =
  | 'home-icon' | 'graduation-cap-icon' | 'calculator-icon' | 'briefcase-icon'
  | 'chat-bubble-left-right-icon' | 'bell-alert-icon' | 'squares-plus-icon'
  | 'cog-6-tooth-icon' | 'bell-icon' | 'chat-bubble-left-ellipsis-icon'
  | 'arrow-right-circle-icon' | 'plus-icon' | 'arrow-left-circle-icon'
  | 'inbox-arrow-down-icon' | 'star-icon' | 'exclamation-triangle-icon'
  | 'calendar-days-icon' | 'paper-airplane-icon' | 'photo-icon' | 'film-icon'
  | 'puzzle-piece-icon' | 'building-storefront-icon' | 'beach-icon'
  | 'heart-icon' | 'minus-icon' | 'x-mark-icon' | 'sun-icon' | 'moon-icon'
  | 'chevron-down-icon' | 'check-icon' | 'book-open-icon' | 'trophy-icon'
  | 'sparkles-icon' | 'wrench-screwdriver-icon';

export interface NavItem {
  id: string;
  label: string;
  icon?: IconName;
}

export interface User {
  name: string;
  role: string;
  avatarUrl: string;
}

// --- Right Sidebar ---
export const rightSidebarIds = ['dashboard', 'school', 'crm', 'tool_platform', 'communication', 'concierge_ai', 'overlay_setting', 'setting'] as const;
export type RightSidebarId = typeof rightSidebarIds[number];

export interface RightSidebarItem extends NavItem {
    id: RightSidebarId;
    icon: IconName;
}

// --- Overlay Apps ---
export const overlayAppIds = ['studio', 'media', 'gamification', 'leisure', 'market', 'lifestyle', 'hobbies', 'knowledge', 'sports', 'religion', 'services'] as const;
export type OverlayAppId = typeof overlayAppIds[number];

export interface OverlayAppItem {
  id: OverlayAppId;
  label: string;
  icon: IconName;
}

// --- Navigation Logic ---
export type SubNavMap = {
    [headerId: string]: NavItem[];
}

export type NavigationGroup = {
    header: NavItem[];
    subnav: SubNavMap;
}

export type NavigationLogic = {
    [key in RightSidebarId]: NavigationGroup;
}

// --- Main Content Cards ---
interface StandardCard {
    id: string;
    title: string;
    icon: IconName;
    component?: never;
}

interface ComponentCard {
    id:string;
    // Fix: Use imported ElementType to resolve 'React' namespace error.
    component: ElementType;
    title?: never;
    icon?: never;
}

export type MainContentCard = StandardCard | ComponentCard;


// --- Overlay App Navigation ---
export interface OverlayAppNav {
    subApps: NavItem[];
    content: {
        [subAppId: string]: NavItem[];
    };
}

// --- Detailed Settings Item Type ---
export type StudioSettingItem = {
    id: string;
    label: string;
    description: string;
    icon: IconName;
    category: string;
} & (
    | { type: 'boolean'; value: boolean; }
    | { type: 'string'; value: string; placeholder?: string; validation?: { pattern: string; message: string; }; }
    | { type: 'select'; value: string; options: string[]; }
);