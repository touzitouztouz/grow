

import React from 'react';
import { ICONS } from '../data';
import type { IconName } from '../types';

interface IconProps {
    name: IconName;
    className?: string;
}

const Icon = ({ name, className = 'w-6 h-6' }: IconProps): React.ReactElement => {
    const iconSvg = ICONS[name];

    if (!iconSvg) {
        // Fallback for safety, though TypeScript should prevent this.
        return <div className={`${className} bg-red-300 rounded-full`}></div>;
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={className}
            aria-hidden="true"
        >
            {iconSvg}
        </svg>
    );
};

export default React.memo(Icon);
