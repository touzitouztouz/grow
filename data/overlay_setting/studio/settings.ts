import type { StudioSettingItem } from '../../../types';

export const studioSettingItems: StudioSettingItem[] = [
    { 
        id: 'project-name', 
        label: 'Project Name', 
        description: 'The default name for new projects created in the studio.',
        icon: 'briefcase-icon',
        category: 'General',
        type: 'string',
        value: 'My Awesome Project',
        placeholder: 'Project Name',
        validation: {
            pattern: '^.+$',
            message: 'Project Name cannot be empty.'
        }
    },
    { 
        id: 'auto-save', 
        label: 'Auto-save', 
        description: 'Automatically save your work every 5 minutes to prevent data loss.',
        icon: 'check-icon',
        category: 'General',
        type: 'boolean',
        value: false
    },
    { 
        id: 'dark-mode', 
        label: 'Editor Theme', 
        description: 'Toggle the dark mode for the studio editor interface.',
        icon: 'moon-icon',
        category: 'Appearance',
        type: 'boolean',
        value: true 
    },
    { 
        id: 'export-quality', 
        label: 'Default Export Quality', 
        description: 'Set the default resolution for video and image exports.',
        icon: 'photo-icon',
        category: 'Exports',
        type: 'select',
        value: '1080p',
        options: ['720p', '1080p', '4K']
    },
    { 
        id: 'watermark', 
        label: 'Add Watermark', 
        description: 'Automatically add a watermark to all exported content.',
        icon: 'sparkles-icon',
        category: 'Exports',
        type: 'boolean',
        value: false
    },
    { 
        id: 'studio-api-key', 
        label: 'Studio API Key', 
        description: 'Your personal API key for third-party integrations.',
        icon: 'cog-6-tooth-icon',
        category: 'Integrations',
        type: 'string',
        value: 'sflk-j329-982f-23js',
        placeholder: 'Enter API Key',
        validation: {
            pattern: '^[a-zA-Z0-9-]+$',
            message: 'API Key can only contain letters, numbers, and hyphens.'
        }
    },
    { 
        id: 'unsplash-api-key', 
        label: 'Unsplash API Key', 
        description: 'API key for the Unsplash integration to access their photo library.',
        icon: 'photo-icon',
        category: 'Integrations',
        type: 'string',
        value: '',
        placeholder: 'Enter Unsplash Key',
        validation: {
            pattern: '^[a-zA-Z0-9_-]{40,}$|^$',
            message: 'A valid Unsplash key is typically at least 40 characters long.'
        }
    },
    { 
        id: 'pexels-api-key', 
        label: 'Pexels API Key', 
        description: 'API key for the Pexels integration to access their photo and video library.',
        icon: 'film-icon',
        category: 'Integrations',
        type: 'string',
        value: '',
        placeholder: 'Enter Pexels Key',
        validation: {
            pattern: '^[a-zA-Z0-9]{50,}$|^$',
            message: 'A valid Pexels key is typically at least 50 characters long.'
        }
    },
    {
        id: 'template-image-source',
        label: 'Default Image Source',
        description: 'Choose the default service for fetching images for templates.',
        icon: 'photo-icon',
        category: 'Templates',
        type: 'select',
        value: 'Unsplash',
        options: ['Unsplash', 'Pexels', 'Local']
    }
];