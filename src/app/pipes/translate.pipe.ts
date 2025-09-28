// src/app/pipes/translate.pipe.ts
import { Pipe, PipeTransform, inject } from '@angular/core'
import { TranslationService, TranslationKey } from '../services/translation.service'

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService) as TranslationService

  transform(key: TranslationKey): string {
    return this.translationService.translate(key)
  }
}
