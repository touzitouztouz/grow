

import React from 'react';
import { useOverlayNavigation } from '../contexts/OverlayNavigationContext';
import Icon from '../../components/Icon';

const AppContent = () => {
    const { activeHeaderItem, activeSubnavItem, navData } = useOverlayNavigation();
    
    const headerLabel = navData.subApps.find(app => app.id === activeHeaderItem)?.label || '...';
    const subnavLabel = navData.content[activeHeaderItem]?.find(item => item.id === activeSubnavItem)?.label || '...';

    return (
        <main id="overlay-main-content" className="flex-1 bg-background p-2 sm:p-4 lg:p-6 overflow-y-auto">
             <div className="bg-component rounded-custom shadow-custom h-full flex items-center justify-center border border-border">
                <div className="text-center text-secondary">
                    <Icon name="briefcase-icon" className="w-24 h-24 mx-auto text-border" />
                    <h2 className="mt-4 text-2xl font-bold text-primary">Content Area</h2>
                    <p className="mt-2">This is the content area for the selected navigation.</p>
                    <p className="mt-1">
                        <code className="bg-sidebar px-2 py-1 rounded">{headerLabel}</code>
                        <span className="mx-2">&gt;</span>
                        <code className="bg-sidebar px-2 py-1 rounded">{subnavLabel}</code>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default AppContent;
