# Help Center Widget Components

This directory contains the smaller, more manageable components that make up the Help Center Widget. The main `HelpCenterWidgetComponent` has been refactored to use these smaller components for better maintainability and reusability.

## Component Structure

### ArrowAnimationComponent
- **Location**: `./arrow-animation/`
- **Purpose**: Displays the floating arrow animation with message
- **Inputs**: `showArrowAnimation`, `isPopupOpen`, `messageLabel`
- **Outputs**: `closeArrowAnimation`

### HelpButtonComponent
- **Location**: `./help-button/`
- **Purpose**: Renders the floating help button with BabylAI logo
- **Inputs**: None
- **Outputs**: `togglePopup`

### IntroSectionComponent
- **Location**: `./intro-section/`
- **Purpose**: Displays the intro screen with cards for BabylAI info and actions
- **Inputs**: `currentLang`
- **Outputs**: `showHelpScreenData`, `navigateToUrl`

### HelpPopupComponent
- **Location**: `./help-popup/`
- **Purpose**: Main container for all popup content including headers, loading states, error states, and main content
- **Inputs**: Multiple state properties for popup behavior
- **Outputs**: Various event handlers for popup interactions

### FooterComponent
- **Location**: `./footer/`
- **Purpose**: Displays the "Powered by BabylAI" footer
- **Inputs**: `showHelpScreenData`, `showChat`
- **Outputs**: None

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single responsibility
2. **Reusability**: Components can be reused in other parts of the application
3. **Maintainability**: Easier to maintain and debug individual components
4. **Testing**: Each component can be tested in isolation
5. **Performance**: Smaller components can be optimized individually

## Usage

All components are standalone and can be imported individually or through the index file:

```typescript
import { ArrowAnimationComponent } from './components/arrow-animation/arrow-animation.component';
// or
import { ArrowAnimationComponent } from './components';
```
