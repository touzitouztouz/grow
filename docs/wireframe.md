# Dynamic SaaS Dashboard - Technical Design Specification

This document provides a comprehensive technical breakdown of the UI structure, component architecture, state management, and user flow for the Dynamic SaaS Dashboard application. It serves as the single source of truth for design tokens, component APIs, and application logic.

## 1. Core Principles

-   **Component-Based Architecture:** Built with React, leveraging reusable components for UI consistency and maintainability.
-   **Responsive First:** The design adapts seamlessly from mobile (`<768px`) to desktop (`>=768px`) viewports using a mobile-first approach.
-   **State-Driven UI:** The interface is a direct reflection of the application's state, managed primarily through React Context and reducers for predictable state transitions.
-   **Accessibility (A11y):** Designed with ARIA attributes, semantic HTML, keyboard navigation, and focus management to be usable by everyone.

---

## 2. Global Design Tokens

This section defines the primitive values that construct the application's visual language.

### 2.1. Breakpoints

| Name | Min-Width | Tailwind Class |
| :--- | :-------- | :------------- |
| sm   | 640px     | `sm:`          |
| md   | 768px     | `md:`          |
| lg   | 1024px    | `lg:`          |
| xl   | 1280px    | `xl:`          |

### 2.2. Colors & Theming

Colors are defined using HSL CSS variables for easy theme switching.

| Variable Name                | Light Theme HSL     | Dark Theme HSL      | Purpose                               |
| :--------------------------- | :------------------ | :------------------ | :------------------------------------ |
| `--background`               | `220 20% 97%`       | `228 10% 6%`        | Main page background.                 |
| `--component`                | `0 0% 100%`         | `225 15% 10%`       | Background for core UI elements.      |
| `--card` / `--sidebar`       | `0 0% 100%`         | `228 15% 15%`       | Background for cards and sidebars.    |
| `--border`                   | `220 20% 85%`       | `220 15% 25%`       | Borders and dividers.                 |
| `--primary`                  | `225 25% 15%`       | `210 20% 90%`       | Primary text and active elements.     |
| `--primary-foreground`       | `0 0% 100%`         | `228 10% 6%`        | Text on primary backgrounds.          |
| `--secondary`                | `220 10% 45%`       | `220 15% 60%`       | Secondary text and inactive elements. |
| `--accent-primary`           | `217 100% 60%`      | `180 100% 50%`      | Main brand color, interactive highlights. |
| `--accent-secondary`         | `262 88% 58%`      | `310 100% 50%`      | Secondary brand color, sub-nav highlights. |
| `--destructive`              | `0 84% 60%`         | `0 62% 50%`         | Destructive actions (e.g., delete).   |

### 2.3. Typography

-   **Font Family:** `Inter`, sans-serif.
-   **Scale:**
    | Style         | Size (`rem`/`px`)        | Weight     | Tailwind Class        | Usage Example         |
    | :------------ | :----------------------- | :--------- | :-------------------- | :-------------------- |
    | Display       | `1.875rem` / 30px        | 700 (Bold) | `text-3xl font-bold`  | Overlay App Titles    |
    | Heading 1 (H1)| `1.25rem` / 20px (lg)    | 700 (Bold) | `text-xl font-bold`   | Header Section Title  |
    | Heading 2 (H2)| `1.125rem` / 18px        | 600 (Semi) | `text-lg font-semibold`| Card Titles (Detail)  |
    | Body          | `0.875rem` / 14px        | 400 (Reg)  | `text-sm`             | General text, descriptions. |
    | Small / Label | `0.75rem` / 12px         | 500 (Med)  | `text-xs`             | Footer App Labels, UI hints. |
    | Micro         | `0.4375rem` / 7px        | 600 (Semi) | `text-[7px]`          | Phone Sidebar Labels  |

### 2.4. Sizing & Spacing

Based on a 0.25rem (4px) grid.

| Token     | Size (`rem`/`px`) | Tailwind Class | Usage Example                         |
| :-------- | :---------------- | :------------- | :------------------------------------ |
| `h-screen`| `100vh`           | `h-screen`     | Main application container.           |
| `h-16`    | `4rem` / 64px     | `h-16`         | Header height (desktop).              |
| `h-14`    | `3.5rem` / 56px   | `h-14`         | Footer height (mobile).               |
| `w-56`    | `14rem` / 224px   | `w-56`         | Right Sidebar width (expanded).       |
| `w-52`    | `13rem` / 208px   | `w-52`         | Left Subnav width (expanded).         |
| `w-20`    | `5rem` / 80px     | `w-20`         | Sidebars width (mobile/collapsed).    |

