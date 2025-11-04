# Design System Documentation

## Overview

This document describes the elegant monochrome design system implemented across the Studio application. The design follows principles of minimalism, clarity, and sophistication with frosted glass effects and thin, crisp borders.

## Design Principles

1. **Monochrome Palette**: Grayscale colors for a clean, professional look
2. **Thin Materials**: Lightweight feel with thin borders (0.5px) and subtle shadows
3. **Frosted Glass**: Backdrop blur effects for depth and modern aesthetic
4. **Crisp Borders**: Visible, sharp borders around all active elements for modern definition
5. **Consistency**: Unified design language across all components
6. **Accessibility**: Clear focus states and sufficient contrast

## Design Tokens

### Colors

#### Light Mode
- **Background**: `hsl(0 0% 100%)` - Pure white
- **Foreground**: `hsl(0 0% 9%)` - Near black
- **Card**: `hsl(0 0% 100% / 0.6)` - Transparent white for frosted glass
- **Card Foreground**: `hsl(0 0% 9%)` - Near black
- **Popover**: `hsl(0 0% 100% / 0.9)` - Light with transparency
- **Border**: `hsl(0 0% 85% / 0.8)` - Thin, crisp, visible borders
- **Muted**: `hsl(0 0% 96%)` - Very light gray
- **Accent**: `hsl(0 0% 96% / 0.5)` - Subtle highlight

#### Dark Mode
- **Background**: `hsl(0 0% 7%)` - Near black
- **Foreground**: `hsl(0 0% 98%)` - Near white
- **Card**: `hsl(0 0% 10% / 0.6)` - Transparent dark for frosted glass
- **Card Foreground**: `hsl(0 0% 98%)` - Near white
- **Popover**: `hsl(0 0% 10% / 0.9)` - Dark with transparency
- **Border**: `hsl(0 0% 25% / 0.8)` - Thin, crisp, visible borders
- **Muted**: `hsl(0 0% 14%)` - Dark gray
- **Accent**: `hsl(0 0% 14% / 0.5)` - Subtle highlight

### Spacing
- Compact spacing with 4px base unit
- Card padding: `p-4` (16px)
- Input padding: `px-3 py-2` (12px × 8px)
- Button padding: `px-4 py-2` (16px × 8px)

### Typography
- **Card Title**: `text-lg font-medium` (18px, 500 weight)
- **Card Description**: `text-xs text-muted-foreground/80` (12px)
- **Body Text**: `text-sm` (14px)
- **Label**: `text-xs font-medium` (12px, 500 weight)
- **Badge**: `text-[10px] font-medium` (10px, 500 weight)

### Border Radius
- **Large Components**: `rounded-xl` (12px) - Cards, Dialogs, Buttons
- **Medium Components**: `rounded-lg` (8px) - Select Items
- **Small Components**: `rounded-full` - Badges, Icon Buttons

### Shadows
- **Subtle**: `shadow-xs` - Base elevation
- **Glass**: `shadow-glass`, `shadow-glass-lg` - For frosted glass elements
- Light mode: `0 1px 3px 0 rgb(0 0 0 / 0.03)`
- Dark mode: `0 1px 3px 0 rgb(0 0 0 / 0.1)`

## Utility Classes

