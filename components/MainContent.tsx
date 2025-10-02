

import React from 'react';
import Icon from './Icon';
import Card from './Card';
import { MAIN_CONTENT_CARDS } from '../data';
import { useNavigation } from '../contexts/NavigationContext';

const MainContent = (): React.ReactElement => {
    const { activeRightSidebarItem, activeHeaderItem, activeLeftSubnavItem } = useNavigation();
    const activeView = `${activeRightSidebarItem}_${activeHeaderItem}_${activeLeftSubnavItem}`;
    
    const cards = MAIN_CONTENT_CARDS[activeView] || [];

    const renderContent = () => {
        // Check for a custom component view
        if (cards.length === 1 && cards[0].component) {
            const CustomComponent = cards[0].component;
            return <CustomComponent />;
        }

        if (cards.length > 0) {
            return (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-4 md:h-full md:auto-rows-fr">
                    {cards.map(card => {
                        // Type guard to ensure we have title and icon for standard cards
                        if (card.title && card.icon) {
                            return <Card key={card.id} title={card.title} icon={card.icon} />;
                        }
                        return null;
                    })}
                </div>
            );
        }

        // Fallback for views without defined cards
        return (
            <div className="bg-component rounded-custom shadow-custom h-full flex items-center justify-center border border-border">
                <div className="text-center text-secondary">
                    <Icon name="briefcase-icon" className="w-24 h-24 mx-auto text-border" />
                    <h2 className="mt-4 text-2xl font-bold text-primary">Content Area</h2>
                    <p className="mt-2">No functional cards for this view.</p>
                    <p className="mt-1"><code className="bg-sidebar px-2 py-1 rounded">{activeView}</code></p>
                </div>
            </div>
        );
    };

    return (
        <main id="main-content" className="flex-1 bg-background p-2 sm:p-4 lg:p-6 overflow-y-auto">
            {renderContent()}
        </main>
    );
};

export default MainContent;