| Spacing | Size (`rem`/`px`) | Tailwind Class |
| :------ | :---------------- | :------------- |
| 1       | `0.25rem` / 4px   | `p-1`, `gap-1` |
| 2       | `0.5rem` / 8px    | `p-2`, `gap-2` |
| 4       | `1rem` / 16px     | `p-4`, `gap-4` |
| 6       | `1.5rem` / 24px   | `p-6`, `gap-6` |

### 2.5. Borders & Radii

-   **Border Width:** `1px` (`border`).
-   **Border Radius:** `--radius: 1rem;` (`rounded-custom`).

### 2.6. Shadows & Animations

-   **`shadow-custom`**: `0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)`
-   **`shadow-glow-primary`**: `0 0 12px 0 hsl(var(--accent-primary) / 0.35)`
-   **`animate-fade-in`**:
    -   **Duration:** `0.3s`
    -   **Timing:** `ease-out`
    -   **Keyframes:** `from: { opacity: 0, transform: scale(0.95) } to: { opacity: 1, transform: scale(1) }`

---

## 3. File Structure

```
/
├── applications-overlay/   # Self-contained overlay application modules
│   ├── components/         # Shared components for overlays (Header, Subnav)
│   ├── contexts/           # Context providers specific to overlays
│   └── [AppName]/          # Folder for each specific app (e.g., Studio)
│       └── index.tsx
├── components/
│   ├── primitives/         # Atomic, reusable UI components (Button, Card, etc.)
│   ├── lib/                # Utility functions (e.g., cn)
│   └── [Component].tsx     # Composite components (Header, Footer, etc.)
├── contexts/               # Global context providers (UIState, Navigation, Theme)
├── data/                   # Static data, navigation structure, icons
│   └── index.tsx
├── docs/
│   └── wireframe.md        # This document
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Root application component
├── index.html              # Main HTML entry point with Tailwind config
└── index.tsx               # React DOM entry point
```

---

## 4. Component Architecture & Detailed Breakdown

### 4.1. Header (`<Header />`)

-   **Dimensions:** `h-16` (64px), `px-2 sm:px-4`, `py-2`.
-   **Left Section:**
    -   **Content:** `sectionTitle` prop.
    -   **Sizing:** `text-sm sm:text-base lg:text-xl`.
-   **Center Section (Nav):**
    -   **Container:** `p-1`, `space-x-1`.
    -   **Buttons:** `px-2 sm:px-4 py-1`, `text-xs sm:text-sm`.
-   **Right Section:**
    -   **Spacing:** `space-x-2 sm:space-x-3 md:space-x-4`.
    -   **Icons:** `w-5 h-5 sm:w-6 sm:h-6`.
    -   **Avatar:** `w-8 h-8 sm:w-10 sm:h-10`.
    -   **Internal State:** `const [isDropdownOpen, setIsDropdownOpen] = useState(false);`
-   **API:**
    | Prop           | Type         | Description                                        |
    | -------------- | ------------ | -------------------------------------------------- |
    | `sectionTitle` | `string`     | The main title displayed on the left.              |
    | `user`         | `User`       | Object with user name, role, and avatar URL.       |

### 4.2. Right Sidebar (`<SidebarRight />` & `<PhoneRightSidebar />`)

-   **Desktop (`SidebarRight`):**
    -   **State:** Controlled by `isRightSidebarOpen`. Width animates between `w-56` (224px) and `w-20` (80px).
    -   **Layout (Expanded):** `p-3` on buttons, icon `w-6 h-6`, label `text-sm`.
    -   **Layout (Collapsed):** `p-3`, `justify-center`. Label has `opacity-0 absolute`.
-   **Mobile (`PhoneRightSidebar`):**
    -   **State:** Controlled by `isRightSidebarOpen`. Width animates between `w-20` (80px) and `w-0`.
    -   **Layout:** `p-1` on buttons, icon `w-6 h-6`, label `text-[7px]`.
-   **Active State:** Highlight bar is `w-1 h-8 bg-accent-primary rounded-r-full`.

### 4.3. Left Sub-navigation (`<SubnavLeft />` & `<PhoneLeftSubnav />`)

-   **Visibility:** Rendered only if `hasSubnav` from `NavigationContext` is `true`.
-   **Desktop (`SubnavLeft`):**
    -   **State:** Controlled by `isLeftSidebarOpen`. Width animates between `w-52` (208px) and `w-0`.
    -   **Layout:** `p-3` on buttons, icon `w-5 h-5 mr-3`, label `text-sm`.
