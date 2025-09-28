# @aslaluroba/help-center

A powerful and customizable help center widget for Angular applications with real-time chat functionality, AI assistance, multi-language support, and user feedback collection.

## Installation

```bash
npm install @aslaluroba/help-center
```

## Setup and Configuration

1. Import and configure the widget in your app.module.ts:

```typescript
import { HelpCenterWidgetComponent, ApiService } from '@aslaluroba/help-center'

@NgModule({
  imports: [HelpCenterWidgetComponent],
  providers: [ApiService]
})
export class AppModule {}
```

2. Initialize and use the widget in your component:

```typescript
import { Component, OnInit } from '@angular/core'
import { ApiService, ApiConfig, Language } from '@aslaluroba/help-center'

@Component({
  selector: 'app-root',
  template: `
    <app-help-center-widget 
      [getToken]="getToken"
      [helpScreenId]="helpScreenId" 
      [currentLang]="currentLang" 
      [showArrow]="true"
      [primaryColor]="primaryColor"
      [logoUrl]="logoUrl">
    </app-help-center-widget>
  `
})
export class AppComponent implements OnInit {
  helpScreenId = 'your-help-screen-id' // Required: Your unique help screen ID
  currentLang: Language = 'en' // Default language
  primaryColor = '#ad49e1' // Optional: Custom primary color (default: purple)
  logoUrl = 'assets/logo.svg' // Optional: Custom logo URL (default: built-in logo)

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Initialize API with authentication
    const apiConfig: ApiConfig = {
      getToken: async () => {
        // Implement your token retrieval logic
        const response = await fetch('your-auth-endpoint')
        const data = await response.json()
        return data.token
      }
      // Optional: Override default API URL (default: 'https://babylai.net/api')
      // baseUrl: 'https://your-custom-api.com'
    }

    this.apiService.initialize(apiConfig)
  }

  getToken = async () => {
    // Your token retrieval implementation
    const response = await fetch('your-auth-endpoint')
    const data = await response.json()
    return data.token
  }
}
```

## User Feedback System

The widget includes a comprehensive user feedback system that collects ratings and comments after meaningful chat interactions:

### Review Dialog Features
- **Star Rating**: 1-5 star rating system with visual feedback
- **Comment Collection**: Text area for detailed feedback (10-500 characters)
- **Smart Display**: Only appears after meaningful chat interactions (not just welcome messages)
- **Validation**: Real-time validation with error messages
- **API Integration**: Automatically submits reviews to your backend
- **Multi-language**: Fully translated interface

### Review API Endpoint
Reviews are submitted to: `POST /Client/ClientChatSession/{sessionId}/review`

```typescript
// Review payload structure
{
  "rating": 5,           // 1-5 stars
  "comment": "Great help!" // 10-500 characters
}
```

### Review Dialog Behavior
- **Triggers**: Only after ending a chat with meaningful interaction
- **Skips**: If user just opens chat without interaction
- **Validation**: Client-side validation with real-time feedback
- **Submission**: Closes chat session first, then submits review
- **Error Handling**: Graceful handling of submission failures

## Smart Session Management

The widget includes intelligent chat session management to provide a seamless user experience:

### Confirmation Dialogs
- **End Chat Confirmation**: Prevents accidental loss of active conversations
- **Start New Chat Confirmation**: Warns users when switching between chat sessions
- **Smart Detection**: Distinguishes between welcome messages and meaningful interactions

### Session Persistence
- **Back Navigation**: Chat state maintained when navigating back to help screen
- **Return to Chat**: Users can return to their previous conversation
- **Duplicate Prevention**: Intelligent message handling prevents duplicate welcome messages

### Session States
- **Active Session**: User has meaningful interaction (not just welcome message)
- **Welcome Only**: User opened chat but didn't interact meaningfully
- **Clean State**: No previous session or messages

## Language Support

The widget supports multiple languages with built-in RTL support. Currently available languages:

- English (en) - Default
- Arabic (ar) - With RTL support

### Changing Languages

1. Simple language switch:

```typescript
import { Component } from '@angular/core'
import { Language } from '@aslaluroba/help-center'

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- Language Switcher -->
      <div class="language-buttons">
        <button (click)="currentLang = 'en'">English</button>
        <button (click)="currentLang = 'ar'">العربية</button>
      </div>

      <!-- Widget -->
      <app-help-center-widget 
        [getToken]="getToken"
        [helpScreenId]="helpScreenId" 
        [currentLang]="currentLang"
        [primaryColor]="primaryColor"
        [logoUrl]="logoUrl">
      </app-help-center-widget>
    </div>
  `
})
export class AppComponent {
  helpScreenId = 'your-help-screen-id'
  currentLang: Language = 'en'
  primaryColor = '#ad49e1'
  logoUrl = 'assets/logo.svg'

  getToken = async () => {
    // Your token implementation
    return 'your-token'
  }
}
```

2. Using Translation Service (for advanced usage):

```typescript
import { Component } from '@angular/core'
import { TranslationService, Language } from '@aslaluroba/help-center'

@Component({
  selector: 'app-root'
})
export class AppComponent {
  constructor(private translationService: TranslationService) {
    // Subscribe to language changes
    this.translationService.currentLang.subscribe((lang: Language) => {
      console.log('Current language:', lang)
    })

    // Change language
    this.translationService.setLanguage('ar')
  }
}
```

## Theming and Customization

The help center widget supports dynamic theming through two main properties:

### Primary Color

The `primaryColor` property allows you to customize the color scheme throughout the widget. The theming system automatically generates color variations based on your primary color.

```typescript
// Example usage
export class AppComponent {
  primaryColor = '#3b82f6' // Blue theme
  // or
  primaryColor = '#10b981' // Green theme
  // or
  primaryColor = '#ff6b35' // Orange theme
}
```

**Supported Color Formats:**
- Hex colors: `#3b82f6`, `#10b981`
- RGB: `rgb(59, 130, 246)`
- HSL: `hsl(217, 91%, 60%)`

