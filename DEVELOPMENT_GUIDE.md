# BabylAI Help Center Angular SDK - Development Guide

## Overview

This is an Angular 20+ library that provides a help center widget with real-time chat capabilities, multi-language support (English/Arabic), and AI assistant integration. The library is built as a standalone Angular library using modern Angular features and is designed to be easily integrated into any Angular application.

## Project Structure

```
src/
├── app/
│   ├── components/           # Main application components
│   │   ├── help-center-widget/    # Main widget component
│   │   ├── chat/                  # Chat interface component
│   │   └── help-screen-data/      # Help screen data display
│   ├── shared/               # Reusable shared components
│   │   └── components/
│   │       ├── button/            # Button component variants
│   │       ├── card/              # Card component system
│   │       ├── header/            # Header components
│   │       ├── loading/           # Loading indicators
│   │       └── markdown-renderer/ # Markdown content renderer
│   ├── services/             # Core services
│   │   ├── api.service.ts         # HTTP API communication
│   │   ├── ably.service.ts        # Real-time messaging
│   │   ├── token.service.ts       # Authentication tokens
│   │   ├── translation.service.ts # i18n translations
│   │   └── help-center-config.service.ts # Configuration
│   ├── pipes/                # Custom pipes
│   │   └── translate.pipe.ts      # Translation pipe
│   ├── types/                # TypeScript type definitions
│   └── scss/                 # SCSS variables and utilities
```

## Key Technologies

- **Angular 20+** - Modern Angular with standalone components
- **TypeScript 5.9** - Strict type checking enabled
- **SCSS** - Advanced styling with variables and mixins
- **Ably** - Real-time messaging and WebSocket communication
- **Marked** - Markdown parsing and rendering
- **Prism.js** - Syntax highlighting for code blocks
- **RxJS** - Reactive programming patterns

## Architecture Patterns

### 1. Standalone Components
All components are standalone and can be imported individually:
```typescript
@Component({
  selector: 'app-help-center-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe, ...],
  // ...
})
```

### 2. Service-Based Architecture
- **ApiService**: Centralized HTTP communication with token management
- **ClientAblyService**: Real-time messaging using Ably
- **TranslationService**: i18n support with reactive language switching
- **TokenService**: Authentication token management

### 3. Component Composition
- Main widget (`HelpCenterWidgetComponent`) orchestrates the entire experience
- Modular sub-components for specific functionality
- Shared component library for consistent UI

## Development Setup

### Prerequisites
- Node.js 18+ 
- Angular CLI 20+
- Yarn package manager

### Installation
```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Build library
yarn build:lib

# Run tests
yarn test
```

### Development Commands
```bash
# Development server with hot reload
yarn start

# Watch mode for library building
yarn watch

# Clean build artifacts
yarn clean

# Version management
yarn version:patch|minor|major

# Publishing
yarn publish:patch|minor|major
```

## Component Architecture

### Main Widget Component
The `HelpCenterWidgetComponent` is the primary entry point:

```typescript
@Component({
  selector: 'app-help-center-widget',
  inputs: [
    'getToken',           // Required: Token function
    'helpScreenId',       // Required: Help screen ID
    'showArrow',          // Optional: Show floating arrow
    'messageLabel',       // Optional: Custom message label
    'currentLang',        // Optional: Language setting
    'isIntroScreenEnabled' // Optional: Enable intro screen
  ]
})
```

### Key Features
- **Real-time Chat**: WebSocket-based messaging via Ably
- **Multi-language**: English/Arabic with RTL support
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and keyboard navigation
- **Customizable**: Extensive theming and configuration options

## Styling System

### SCSS Architecture
- **Variables**: Centralized in `src/scss/_variables.scss`
- **Component Styles**: Co-located with components
- **Global Styles**: `src/styles.scss` with CSS reset and base styles

### Design System
```scss
// Color System
$primary-colors: (
  'default': #ad49e1,
  'foreground': #ffffff,
  // ... more shades
);

// Spacing System
$spacing: (
  "1": 0.25rem,
  "2": 0.5rem,
  // ... consistent spacing scale
);

// Typography
$font-family-base: 'Cairo', sans-serif;
```

### Component Styling Patterns
- BEM methodology for CSS classes
- SCSS functions for accessing design tokens
- RTL support with direction-aware styles
- Responsive breakpoints

## API Integration

