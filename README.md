# @aslaluroba/help-center

A powerful and customizable help center widget for Angular applications with real-time chat functionality, AI assistance, and multi-language support.

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
    <app-help-center-widget [helpScreenId]="helpScreenId" [currentLang]="currentLang" [showArrow]="true"> </app-help-center-widget>
  `
})
export class AppComponent implements OnInit {
  helpScreenId = 'your-help-screen-id' // Required: Your unique help screen ID
  currentLang: Language = 'en' // Default language

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
}
```

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
      <app-help-center-widget [helpScreenId]="helpScreenId" [currentLang]="currentLang"> </app-help-center-widget>
    </div>
  `
})
export class AppComponent {
  helpScreenId = 'your-help-screen-id'
  currentLang: Language = 'en'
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

## Props

| Prop         | Type     | Required | Default | Description                   |
| ------------ | -------- | -------- | ------- | ----------------------------- |
| helpScreenId | string   | Yes      | -       | Unique help screen identifier |
| currentLang  | Language | No       | 'en'    | UI language ('en' \| 'ar')    |
| showArrow    | boolean  | No       | true    | Show/hide floating arrow      |

## Support

For issues and feature requests, please visit our [GitHub repository](https://github.com/aslaluroba/help-center/issues).

## License

MIT License - see the [LICENSE](LICENSE) file for details.
