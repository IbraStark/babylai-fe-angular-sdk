import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HelpCenterWidgetComponent } from './help-center-widget/help-center-widget.component'
import { TokenService } from './services/token.service'
import { LanguageService } from './language.service'
import { Language } from './types'
import { TranslationService } from './services/translation.service'
import { Subscription } from 'rxjs'
import { ApiService } from './services/api.service'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HelpCenterWidgetComponent],
  template: `
    <div class="container">
      <div class="language-switcher">
        <button [class.active]="currentLang === 'en'" (click)="switchLanguage('en')" class="lang-btn">English</button>
        <button [class.active]="currentLang === 'ar'" (click)="switchLanguage('ar')" class="lang-btn">العربية</button>
      </div>

      <app-help-center-widget
        [getToken]="getToken"
        [helpScreenId]="helpScreenId"
        [showArrow]="true"
        [messageLabel]="'Need help? Click here!'"
        [currentLang]="currentLang"
        [isIntroScreenEnabled]="isIntroScreenEnabled"
      >
      </app-help-center-widget>
    </div>
  `,
  styles: [
    `
      .container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
      }

      .language-switcher {
        margin-bottom: 20px;
        display: flex;
        gap: 10px;
      }

      .lang-btn {
        padding: 8px 16px;
        border: 2px solid #ad49e1;
        border-radius: 8px;
        background: transparent;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s ease;
      }

      .lang-btn:hover {
        background: #ad49e1;
        color: white;
      }

      .lang-btn.active {
        background: #ad49e1;
        color: white;
      }

      app-help-center-widget {
        width: 100%;
        max-width: 800px;
        height: 600px;
      }
    `
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-help-center'
  currentLang: string = 'en'
  private langSubscription?: Subscription

  config = {
    getToken: this.customTokenImplementation
  }

  constructor(
    private tokenService: TokenService,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private apiService: ApiService
  ) {
    // Example: Set up a custom token function that uses the default implementation
    // this.setupCustomTokenFunction()
    this.currentLang = this.languageService.getCurrentLang()
    this.apiService.initialize(this.config)
  }

  async customTokenImplementation(): Promise<string> {
    try {
      const response = await fetch(`https://babylai.net/api/Auth/client/get-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenantId: '2176c188-8cb4-4fc3-8366-2d32e601f7e5',
          apiKey: 'I/22UK34I6xAhglfPXTwPAgUuVyJw8TdnG26ZLI5gYQ='
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch token')
      }

      const data = await response.json()
      return data.token
    } catch (error) {
      console.error('Custom token implementation failed:', error)
      throw new Error('Failed to get authentication token')
    }
  }

  // private setupCustomTokenFunction() {
  //   // Register our custom token function with the config service
  //   this.configService.setGetTokenFn(async () => {
  //     console.log('Using custom token implementation')
  //     return this.customTokenImplementation()
  //   })
  // }

  ngOnInit() {
    // Subscribe to language changes
    this.langSubscription = this.translationService.currentLang.subscribe((lang) => {
      this.currentLang = lang
    })
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe()
    }
  }

  switchLanguage(language: Language) {
    this.languageService.switchLanguage(language)
  }

  getToken = async () => {
    const tokenResponse = await this.tokenService.getToken()
    return tokenResponse.token
  }

  helpScreenId = '4b6dcbb4-5c9e-4559-9d31-2f9d755d8a94'
  isIntroScreenEnabled = false
}
