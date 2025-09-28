import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterWidgetComponent } from './help-center-widget/help-center-widget.component';
import { TokenService } from './services/token.service';
import { LanguageService } from './language.service';
import { Language } from './types';
import { TranslationService } from './services/translation.service';
import { Subscription } from 'rxjs';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HelpCenterWidgetComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-help-center';
  currentLang: string = 'en';
  private langSubscription?: Subscription;
  baseUrl = 'https://babylai-be.dev.kvm.creativeadvtech.ml';
  config = {
    getToken: this.customTokenImplementation,
    baseUrl: this.baseUrl,
  };

  constructor(
    private tokenService: TokenService,
    private languageService: LanguageService,
    private translationService: TranslationService,
    private apiService: ApiService
  ) {
    this.currentLang = this.languageService.getCurrentLang();
    this.apiService.initialize(this.config);
  }

  async customTokenImplementation(): Promise<string> {
    try {
      const response = await fetch(
        'https://babylai-be.dev.kvm.creativeadvtech.ml/Auth/client/get-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tenantId: 'eda0a697-903f-4ffb-967e-6099c6573947',
            apiKey: 'nS3Ke6edd1p3qjpRW76w6WnPOkWwAdw+lX5PzsAb7s8=',
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('Custom token implementation failed:', error);
      throw new Error('Failed to get authentication token');
    }
  }

  ngOnInit() {
    // Subscribe to language changes
    this.langSubscription = this.translationService.currentLang.subscribe(
      (lang) => {
        this.currentLang = lang;
      }
    );
  }

  ngOnDestroy() {
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

  switchLanguage(language: Language) {
    this.languageService.switchLanguage(language);
  }

  getToken = async () => {
    const tokenResponse = await this.tokenService.getToken();
    return tokenResponse.token;
  };

  helpScreenId = '40c40c8f-e6f9-4135-9d13-9f6872ea8776';
  isIntroScreenEnabled = true;
  primaryColor = '#008080';
  logoUrl = '';
}