-   **Mobile (`PhoneLeftSubnav`):**
    -   **State:** Controlled by `isLeftSidebarOpen`. Width animates between `w-20` (80px) and `w-0`.
    -   **Layout:** `p-1` on buttons, icon `w-6 h-6 mb-1`, label `text-[7px] uppercase`.

### 4.4. Footer (`<Footer />`)

-   **Dimensions:** `h-14` (56px) on mobile, `h-16` (64px) on desktop.
-   **Sidebar Toggles:**
    -   **Icon Size:** `w-7 h-7 sm:w-8 sm:h-8`.
-   **Center App Tray:**
    -   **Toggle Button:** `w-9 h-9 sm:w-12 sm:h-12`. Icon inside is `w-5 h-5 sm:w-7 sm:h-7`.
    -   **App Buttons:**
        -   **Closed State:** `w-0`, `opacity-0`, `scale-50`, `pointer-events-none`.
        -   **Open State:** `w-8 sm:w-16`, `opacity-100`, `scale-100`.
        -   **Icon Size:** `w-4 h-4 sm:w-8 sm:h-8`.
-   **Minimized Apps Area:**
    -   **Spacing:** `space-x-1 sm:space-x-2`.
    -   **Icon Button:** `p-2`, icon `w-5 h-5 sm:w-6 sm:h-6`.
    -   **Close Button:** `w-5 h-5`, icon `w-3 h-3`. Appears on `group-hover`.

### 4.5. Overlay Application (`<OverlayApp />`)

-   **Layout:** `position: fixed`, `inset-0`, `z-50`, `animate-fade-in`.
-   **`OverlayHeader`:** `h-16` (64px). App icon `w-6 h-6`. Minimize/Close buttons `p-2` with `w-5 h-5` icons.
-   **`OverlaySubnavLeft`:**
    -   **Internal State:** `const [isOpen, setIsOpen] = useState(true);`
    -   **Dimensions:** Animates between `w-20 md:w-52` and `w-0`.
    -   **Responsive Layout:**
        -   Mobile: `flex-col`, `p-2`, icon `w-6 h-6 mb-1`, label `text-[10px]`.
        -   Desktop: `md:flex-row`, `md:p-3`, icon `w-6 h-6 md:mr-3`, label `md:text-sm`.
    -   **Toggle Button:** `p-1.5` with `w-6 h-6` icon. Positioned `absolute bottom-4`.

---

## 5. State Management & Data Flow

### 5.1. `UIStateContext`

Manages global UI state unrelated to navigation content.

-   **State Schema:**
    | Key                 | Type                      | Description                                                  | Initial Value (Desktop / Mobile) |
    | :------------------ | :------------------------ | :----------------------------------------------------------- | :------------------------------- |
    | `isLeftSidebarOpen` | `boolean`                 | Visibility of the left sub-navigation.                       | `true` / `false`                 |
    | `isRightSidebarOpen`| `boolean`                 | Expanded/collapsed state of the right sidebar.               | `true` / `false`                 |
    | `isTrayOpen`        | `boolean`                 | Visibility of the footer app tray.                           | `false`                          |
    | `activeOverlayApp`  | `string \| null`          | The ID of the currently open overlay application.            | `null`                           |
    | `minimizedApps`     | `string[]`                | An array of IDs of minimized applications.                   | `[]`                             |
    | `announcement`      | `string`                  | A message for the screen reader announcer `div`.               | `''`                             |

-   **Reducer Actions:**
    | Action Type             | Payload                                        | Description                                                  |
    | :---------------------- | :--------------------------------------------- | :----------------------------------------------------------- |
    | `TOGGLE_LEFT_SIDEBAR`   | `none`                                         | Flips `isLeftSidebarOpen` state.                             |
    | `TOGGLE_RIGHT_SIDEBAR`  | `none`                                         | Flips `isRightSidebarOpen` state.                            |
    | `TOGGLE_TRAY`           | `none`                                         | Flips `isTrayOpen` state.                                    |
    | `SET_ANNOUNCEMENT`      | `string`                                       | Sets a message for the screen reader.                        |
    | `LAUNCH_APP`            | `{ appId: string, trigger: HTMLButtonElement }`| Sets `activeOverlayApp`, removes from `minimizedApps`.       |
    | `CLOSE_OVERLAY`         | `none`                                         | Sets `activeOverlayApp` to `null`.                           |
    | `MINIMIZE_APP`          | `none`                                         | Moves `activeOverlayApp` to `minimizedApps` array.           |
    | `RESTORE_APP`           | `{ appId: string, trigger: HTMLButtonElement }`| Same as `LAUNCH_APP`.                                        |
    | `CLOSE_MINIMIZED_APP`   | `string`                                       | Removes an app ID from the `minimizedApps` array.            |