### Configuration
```typescript
const config = {
  getToken: async () => {
    // Your token implementation
    return 'your-jwt-token';
  },
  baseUrl: 'https://your-api.com/api'
};

// Initialize API service
apiService.initialize(config);
```

### Authentication Flow
1. Token retrieval via provided `getToken` function
2. Automatic token refresh (15-minute expiry)
3. Retry logic for expired tokens
4. Local storage caching

### Real-time Messaging
- Ably WebSocket connection
- Session-based room management
- Message type handling (user/assistant/agent)
- Connection state management

## Internationalization (i18n)

### Language Support
- **English (en)**: Default language
- **Arabic (ar)**: RTL support with proper text direction

### Translation System
```typescript
// Service-based translations
translationService.translate('ChatNow') // Returns localized string

// Pipe usage in templates
{{ 'ChatNow' | translate }}
```

### Adding New Languages
1. Add language to `Language` type
2. Add translations to `TranslationService`
3. Update RTL logic in components

## State Management

### Component State
- Local component state for UI interactions
- Reactive state updates using RxJS
- Proper cleanup in `ngOnDestroy`

### Service State
- Singleton services for global state
- BehaviorSubject for reactive updates
- Memory leak prevention with proper unsubscription

## Error Handling

### API Errors
- Centralized error handling in `ApiService`
- User-friendly error messages
- Retry mechanisms for transient failures

### Real-time Errors
- Connection state monitoring
- Graceful degradation when offline
- User notification for connection issues

## Testing Strategy

### Unit Tests
- Component testing with Angular Testing Utilities
- Service testing with dependency injection
- Pipe testing for translation functionality

### Integration Tests
- API service integration
- Real-time messaging flow
- Cross-component communication

## Performance Considerations

### Bundle Optimization
- Tree-shaking for unused code
- Lazy loading of heavy dependencies
- Minimal bundle size for library distribution

### Runtime Performance
- OnPush change detection strategy
- Efficient DOM updates
- Memory leak prevention

## Build and Deployment

### Library Build
```bash
# Production build
yarn build:lib

# Output: dist/help-center/
# - FESM2022 modules
# - TypeScript declarations
# - Package metadata
```

### Publishing
```bash
# Automated versioning and publishing
yarn publish:patch  # 3.0.4 -> 3.0.5
yarn publish:minor  # 3.0.4 -> 3.1.0
yarn publish:major  # 3.0.4 -> 4.0.0
```

## Integration Guide

### Basic Integration
```typescript
// app.component.ts
import { HelpCenterWidgetComponent } from '@aslaluroba/help-center';

@Component({
  template: `
    <app-help-center-widget
      [getToken]="getToken"
      [helpScreenId]="'your-help-screen-id'"
      [currentLang]="'en'"
      [showArrow]="true">
    </app-help-center-widget>
  `
})
export class AppComponent {
  getToken = async () => {
    // Your token implementation
    return 'your-jwt-token';
  };
}
```

### Advanced Configuration
```typescript
// Custom styling and behavior
<app-help-center-widget
  [getToken]="getToken"
  [helpScreenId]="helpScreenId"
  [currentLang]="currentLanguage"
  [showArrow]="true"
  [messageLabel]="'Need help? Click here!'"
  [isIntroScreenEnabled]="false">
</app-help-center-widget>
```

## Troubleshooting

### Common Issues

1. **Token Authentication Errors**
   - Verify `getToken` function returns valid JWT
   - Check token expiry and refresh logic
   - Ensure proper API base URL configuration

2. **Real-time Connection Issues**
   - Verify Ably token validity
   - Check network connectivity
   - Monitor connection state in browser dev tools

3. **Styling Issues**
   - Ensure SCSS variables are properly imported
   - Check for CSS specificity conflicts
   - Verify RTL support for Arabic language

4. **Build Issues**
   - Clear node_modules and reinstall
   - Check TypeScript version compatibility
   - Verify Angular CLI version

### Debug Mode
Enable debug logging by setting:
```typescript
// In your app configuration
console.log('Debug mode enabled');
```

## Contributing

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write comprehensive tests

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit PR with detailed description

### Release Process
1. Update version in `package.json`
2. Update changelog
3. Run full test suite
4. Build and publish library
5. Create GitHub release

## Support

- **Documentation**: This development guide
- **Issues**: GitHub Issues for bug reports
- **Discussions**: GitHub Discussions for questions
- **Email**: Contact the development team

---

*This development guide is maintained alongside the codebase and should be updated with any architectural changes or new features.*
