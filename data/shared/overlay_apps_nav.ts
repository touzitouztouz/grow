
import type { OverlayAppNav } from '../../types';

export const OVERLAY_APP_NAVIGATION: { [key: string]: OverlayAppNav } = {
    studio: {
        subApps: [
            { id: 'designer', label: 'Designer' }, { id: 'video', label: 'Video' },
            { id: 'coder', label: 'Coder' }, { id: 'office', label: 'Office' },
            { id: 'creative_marketplace', label: 'Creative Marketplace' }
        ],
        content: {
            designer: [{ id: 'templates', label: 'Templates', icon: 'photo-icon' }, { id: 'create_new', label: 'Create New', icon: 'plus-icon' }, { id: 'my_designs', label: 'My Designs', icon: 'inbox-arrow-down-icon' }, { id: 'brand_kit', label: 'Brand Kit', icon: 'briefcase-icon' }],
            video: [{ id: 'video_editor', label: 'Video Editor', icon: 'film-icon' }, { id: 'ai_enhancement', label: 'AI Enhancement', icon: 'sparkles-icon' }, { id: 'my_videos', label: 'My Videos', icon: 'inbox-arrow-down-icon' }, { id: 'export', label: 'Export', icon: 'paper-airplane-icon' }],
            coder: [{ id: 'code_editor', label: 'Code Editor', icon: 'cog-6-tooth-icon' }, { id: 'ai_debugger', label: 'AI Debugger', icon: 'sparkles-icon' }, { id: 'projects', label: 'Projects', icon: 'briefcase-icon' }, { id: 'syntax_highlighting', label: 'Syntax', icon: 'cog-6-tooth-icon' }],
            office: [{ id: 'documents', label: 'Documents', icon: 'book-open-icon' }, { id: 'spreadsheets', label: 'Spreadsheets', icon: 'calculator-icon' }, { id: 'presentations', label: 'Presentations', icon: 'film-icon' }, { id: 'file_management', label: 'File Management', icon: 'briefcase-icon' }],
            creative_marketplace: [{ id: 'stock_photos', label: 'Stock Photos', icon: 'photo-icon' }, { id: 'audio_library', label: 'Audio Library', icon: 'film-icon' }, { id: '3d_models', label: '3D Models', icon: 'puzzle-piece-icon' }, { id: 'fonts', label: 'Fonts', icon: 'sparkles-icon' }],
        }
    },
    media: {
        subApps: [{ id: 'movies', label: 'Movies' }, { id: 'series', label: 'Series' }, { id: 'docs', label: 'Docs' }, { id: 'kids', label: 'Kids' }, { id: 'content_management', label: 'Content Management' }],
        content: {
            movies: [{ id: 'movie_library', label: 'Movie Library', icon: 'film-icon' }, { id: 'categories', label: 'Categories', icon: 'squares-plus-icon' }, { id: 'watch_list', label: 'Watch List', icon: 'star-icon' }, { id: 'continue_watching', label: 'Continue', icon: 'home-icon' }],
            series: [{ id: 'series_library', label: 'Series Library', icon: 'film-icon' }, { id: 'episodes', label: 'Episodes', icon: 'film-icon' }, { id: 'seasons', label: 'Seasons', icon: 'calendar-days-icon' }, { id: 'my_series', label: 'My Series', icon: 'star-icon' }],
            docs: [{ id: 'documentary_library', label: 'Library', icon: 'book-open-icon' }, { id: 'educational', label: 'Educational', icon: 'graduation-cap-icon' }, { id: 'topics', label: 'Topics', icon: 'squares-plus-icon' }, { id: 'featured', label: 'Featured', icon: 'star-icon' }],
            kids: [{ id: 'kids_content', label: 'Kids Content', icon: 'puzzle-piece-icon' }, { id: 'educational', label: 'Educational', icon: 'graduation-cap-icon' }, { id: 'entertainment', label: 'Entertainment', icon: 'film-icon' }, { id: 'parental_controls', label: 'Controls', icon: 'cog-6-tooth-icon' }],
            content_management: [{ id: 'upload', label: 'Upload', icon: 'inbox-arrow-down-icon' }, { id: 'schedule', label: 'Schedule', icon: 'calendar-days-icon' }, { id: 'moderate', label: 'Moderate', icon: 'exclamation-triangle-icon' }, { id: 'analytics', label: 'Analytics', icon: 'calculator-icon' }],
        }
    },
    gamification: {
        subApps: [{ id: 'quizzes', label: 'Quizzes & Challenges' }, { id: 'rewards', label: 'Rewards & Leaderboards' }, { id: 'analytics', label: 'Analytics' }],
        content: {
            quizzes: [{ id: 'quiz_builder', label: 'Quiz Builder', icon: 'plus-icon' }, { id: 'challenge_creator', label: 'Challenge Creator', icon: 'puzzle-piece-icon' }, { id: 'question_bank', label: 'Question Bank', icon: 'book-open-icon' }, { id: 'templates', label: 'Templates', icon: 'photo-icon' }],
            rewards: [{ id: 'reward_system', label: 'Reward System', icon: 'star-icon' }, { id: 'leaderboard_setup', label: 'Leaderboard', icon: 'trophy-icon' }, { id: 'badge_designer', label: 'Badge Designer', icon: 'sparkles-icon' }, { id: 'point_system', label: 'Point System', icon: 'calculator-icon' }],
            analytics: [{ id: 'engagement_metrics', label: 'Engagement', icon: 'calculator-icon' }, { id: 'performance_analytics', label: 'Performance', icon: 'calculator-icon' }, { id: 'progress_tracking', label: 'Progress', icon: 'home-icon' }, { id: 'reports', label: 'Reports', icon: 'book-open-icon' }],
        }
    },
    leisure: {
        subApps: [{ id: 'clubs', label: 'Clubs & Community' }, { id: 'events', label: 'Events Calendar & Booking' }],
        content: {
            clubs: [{ id: 'club_directory', label: 'Club Directory', icon: 'book-open-icon' }, { id: 'club_management', label: 'Management', icon: 'cog-6-tooth-icon' }, { id: 'community_groups', label: 'Community', icon: 'chat-bubble-left-right-icon' }, { id: 'membership', label: 'Membership', icon: 'star-icon' }],
            events: [{ id: 'calendar_view', label: 'Calendar View', icon: 'calendar-days-icon' }, { id: 'event_creation', label: 'Event Creation', icon: 'plus-icon' }, { id: 'booking_system', label: 'Booking System', icon: 'briefcase-icon' }, { id: 'ticketing', label: 'Ticketing', icon: 'puzzle-piece-icon' }],
        }
    },
    market: {
        subApps: [{ id: 'marketplace', label: 'Marketplace' }, { id: 'orders', label: 'Orders' }, { id: 'sellers', label: 'Sellers' }, { id: 'offers', label: 'Offers' }],
        content: {
            marketplace: [{ id: 'product_listings', label: 'Listings', icon: 'building-storefront-icon' }, { id: 'categories', label: 'Categories', icon: 'squares-plus-icon' }, { id: 'search', label: 'Search', icon: 'home-icon' }, { id: 'featured', label: 'Featured', icon: 'star-icon' }],
            orders: [{ id: 'order_management', label: 'Management', icon: 'cog-6-tooth-icon' }, { id: 'order_history', label: 'History', icon: 'calendar-days-icon' }, { id: 'tracking', label: 'Tracking', icon: 'paper-airplane-icon' }, { id: 'returns', label: 'Returns', icon: 'arrow-left-circle-icon' }],
            sellers: [{ id: 'seller_profiles', label: 'Profiles', icon: 'briefcase-icon' }, { id: 'seller_verification', label: 'Verification', icon: 'check-icon' }, { id: 'seller_analytics', label: 'Analytics', icon: 'calculator-icon' }, { id: 'reviews', label: 'Reviews', icon: 'star-icon' }],
            offers: [{ id: 'discount_codes', label: 'Discounts', icon: 'puzzle-piece-icon' }, { id: 'promotions', label: 'Promotions', icon: 'bell-alert-icon' }, { id: 'special_offers', label: 'Special Offers', icon: 'star-icon' }, { id: 'bulk_pricing', label: 'Bulk Pricing', icon: 'calculator-icon' }],
        }
    },
    lifestyle: {
        subApps: [{ id: 'food', label: 'Food' }, { id: 'events', label: 'Events' }, { id: 'booking', label: 'Booking' }, { id: 'flight', label: 'Flight' }, { id: 'car', label: 'Car' }],
        content: {
            food: [{ id: 'restaurant_finder', label: 'Finder', icon: 'home-icon' }, { id: 'reservations', label: 'Reservations', icon: 'calendar-days-icon' }, { id: 'delivery', label: 'Delivery', icon: 'paper-airplane-icon' }, { id: 'reviews', label: 'Reviews', icon: 'star-icon' }],
            events: [{ id: 'event_finder', label: 'Finder', icon: 'home-icon' }, { id: 'ticket_booking', label: 'Booking', icon: 'puzzle-piece-icon' }, { id: 'event_calendar', label: 'Calendar', icon: 'calendar-days-icon' }, { id: 'my_events', label: 'My Events', icon: 'star-icon' }],
            booking: [{ id: 'hotel_booking', label: 'Hotels', icon: 'building-storefront-icon' }, { id: 'property_rental', label: 'Rentals', icon: 'home-icon' }, { id: 'vacation_packages', label: 'Packages', icon: 'briefcase-icon' }, { id: 'travel_insurance', label: 'Insurance', icon: 'check-icon' }],
            flight: [{ id: 'flight_search', label: 'Search', icon: 'home-icon' }, { id: 'flight_booking', label: 'Booking', icon: 'briefcase-icon' }, { id: 'check_in', label: 'Check-in', icon: 'check-icon' }, { id: 'flight_status', label: 'Status', icon: 'bell-alert-icon' }],
            car: [{ id: 'car_rental', label: 'Car Rental', icon: 'briefcase-icon' }, { id: 'car_sharing', label: 'Car Sharing', icon: 'chat-bubble-left-right-icon' }, { id: 'airport_transfers', label: 'Transfers', icon: 'paper-airplane-icon' }, { id: 'long_term_rental', label: 'Long-term', icon: 'calendar-days-icon' }],
        }
    },
    hobbies: {
        subApps: [{ id: 'crafts', label: 'Crafts' }, { id: 'photography', label: 'Photography' }, { id: 'cooking', label: 'Cooking' }],
        content: {
            crafts: [{ id: 'craft_tutorials', label: 'Tutorials', icon: 'book-open-icon' }, { id: 'project_ideas', label: 'Ideas', icon: 'sparkles-icon' }, { id: 'materials', label: 'Materials', icon: 'briefcase-icon' }, { id: 'community', label: 'Community', icon: 'chat-bubble-left-right-icon' }],
            photography: [{ id: 'photo_gallery', label: 'Gallery', icon: 'photo-icon' }, { id: 'photography_tips', label: 'Tips', icon: 'sparkles-icon' }, { id: 'camera_reviews', label: 'Reviews', icon: 'star-icon' }, { id: 'photo_contests', label: 'Contests', icon: 'trophy-icon' }],
            cooking: [{ id: 'recipe_library', label: 'Recipes', icon: 'book-open-icon' }, { id: 'cooking_classes', label: 'Classes', icon: 'graduation-cap-icon' }, { id: 'ingredient_guide', label: 'Ingredients', icon: 'puzzle-piece-icon' }, { id: 'meal_planning', label: 'Planning', icon: 'calendar-days-icon' }, { id: 'community_competitions', label: 'Competitions', icon: 'trophy-icon' }],
        }
    },
    knowledge: {
        subApps: [{ id: 'books', label: 'Books' }, { id: 'courses', label: 'Courses' }, { id: 'exams', label: 'Exams' }, { id: 'certificates', label: 'Certificates' }, { id: 'ai_study_assist', label: 'AI Study Assist' }],
        content: {
            books: [{ id: 'digital_library', label: 'Library', icon: 'book-open-icon' }, { id: 'ebooks', label: 'E-Books', icon: 'book-open-icon' }, { id: 'reading_lists', label: 'Reading Lists', icon: 'star-icon' }, { id: 'book_reviews', label: 'Reviews', icon: 'star-icon' }],
            courses: [{ id: 'course_catalog', label: 'Catalog', icon: 'book-open-icon' }, { id: 'my_courses', label: 'My Courses', icon: 'star-icon' }, { id: 'course_builder', label: 'Builder', icon: 'plus-icon' }, { id: 'progress_tracking', label: 'Progress', icon: 'home-icon' }],
            exams: [{ id: 'exam_builder', label: 'Builder', icon: 'plus-icon' }, { id: 'test_scheduler', label: 'Scheduler', icon: 'calendar-days-icon' }, { id: 'grading_system', label: 'Grading', icon: 'calculator-icon' }, { id: 'performance_reports', label: 'Reports', icon: 'book-open-icon' }],
            certificates: [{ id: 'certificate_templates', label: 'Templates', icon: 'photo-icon' }, { id: 'certificate_issuance', label: 'Issuance', icon: 'paper-airplane-icon' }, { id: 'verification_system', label: 'Verification', icon: 'check-icon' }, { id: 'digital_badges', label: 'Badges', icon: 'sparkles-icon' }],
            ai_study_assist: [{ id: 'text_summarizer', label: 'Summarizer', icon: 'sparkles-icon' }, { id: 'flashcard_generator', label: 'Flashcards', icon: 'puzzle-piece-icon' }, { id: 'personalized_learning', label: 'Personalized', icon: 'star-icon' }, { id: 'study_planner', label: 'Planner', icon: 'calendar-days-icon' }],
        }
    },
    sports: {
        subApps: [{ id: 'football', label: 'Football' }, { id: 'basketball', label: 'Basketball' }, { id: 'soccer', label: 'Soccer' }, { id: 'fitness_tracking', label: 'Fitness Tracking' }],
        content: {
            football: [{ id: 'team_roster', label: 'Roster', icon: 'briefcase-icon' }, { id: 'match_schedule', label: 'Schedule', icon: 'calendar-days-icon' }, { id: 'performance_stats', label: 'Stats', icon: 'calculator-icon' }, { id: 'training_plans', label: 'Training', icon: 'home-icon' }],
            basketball: [{ id: 'team_roster', label: 'Roster', icon: 'briefcase-icon' }, { id: 'match_schedule', label: 'Schedule', icon: 'calendar-days-icon' }, { id: 'performance_stats', label: 'Stats', icon: 'calculator-icon' }, { id: 'training_plans', label: 'Training', icon: 'home-icon' }],
            soccer: [{ id: 'team_roster', label: 'Roster', icon: 'briefcase-icon' }, { id: 'match_schedule', label: 'Schedule', icon: 'calendar-days-icon' }, { id: 'performance_stats', label: 'Stats', icon: 'calculator-icon' }, { id: 'training_plans', label: 'Training', icon: 'home-icon' }],
            fitness_tracking: [{ id: 'personal_training', label: 'Training', icon: 'home-icon' }, { id: 'progress_monitoring', label: 'Progress', icon: 'home-icon' }, { id: 'health_metrics', label: 'Metrics', icon: 'calculator-icon' }, { id: 'goal_setting', label: 'Goals', icon: 'star-icon' }],
        }
    },
    religion: {
        subApps: [{ id: 'quran', label: 'Quran' }, { id: 'hadith', label: 'Hadith' }, { id: 'prayer', label: 'Prayer' }, { id: 'fasting', label: 'Fasting' }],
        content: {
            quran: [{ id: 'digital_quran', label: 'Digital Quran', icon: 'book-open-icon' }, { id: 'search_functionality', label: 'Search', icon: 'home-icon' }, { id: 'recitation_tools', label: 'Recitation', icon: 'sparkles-icon' }, { id: 'translation', label: 'Translation', icon: 'chat-bubble-left-right-icon' }],
            hadith: [{ id: 'hadith_collection', label: 'Collection', icon: 'book-open-icon' }, { id: 'search_hadith', label: 'Search', icon: 'home-icon' }, { id: 'categorization', label: 'Categories', icon: 'squares-plus-icon' }, { id: 'explanation', label: 'Explanation', icon: 'book-open-icon' }],
            prayer: [{ id: 'prayer_times', label: 'Times', icon: 'calendar-days-icon' }, { id: 'qibla_direction', label: 'Qibla', icon: 'home-icon' }, { id: 'prayer_tracker', label: 'Tracker', icon: 'check-icon' }, { id: 'mosque_finder', label: 'Finder', icon: 'home-icon' }],
            fasting: [{ id: 'ramadan_tracker', label: 'Tracker', icon: 'calendar-days-icon' }, { id: 'fasting_schedule', label: 'Schedule', icon: 'calendar-days-icon' }, { id: 'duas_collection', label: 'Duas', icon: 'book-open-icon' }, { id: 'nutrition_tips', label: 'Tips', icon: 'heart-icon' }],
        }
    },
    services: {
        subApps: [{ id: 'housekeeping', label: 'Housekeeping' }, { id: 'gardening', label: 'Gardening' }, { id: 'maintenance', label: 'Maintenance' }, { id: 'babysitting', label: 'Babysitting' }],
        content: {
            housekeeping: [{ id: 'service_providers', label: 'Providers', icon: 'briefcase-icon' }, { id: 'booking_system', label: 'Booking', icon: 'calendar-days-icon' }, { id: 'provider_reviews', label: 'Reviews', icon: 'star-icon' }, { id: 'service_packages', label: 'Packages', icon: 'briefcase-icon' }],
            gardening: [{ id: 'garden_services', label: 'Services', icon: 'sparkles-icon' }, { id: 'lawn_care', label: 'Lawn Care', icon: 'home-icon' }, { id: 'landscaping', label: 'Landscaping', icon: 'photo-icon' }, { id: 'plant_care', label: 'Plant Care', icon: 'heart-icon' }],
            maintenance: [{ id: 'home_repair', label: 'Repair', icon: 'wrench-screwdriver-icon' }, { id: 'plumbing', label: 'Plumbing', icon: 'wrench-screwdriver-icon' }, { id: 'electrical', label: 'Electrical', icon: 'sparkles-icon' }, { id: 'hvac', label: 'HVAC', icon: 'cog-6-tooth-icon' }],
            babysitting: [{ id: 'babysitters', label: 'Babysitters', icon: 'briefcase-icon' }, { id: 'booking_system', label: 'Booking', icon: 'calendar-days-icon' }, { id: 'background_checks', label: 'Checks', icon: 'check-icon' }, { id: 'parent_reviews', label: 'Reviews', icon: 'star-icon' }],
        }
    },
};
