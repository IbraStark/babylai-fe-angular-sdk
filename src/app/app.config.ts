import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideHttpClient } from '@angular/common/http'
import { LanguageService } from './language.service'
import { TranslationService } from './services/translation.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    LanguageService,
    TranslationService
  ]
}
