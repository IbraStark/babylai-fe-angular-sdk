import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { LanguageService } from './language.service'
import { TranslationService } from './services/translation.service'

// Conditional import for ngx-markdown
let provideMarkdown: any;
try {
  // Use dynamic import for better compatibility
  const ngxMarkdown = eval('require')('ngx-markdown');
  provideMarkdown = ngxMarkdown.provideMarkdown;
} catch (e) {
  console.warn('ngx-markdown not available, markdown rendering will be disabled');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    ...(provideMarkdown ? [provideMarkdown()] : []),
    LanguageService,
    TranslationService
  ]
}
