// src/app/services/translation.service.ts
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { Language } from '../types'

const defaultTranslations = {
  ChatIntroMessage: '',
  BabylaiTitle: '',
  BabylaiDescription: '',
  ChatNow: '',
  TryBableAI: '',
  ContactUs: '',
  PickTopicTitle: '',
  BabylAI: '',
  ChatPlaceholder: '',
  PoweredByBabylAI: '',
  EndChat: '',
  LeavingDialogTitle: '',
  LeavingDialogBody: '',
  Confirm: '',
  Cancel: '',
  title: ''
} as const

export type TranslationKey = keyof typeof defaultTranslations

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = {
    en: {
      ChatIntroMessage: 'Chat with BabylAI 🚀',
      BabylaiTitle: 'BabylAI',
      BabylaiDescription: "Hey there! 👋 I'm BabylAI, here to assist you.",
      ChatNow: 'Chat Now',
      TryBableAI: 'Try BabylAI for Free 🎉',
      ContactUs: "Contact us, Let's Talk! 💬",
      PickTopicTitle: 'Pick a Topic to Get Started',
      BabylAI: 'BabylAI',
      ChatPlaceholder: 'Type your message...',
      PoweredByBabylAI: 'Powered by BabylAI',
      EndChat: 'End Chat',
      LeavingDialogTitle: 'Leaving so soon? 👋',
      LeavingDialogBody: "Don't worry, you can come back anytime. We're always here if you need help or have questions.",
      Confirm: 'Confirm',
      Cancel: 'Cancel',
      title: 'Help Center'
    },
    ar: {
      ChatIntroMessage: 'دردش مع BabylAI 🚀',
      BabylaiTitle: 'BabylAI',
      BabylaiDescription: 'مرحبا! 👋 أنا BabylAI، هنا لتساعدك.',
      ChatNow: 'دردش الآن',
      TryBableAI: 'جرب BabylAI مجانا 🎉',
      ContactUs: 'تواصل معنا, دعنا نتحدث! 💬',
      PickTopicTitle: 'اختر موضوع للبدء',
      BabylAI: 'BabylAI',
      ChatPlaceholder: 'اكتب رسالتك...',
      PoweredByBabylAI: 'مدعوم من BabylAI',
      EndChat: 'إنهاء الدردشة',
      LeavingDialogTitle: 'هل تغادر بالفعل؟ 👋',
      LeavingDialogBody: 'لا تقلق، يمكنك العودة في أي وقت. نحن دائماً هنا إذا كنت بحاجة إلى مساعدة أو لديك أسئلة.',
      Confirm: 'تأكيد',
      Cancel: 'إلغاء',
      title: 'مركز المساعدة'
    }
  }

  private _currentLang = new BehaviorSubject<Language>('en')
  public readonly currentLang: Observable<Language> = this._currentLang.asObservable()

  constructor() {}

  translate(key: TranslationKey): string {
    const lang = this._currentLang.value as Language
    return this.translations[lang][key] || key
  }

  setLanguage(lang: Language) {
    this._currentLang.next(lang)
  }

  getCurrentLang(): Language {
    return this._currentLang.value
  }
}
