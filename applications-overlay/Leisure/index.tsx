

import React from 'react';
import OverlaySubnavLeft from '../components/OverlaySubnavLeft';
import AppContent from '../components/AppContent';

const Leisure = () => {
    return (
        <div className="flex flex-1 h-full overflow-hidden">
            <OverlaySubnavLeft />
            <AppContent />
        </div>
    );
};

export default Leisure;
