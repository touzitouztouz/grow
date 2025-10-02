

import React, { useEffect, useRef } from 'react';
import { OVERLAY_APPS, OVERLAY_APP_NAVIGATION } from '../data';
import { useUIState } from '../contexts/UIStateContext';
import type { OverlayAppId } from '../types';

import Studio from '../applications-overlay/Studio';
import Media from '../applications-overlay/Media';
import Gamification from '../applications-overlay/Gamification';
import Leisure from '../applications-overlay/Leisure';
import Market from '../applications-overlay/Market';
import Lifestyle from '../applications-overlay/Lifestyle';
import Hobbies from '../applications-overlay/Hobbies';
import Knowledge from '../applications-overlay/Knowledge';
import Sports from '../applications-overlay/Sports';
import Religion from '../applications-overlay/Religion';
import Services from '../applications-overlay/Services';
import { OverlayNavigationProvider } from '../applications-overlay/contexts/OverlayNavigationContext';
import OverlayHeader from '../applications-overlay/components/OverlayHeader';
import Icon from './Icon';

interface OverlayAppProps {
    appName: OverlayAppId;
    onClose: () => void;
}

const APP_COMPONENTS: { [key in OverlayAppId]: React.ElementType } = {
    studio: Studio,
    media: Media,
    gamification: Gamification,
    leisure: Leisure,
    market: Market,
    lifestyle: Lifestyle,
    hobbies: Hobbies,
    knowledge: Knowledge,
    sports: Sports,
    religion: Religion,
    services: Services,
};

const OverlayApp = ({ appName, onClose }: OverlayAppProps): React.ReactElement => {
    const { handleMinimizeApp } = useUIState();
    const appDetails = OVERLAY_APPS.find(app => app.id === appName);
    const appNavData = OVERLAY_APP_NAVIGATION[appName];
    const overlayContainerRef = useRef<HTMLDivElement>(null);
    const titleId = `overlay-title-${appName}`;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        overlayContainerRef.current?.focus();

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const AppToRender = APP_COMPONENTS[appName];

    return (
        <div 
            ref={overlayContainerRef}
            className="fixed inset-0 bg-background z-50 flex flex-col animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
        >
            {appDetails && (
                <OverlayNavigationProvider navData={appNavData}>
                    <OverlayHeader
                        appDetails={appDetails}
                        onClose={onClose}
                        onMinimize={handleMinimizeApp}
                    />
                    <main className="flex-1 flex overflow-hidden">
                        {AppToRender ? (
                            <AppToRender />
                        ) : (
                            <div className="flex-1 p-6 flex items-center justify-center">
                                <div className="text-center">
                                    <Icon name={appDetails.icon} className="w-32 h-32 text-border mx-auto" />
                                    <h3 className="text-3xl font-bold mt-4 text-primary">Welcome to {appDetails.label}</h3>
                                    <p className="text-secondary mt-2">This application is not fully configured yet.</p>
                                </div>
                            </div>
                        )}
                    </main>
                </OverlayNavigationProvider>
            )}
        </div>
    );
};

export default React.memo(OverlayApp);
