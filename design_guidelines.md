# WeatherLite Design Guidelines

## Design Approach
**User-Specified Design**: The user has provided explicit design requirements focusing on minimalist aesthetics with a blue and white color scheme. These guidelines must be followed precisely.

## Core Design Principles
- Minimalist aesthetic
- Mobile-first responsive design
- Clean, uncluttered interface
- Ukrainian language throughout

## Color Scheme
**Primary Palette:**
- Blue tones (various shades for depth and hierarchy)
- White/off-white backgrounds
- Light blue accents for interactive elements
- Subtle gray for secondary text and borders

## Typography
**Hierarchy:**
- Large temperature display: Bold, prominent (48-64px equivalent)
- City name: Medium-large, semi-bold (24-32px)
- Section headers: Medium weight (18-20px)
- Detail text: Regular weight (14-16px)
- Forecast cards: Compact but readable (12-14px)

**Font Selection:**
- Use Google Fonts: Inter or Roboto for clean, modern readability
- Single font family throughout for consistency

## Layout System
**Spacing:**
- Use Tailwind units: 2, 4, 6, 8, 12, 16 for consistent rhythm
- Card padding: p-6 to p-8
- Section gaps: gap-6 to gap-8
- Generous whitespace between major sections

**Grid Structure:**
- Desktop: Sidebar (300px fixed) + Main content (flex-1)
- Tablet: Sidebar collapses to top or overlay
- Mobile: Full-width stacked layout

## Component Library

### Header
- Full-width container with search input, magnifying glass button, geolocation button
- Search input: rounded borders, subtle shadow, placeholder "Введіть місто..."
- Icons: Use Heroicons for magnifying glass and target icons
- Sticky position on scroll

### Current Weather Card
- Large centered card with generous padding (p-8)
- Rounded corners (rounded-xl to rounded-2xl)
- Soft box shadow (shadow-lg)
- Star button (top-right): outlined when not favorited, filled when favorited
- Weather icon: Large, centered (96-128px)
- Temperature: Extra large, bold typography
- Details grid: 3-column layout for "Feels like", "Wind", "Humidity"

### Forecast Section
- Horizontal scrollable row (overflow-x-auto on mobile)
- 5 cards: equal width, rounded corners, subtle shadows
- Each card: Day name (header), weather icon (centered), temp day/night (stacked)
- Card spacing: gap-4

### Favorites Sidebar
- Fixed width on desktop (280-300px)
- List of saved cities with remove buttons
- Each favorite item: city name + small X button (hover shows red)
- Subtle hover states on favorite items
- Default cities: Kyiv, Lviv

## Visual Treatments
**Shadows:**
- Cards: `shadow-md` to `shadow-lg`
- Buttons: `shadow-sm` with `hover:shadow-md`
- Sidebar: subtle `shadow-sm` for separation

**Borders:**
- All cards and inputs: rounded-lg to rounded-xl
- Consistent 1px borders where needed (border-gray-200)

**Interactive States:**
- Buttons: Subtle scale transform on hover (scale-105)
- Favorites: Highlight on hover with slight background change
- Search input: Focus ring in blue accent color

## Responsive Behavior
**Breakpoints:**
- Mobile: < 640px (single column, sidebar becomes collapsible)
- Tablet: 640px - 1024px (adjusted spacing, sidebar may overlay)
- Desktop: > 1024px (full sidebar + main content side-by-side)

**Mobile Optimizations:**
- Forecast cards: horizontal scroll with snap points
- Sidebar: collapsible drawer or top section
- Touch-friendly button sizes (min 44x44px)
- Stacked layout for current weather details

## Icons
**Library:** Heroicons (via CDN)
- Magnifying glass: search functionality
- Target: geolocation button
- Star: favorites (outline/solid variants)
- X-mark: remove from favorites
- Weather icons: Use simple, clean weather icon set or Unicode symbols (☀️ 🌤️ ⛅ 🌧️)

## Images
**No hero images required** - This is a utility-focused dashboard. Focus on clean data presentation and weather iconography.

## Accessibility
- Proper ARIA labels for all interactive elements in Ukrainian
- Sufficient color contrast (WCAG AA minimum)
- Keyboard navigation support
- Focus indicators on all interactive elements

## Ukrainian Language Elements
All text must be in Ukrainian:
- "Введіть місто..." (search placeholder)
- "Відчувається як" (feels like)
- "Вітер" (wind)
- "Вологість" (humidity)
- Day names: "Понеділок", "Вівторок", etc.