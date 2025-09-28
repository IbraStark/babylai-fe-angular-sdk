# Theming Guide for Help Center Widget

This guide explains how to use the dynamic theming feature for the `app-help-center-widget` component.

## Overview

The Help Center Widget now supports dynamic theming through two main inputs:
- `primaryColor`: Controls the primary color scheme throughout the widget
- `logoUrl`: Controls the logo displayed in the help button

## Usage

### Basic Usage

```html
<app-help-center-widget
  [getToken]="getToken"
  [helpScreenId]="helpScreenId"
  [primaryColor]="'#3b82f6'"
  [logoUrl]="'/path/to/your/logo.png'"
  [showArrow]="true"
  [messageLabel]="'Need help? Click here!'"
  [currentLang]="currentLang"
  [isIntroScreenEnabled]="isIntroScreenEnabled">
</app-help-center-widget>
```

### Dynamic Theming

You can change the theme dynamically by updating the input values:

```typescript
export class YourComponent {
  primaryColor = '#ad49e1'; // Default purple
  logoUrl = 'assets/logo.svg';   // Default logo

  changeTheme(color: string, logo: string) {
    this.primaryColor = color;
    this.logoUrl = logo;
  }
}
```

## Supported Colors

The theming system automatically generates color variations based on your primary color:

- **100**: Lightest shade (90% lightness)
- **200**: Light shade (80% lightness)
- **300**: Medium-light shade (70% lightness)
- **400**: Medium shade (60% lightness)
- **500**: Base color (your input)
- **600**: Medium-dark shade (40% lightness)
- **700**: Dark shade (30% lightness)
- **800**: Darker shade (20% lightness)
- **900**: Darkest shade (10% lightness)
- **950**: Very dark shade (5% lightness)

## Logo Requirements

- **Format**: PNG, JPG, SVG, or any web-compatible image format
- **Size**: Recommended 50x50px for optimal display
- **Fallback**: If the provided logo fails to load, it will fallback to the default logo

## Examples

### Blue Theme
```html
<app-help-center-widget
  [primaryColor]="'#3b82f6'"
  [logoUrl]="'/logos/blue-logo.png'"
  ...>
</app-help-center-widget>
```

### Green Theme
```html
<app-help-center-widget
  [primaryColor]="'#10b981'"
  [logoUrl]="'/logos/green-logo.png'"
  ...>
</app-help-center-widget>
```

### Custom Brand Colors
```html
<app-help-center-widget
  [primaryColor]="'#ff6b35'"
  [logoUrl]="'https://your-domain.com/brand-logo.png'"
  ...>
</app-help-center-widget>
```

## Technical Details

The theming system works by:

1. **CSS Custom Properties**: The primary color is converted to CSS custom properties (`--babylai-primary-color`, `--babylai-primary-color-100`, etc.)
2. **SCSS Variables**: The existing SCSS variables are updated to use these custom properties with fallbacks
3. **Automatic Updates**: When inputs change, the theme service automatically updates the CSS custom properties
4. **Component Integration**: All child components automatically pick up the new theme colors

## Browser Support

This theming system uses CSS custom properties (CSS variables) which are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 16+

For older browsers, the fallback colors defined in the SCSS variables will be used.
