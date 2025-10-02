
import type { NavigationGroup, MainContentCard } from '../../types';

export const schoolNav: NavigationGroup = {
    header: [{ id: 'courses', label: 'Courses' }, { id: 'students', label: 'Students' }],
    subnav: {
        courses: [{ id: 'all-courses', label: 'ALL COURSES', icon: 'graduation-cap-icon' }],
        students: [{ id: 'enrollment', label: 'ENROLLMENT', icon: 'cog-6-tooth-icon' }],
    },
};

export const schoolCards: { [key: string]: MainContentCard[] } = {
    'school_courses_all-courses': Array.from({ length: 12 }, (_, i) => ({
        id: `card-course-${i}`,
        title: `Course ${i + 1}`,
        icon: 'graduation-cap-icon'
    })),
};
