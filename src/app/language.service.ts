// src/app/language.service.ts
import { Injectable } from '@angular/core'
import { TranslationService } from './services/translation.service'
import { Language } from './types'

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translationService: TranslationService) {}

  switchLanguage(language: Language) {
    this.translationService.setLanguage(language)
  }

  getCurrentLang(): Language {
    return this.translationService.getCurrentLang()
  }
}