### Frosted Glass Effects
```css
.glass {
  background-color: var(--card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.glass-strong {
  background-color: var(--popover);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

### Borders
```css
.border-thin {
  border-width: 0.5px;
}
```

### Transitions
```css
.transition-glass {
  transition: background-color 0.2s, border-color 0.2s, backdrop-filter 0.2s;
}
```

## Component Specifications

### Button
- **Default**: `bg-foreground text-background border-thin border-foreground` with `shadow-xs`
- **Outline**: `border-thin border-border glass` with hover to `border-foreground/50`
- **Secondary**: `glass border-thin border-border` with hover to `border-foreground/40`
- **Ghost**: `border-thin border-transparent` with glass effect on hover
- **Sizes**: Small (h-8), Default (h-9), Large (h-10)
- **Border Radius**: `rounded-xl` for default/large, `rounded-lg` for small
- **Focus**: Thin ring with `ring-1 ring-ring`

### Input & Textarea
- **Base**: `glass` background with `border-thin border-border`
- **Height**: `h-9` for inputs
- **Border Radius**: `rounded-xl`
- **Placeholder**: `text-muted-foreground/60`
- **Focus**: `ring-1 ring-ring` with `border-foreground/60` - crisp, visible border
- **Disabled**: `opacity-40`

### Card
- **Base**: `glass border-thin border-border shadow-xs` - crisp visible borders
- **Border Radius**: `rounded-xl`
- **Padding**: Header/Content/Footer all use `p-4`
- **Title**: `text-lg font-medium`
- **Description**: `text-xs text-muted-foreground/80`

### Badge
- **Default**: `bg-foreground text-background` with `shadow-xs`
- **Secondary**: `glass-strong border-border/50`
- **Outline**: `glass border-border/50`
- **Border Radius**: `rounded-full`
- **Text**: `text-[10px] font-medium`
- **Padding**: `px-2 py-0.5`

### Select
- **Trigger**: Similar to Input with `glass` and `border-thin`
- **Content**: `glass-strong shadow-glass-lg` with `rounded-xl`
- **Items**: `rounded-lg` with glass effect on focus
- **Separator**: `bg-border/30` with `h-px` height

### Dialog
- **Content**: `glass-strong border-thin shadow-glass-lg`
- **Border Radius**: `rounded-xl`
- **Overlay**: `bg-background/80` with `backdrop-blur-sm`

### Slider
- **Track**: `glass border-thin h-1.5`
- **Range**: `bg-foreground`
- **Thumb**: `bg-background border-thin border-foreground/20 shadow-xs`

### Switch
- **Base**: `glass-strong border-thin`
- **Checked**: `bg-foreground`
- **Thumb**: `bg-background border-thin shadow-xs`

## Studio-Specific Components

### Generation Panel
- Type selector buttons: `glass border-thin` with hover effects
- Model selector: Glass button with chevron icon
- Upload areas: `glass-strong border-thin border-dashed`
- Advanced settings card: `glass border-thin`

### Model Selector Dialog
- Dialog content: `glass-strong` with `shadow-glass-lg`
- Model buttons: Individual glass cards with hover effects
- Search input: Glass background matching form inputs

### Generation History
- History cards: `glass border-thin shadow-xs`
- Thumbnails: Small (20×20) with `border-thin`
- Status badges: `glass-strong` variant

### Asset Gallery
- Asset cards: `glass border-thin` with hover effects
- Overlay on hover: `bg-background/80` with `backdrop-blur-sm`
- Action buttons: Glass effect with thin borders

## Usage Guidelines

### Do's
✅ Use `rounded-xl` for main containers and interactive elements
✅ Apply `glass` or `glass-strong` for layered UI elements
✅ Use `border-thin` with `border-border` for crisp, visible borders on ALL active elements
✅ Apply `shadow-xs` for base elevation
✅ Use `transition-glass` for smooth state changes
✅ Maintain consistent spacing with the 4px grid
✅ Ensure borders are visible and sharp, not transparent or too subtle

### Don'ts
❌ Don't use thick borders (stick to `border-thin`)
❌ Don't use heavy shadows (use `shadow-xs` or `shadow-glass`)
❌ Don't mix different border radius values inconsistently
❌ Don't use opaque backgrounds where glass effects are intended
❌ Don't use bright colors (stick to monochrome palette)
❌ Don't use overly transparent borders (avoid `/50` alpha on borders - use full `border-border` for clarity)

## Accessibility

- All interactive elements have clear focus states with thin rings
- Disabled states use `opacity-40` for clear indication
- Text contrast meets WCAG AA standards
- Focus indicators are 1px thick but clearly visible
- Touch targets are minimum 36×36px (h-9 = 36px)

## Dark Mode Support

All components automatically adapt to dark mode using CSS variables. The design maintains the same visual hierarchy and clarity in both themes.

## Browser Support

- Modern browsers with backdrop-filter support
- Fallback: Glass effects degrade gracefully to semi-transparent backgrounds
- Safari: `-webkit-backdrop-filter` prefix included

## Performance

- Backdrop filters are applied sparingly to minimize GPU usage
- Transitions use only transform and opacity where possible
- CSS variables enable instant theme switching
