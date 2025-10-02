
import React, { useState } from 'react';
import Icon from '../Icon';
import type { IconName } from '../../types';
import { cn } from '../lib/utils';

export interface SettingItem {
    id: string;
    label: string;
    icon: IconName;
}

interface OverlayAppSettingsProps {
    title: string;
    settings: SettingItem[];
}

const OverlayAppSettings = ({ title, settings }: OverlayAppSettingsProps): React.ReactElement => {
    const [activeSetting, setActiveSetting] = useState<string>(settings[0]?.id || '');
    
    const activeItemDetails = settings.find(item => item.id === activeSetting);

    return (
        <div className="bg-component rounded-custom shadow-custom h-full flex flex-col border border-border overflow-hidden animate-fade-in">
            {/* Horizontal Subnav */}
            <nav className="w-full border-b border-border p-4 shrink-0">
                <h2 className="text-lg font-semibold text-primary mb-4">{title} Settings</h2>
                <ul className="flex flex-row items-center gap-2 overflow-x-auto">
                    {settings.map((item) => (
                        <li key={item.id} className="shrink-0">
                            <button
                                onClick={() => setActiveSetting(item.id)}
                                className={cn(
                                    'flex items-center p-3 rounded-custom text-left text-sm transition-colors whitespace-nowrap',
                                    activeSetting === item.id 
                                        ? 'bg-accent-secondary/20 text-accent-secondary font-semibold'
                                        : 'text-secondary hover:bg-accent-secondary/10 hover:text-primary'
                                )}
                            >
                                <Icon name={item.icon} className="w-5 h-5 mr-2 shrink-0" />
                                <span>{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            
            {/* Content Area */}
            <div className="flex-1 p-6 overflow-y-auto">
                {activeItemDetails ? (
                     <div className="flex h-full items-center justify-center text-center text-secondary animate-fade-in">
                        <div>
                            <Icon name={activeItemDetails.icon} className="w-24 h-24 mx-auto text-border" />
                            <h2 className="mt-4 text-2xl font-bold text-primary">{activeItemDetails.label}</h2>
                            <p className="mt-2 max-w-md mx-auto">Detailed settings and configuration options for '{activeItemDetails.label}' will be displayed here.</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-center text-secondary">
                        <p>No settings available.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OverlayAppSettings;