### 5.2. `NavigationContext`

Manages the state that determines what content is displayed in the main dashboard.

-   **State Schema:**
    | Key                    | Type     | Description                                | Initial Value     |
    | :--------------------- | :------- | :----------------------------------------- | :---------------- |
    | `activeRightSidebarItem` | `string` | ID of the active item in the right sidebar. | `'communication'` |
    | `activeHeaderItem`     | `string` | ID of the active item in the header nav.   | `'email'`         |
    | `activeLeftSubnavItem` | `string` | ID of the active item in the left subnav.  | `'inbox'`         |

-   **Reducer Actions:**
    | Action Type                   | Payload  | Description                                                  |
    | :---------------------------- | :------- | :----------------------------------------------------------- |
    | `SELECT_RIGHT_SIDEBAR_ITEM`   | `string` | Cascading update: sets right item, then derives and sets the first header and subnav items. |
    | `SELECT_HEADER_ITEM`          | `string` | Sets header item, then derives and sets the first subnav item. |
    | `SET_LEFT_SUBNAV_ITEM`        | `string` | Sets the active subnav item directly.                        |

---

## 6. User Flow Example: Changing Navigation

1.  **User Action:** Clicks "SCHOOL" (`id: 'school'`) in the right sidebar.
2.  **Event Handler:** `onClick` in `<SidebarRight />` calls `handleRightSidebarSelect('school')`.
3.  **Context Function:** The memoized `handleRightSidebarSelect` from `NavigationContext` calls `dispatch({ type: 'SELECT_RIGHT_SIDEBAR_ITEM', payload: 'school' })`.
4.  **Reducer Logic (`navigationReducer`):**
    -   Receives the action.
    -   Looks up `'school'` in `NAVIGATION_LOGIC`.
    -   Finds the first header item: `{ id: 'courses', label: 'Courses' }`.
    -   Finds the first subnav item for `'courses'`: `{ id: 'all-courses', label: 'ALL COURSES' }`.
    -   Returns a new state object:
        -   `activeRightSidebarItem: 'school'`
        -   `activeHeaderItem: 'courses'`
        -   `activeLeftSubnavItem: 'all-courses'`
5.  **Re-render:**
    -   The `NavigationProvider` provides the new state value.
    -   `<Header />` re-renders. Its `sectionTitle` prop becomes "SCHOOL". The nav buttons update to show "Courses" and "Students", with "Courses" selected.
    -   `<SubnavLeft />` re-renders, showing the "ALL COURSES" item as active.
    -   `<MainContent />` re-renders. Its view key becomes `'school_courses_all-courses'`. It looks this key up in `MAIN_CONTENT_CARDS` and displays the corresponding 12 course cards.

## 7. Accessibility (A11y) Deep Dive

-   **Semantic HTML:** Correct use of `<header>`, `<nav>`, `<main>`, `<aside>`, and `<button>`.
-   **Focus Management:**
    -   **Implementation:** `useEffect` hooks in `App.tsx` monitor `isLeftSidebarOpen` and `isRightSidebarOpen` on screens `>768px`.
    -   **Opening:** `firstFocusable.focus()` moves keyboard focus into the newly opened panel.
    -   **Closing:** `toggleButtonRef.current.focus()` returns focus to the control that closed the panel, maintaining context for the user.
-   **Screen Reader Announcements:**
    -   **Component:** A visually hidden (`sr-only`) `div` in `App.tsx` with `aria-live="polite"`.
    -   **Mechanism:** When state changes (e.g., `toggleLeftSidebar`), the reducer also updates the `announcement` string (e.g., "Left sidebar collapsed"). The `div` re-renders, and `aria-live` instructs screen readers to announce the change non-disruptively.
-   **ARIA Attributes:**
    -   `aria-controls`: Connects toggle buttons to the panels they control.
    -   `aria-expanded`: Indicates the state of collapsible elements.
    -   `aria-current="page"`: Marks the active navigation link.
    -   `aria-label`: Provides accessible names for icon-only buttons.
    -   `role="tab"`, `role="tablist"`, `aria-selected`: Correctly identifies tab-based navigation patterns.
    -   `role="dialog"`, `aria-modal="true"`: Ensures overlays are treated as modal dialogs, trapping focus.
```