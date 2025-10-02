
import React from 'react';
import Icon from './Icon';
import { Card as CardPrimitive } from './primitives/Card';
import type { IconName } from '../types';

interface CardProps {
    title: string;
    // Fix: Changed icon type from string to IconName to match the Icon component's props.
    icon: IconName;
}

const Card = ({ title, icon }: CardProps): React.ReactElement => {
    return (
        <CardPrimitive className="transition-transform duration-200 hover:scale-105 hover:shadow-lg focus-within:outline-none focus-within:ring-2 focus-within:ring-accent-primary focus-within:ring-offset-2 h-full">
            <button className="w-full h-full p-4 flex flex-col items-center justify-center text-center aspect-square sm:aspect-auto sm:h-32 md:h-full focus:outline-none">
                <Icon name={icon} className="w-8 h-8 sm:w-10 sm:h-10 text-accent-primary mb-2" />
                <h3 className="text-xs sm:text-sm font-semibold text-primary">{title}</h3>
            </button>
        </CardPrimitive>
    );
};

export default React.memo(Card);