**Auto-Generated Color Variations:**
The system automatically creates 10 color shades (100-950) based on your primary color for consistent theming across all components.

### Logo Customization

The `logoUrl` property allows you to display your custom logo in the help button.

```typescript
// Example usage
export class AppComponent {
  logoUrl = '/assets/my-logo.png' // Local asset
  // or
  logoUrl = 'https://example.com/logo.png' // External URL
  // or
  logoUrl = 'assets/logo.svg' // Default logo (fallback)
}
```

**Logo Requirements:**
- **Format**: PNG, JPG, SVG, or any web-compatible image format
- **Size**: Recommended 50x50px for optimal display
- **Fallback**: If the provided logo fails to load, it will fallback to the default logo

### Complete Theming Example

```typescript
import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  template: `
    <app-help-center-widget 
      [getToken]="getToken"
      [helpScreenId]="helpScreenId"
      [primaryColor]="primaryColor"
      [logoUrl]="logoUrl"
      [currentLang]="currentLang"
      [showArrow]="true">
    </app-help-center-widget>
  `
})
export class AppComponent {
  helpScreenId = 'your-help-screen-id'
  currentLang = 'en'
  primaryColor = '#3b82f6' // Blue theme
  logoUrl = '/assets/company-logo.png'

  getToken = async () => {
    // Your token implementation
    return 'your-token'
  }

  // Dynamic theme switching
  switchToGreenTheme() {
    this.primaryColor = '#10b981'
    this.logoUrl = '/assets/green-logo.png'
  }

  switchToPurpleTheme() {
    this.primaryColor = '#ad49e1'
    this.logoUrl = '/assets/purple-logo.png'
  }
}
```

## Features

- **Real-time Chat**: WebSocket-based messaging with Ably integration
- **AI Assistant**: Intelligent responses and conversation management
- **Multi-language Support**: English and Arabic with RTL support
- **User Feedback**: Review dialog for collecting ratings and comments
- **Smart Session Management**: Intelligent chat session handling with confirmation dialogs
- **Customizable Theming**: Dynamic color schemes and logo customization
- **Responsive Design**: Mobile-first approach with accessibility features
- **Duplicate Prevention**: Smart message handling to prevent duplicate content

## Props

| Prop                | Type     | Required | Default      | Description                                      |
| ------------------- | -------- | -------- | ------------ | ------------------------------------------------ |
| getToken            | function | Yes      | -            | Function that returns a Promise<string> for auth |
| helpScreenId        | string   | Yes      | -            | Unique help screen identifier                    |
| currentLang         | Language | No       | 'en'         | UI language ('en' \| 'ar')                       |
| showArrow           | boolean  | No       | true         | Show/hide floating arrow                         |
| messageLabel        | string   | No       | null         | Custom message for the help button               |
| isIntroScreenEnabled| boolean  | No       | false        | Enable/disable intro screen                      |
| primaryColor        | string   | No       | '#ad49e1'    | Primary color for theming (hex format)           |
| logoUrl             | string   | No       | '/logo.svg' | URL path to custom logo image                    |

## Quick Reference

### Basic Usage
```html
<app-help-center-widget 
  [getToken]="getToken"
  [helpScreenId]="helpScreenId">
</app-help-center-widget>
```

### With Custom Theme
```html
<app-help-center-widget 
  [getToken]="getToken"
  [helpScreenId]="helpScreenId"
  [primaryColor]="'#3b82f6'"
  [logoUrl]="'/my-logo.png'">
</app-help-center-widget>
```

### With All Options
```html
<app-help-center-widget 
  [getToken]="getToken"
  [helpScreenId]="helpScreenId"
  [currentLang]="'en'"
  [showArrow]="true"
  [messageLabel]="'Need help?'"
  [isIntroScreenEnabled]="true"
  [primaryColor]="'#3b82f6'"
  [logoUrl]="'/my-logo.png'">
</app-help-center-widget>
```

## Troubleshooting

### Common Issues

1. **Duplicate Welcome Messages**
   - **Fixed**: The widget now intelligently detects and prevents duplicate welcome messages
   - **Cause**: Previously occurred when starting new chat after going back
   - **Solution**: Smart session detection and proper session clearing

2. **Review Dialog Not Showing**
   - **Expected**: Review dialog only appears after meaningful chat interactions
   - **Not Showing**: If user only sees welcome message without interaction
   - **Solution**: This is intentional behavior to avoid unnecessary review prompts

3. **Chat Session Issues**
   - **Session Persistence**: Chat state is maintained when navigating back
   - **Confirmation Dialogs**: Prevent accidental loss of conversations
   - **Smart Detection**: System distinguishes between welcome messages and real interactions

4. **API Integration**
   - **Review Endpoint**: Ensure your backend supports `POST /Client/ClientChatSession/{id}/review`
   - **Token Authentication**: Verify `getToken` function returns valid JWT
   - **Error Handling**: Review submission failures are handled gracefully

## Support

For issues and feature requests, please visit our [GitHub repository](https://github.com/aslaluroba/help-center/issues).

## License

MIT License - see the [LICENSE](LICENSE) file for details.
