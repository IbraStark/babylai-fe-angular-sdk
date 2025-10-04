// src/app/services/translation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Language } from '../types';

export type TranslationKey =
  | 'ChatIntroMessage'
  | 'BabylaiTitle'
  | 'BabylaiDescription'
  | 'ChatNow'
  | 'TryBableAI'
  | 'ContactUs'
  | 'PickTopicTitle'
  | 'BabylAI'
  | 'ChatPlaceholder'
  | 'PoweredByBabylAI'
  | 'EndChat'
  | 'LeavingDialogTitle'
  | 'LeavingDialogBody'
  | 'StartNewChatDialogTitle'
  | 'StartNewChatDialogBody'
  | 'ReviewDialogTitle'
  | 'ReviewDialogDescription'
  | 'ReviewDialogRatingLabel'
  | 'ReviewDialogCommentLabel'
  | 'ReviewDialogCommentPlaceholder'
  | 'ReviewDialogSubmitButton'
  | 'ReviewDialogSkipButton'
  | 'Confirm'
  | 'Cancel'
  | 'RatingMustBeBetween1And5'
  | 'CommentMustBeAtLeast10Characters'
  | 'CommentMustNotExceed500Characters'
  | 'title';

@Injectable({
  providedIn: 'root',
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
      PickTopicTitle: 'Click "Chat Now" and Ask Your Question Get Started',
      BabylAI: 'BabylAI',
      ChatPlaceholder: 'Type your message...',
      PoweredByBabylAI: 'Powered by BabylAI © 2025',
      EndChat: 'End Chat',
      LeavingDialogTitle: 'Leaving so soon? 👋',
      LeavingDialogBody:
        "Don't worry, you can come back anytime. We're always here if you need help or have questions.",
      StartNewChatDialogTitle: 'End and Start New Chat',
      StartNewChatDialogBody:
        'Are you sure you want to end the current conversation and start a new one?',
      ReviewDialogTitle: 'Add your Review',
      ReviewDialogDescription:
        'We appreciate your feedback! Please take a moment to rate your experience and share your thoughts in the comment section below. Your review helps us improve our services and assists other users in making informed decisions. Thank you!',
      ReviewDialogRatingLabel: 'Rating:',
      ReviewDialogCommentLabel: 'Comment:',
      ReviewDialogCommentPlaceholder: 'Write your comment here...',
      ReviewDialogSubmitButton: 'Submit Review',
      ReviewDialogSkipButton: 'Skip',
      Confirm: 'Confirm',
      Cancel: 'Cancel',
      title: 'Help Center',
      RatingMustBeBetween1And5: 'Rating must be between 1 and 5.',
      CommentMustBeAtLeast10Characters:
        'Comment must be at least 10 characters.',
      CommentMustNotExceed500Characters:
        'Comment must not exceed 500 characters.',
    },
    ar: {
      ChatIntroMessage: 'دردش مع BabylAI 🚀',
      BabylaiTitle: 'BabylAI',
      BabylaiDescription: 'مرحبا! 👋 أنا BabylAI، هنا لتساعدك.',
      ChatNow: 'دردش الآن',
      TryBableAI: 'جرب BabylAI مجانا 🎉',
      ContactUs: 'تواصل معنا, دعنا نتحدث! 💬',
      PickTopicTitle: 'اضغط "دردش الآن" واطرح سؤالك للبدء',
      BabylAI: 'BabylAI',
      ChatPlaceholder: 'اكتب رسالتك...',
      PoweredByBabylAI: 'مدعوم من BabylAI © 2025',
      EndChat: 'إنهاء الدردشة',
      LeavingDialogTitle: 'هل تغادر بالفعل؟ 👋',
      LeavingDialogBody:
        'لا تقلق، يمكنك العودة في أي وقت. نحن دائماً هنا إذا كنت بحاجة إلى مساعدة أو لديك أسئلة.',
      StartNewChatDialogTitle: 'إنهاء وبدء دردشة جديدة',
      StartNewChatDialogBody:
        'هل أنت متأكد من أنك تريد إنهاء المحادثة الحالية وبدء محادثة جديدة؟',
      ReviewDialogTitle: 'أضف تقييمك',
      ReviewDialogDescription:
        'نقدر ملاحظاتك! يرجى قضاء لحظة لتقييم تجربتك ومشاركة أفكارك في قسم التعليقات أدناه. تقييمك يساعدنا في تحسين خدماتنا ويساعد المستخدمين الآخرين في اتخاذ قرارات مدروسة. شكراً لك!',
      ReviewDialogRatingLabel: 'التقييم:',
      ReviewDialogCommentLabel: 'التعليق:',
      ReviewDialogCommentPlaceholder: 'اكتب تعليقك هنا...',
      ReviewDialogSubmitButton: 'إرسال التقييم',
      ReviewDialogSkipButton: 'تخطي',
      Confirm: 'تأكيد',
      Cancel: 'إلغاء',
      title: 'مركز المساعدة',
      RatingMustBeBetween1And5: 'يجب أن يكون التقييم بين 1 و 5.',
      CommentMustBeAtLeast10Characters: 'يجب أن يكون التعليق بين 10 و 500 حرف.',
      CommentMustNotExceed500Characters:
        'يجب أن يكون التعليق بين 10 و 500 حرف.',
    },
  };

  private _currentLang = new BehaviorSubject<Language>('en');
  public readonly currentLang: Observable<Language> =
    this._currentLang.asObservable();

  constructor() {}

  translate(key: TranslationKey): string {
    const lang = this._currentLang.value as Language;
    return this.translations[lang][key] || key;
  }

  setLanguage(lang: Language) {
    this._currentLang.next(lang);
  }

  getCurrentLang(): Language {
    return this._currentLang.value;
  }
}
