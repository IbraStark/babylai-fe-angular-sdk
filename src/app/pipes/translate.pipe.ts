// src/app/pipes/translate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core'
import { TranslationService } from '../services/translation.service'
import { TranslationKey } from '../services/translation.service' // Add this import

@Pipe({
  name: 'translate',
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(key: TranslationKey): string {
    return this.translationService.translate(key)
  }
}
