import { CommonModule } from '@angular/common'
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core'
import { ButtonComponent } from '../button'
import { TranslatePipe } from '../../../pipes/translate.pipe'

type HeaderType = 'standard' | 'minimal'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="header">
      <app-button
        *ngIf="showBackButton"
        variant="icon-bg"
        className="button--white-bg"
        [direction]="isRtl ? 'rtl' : 'ltr'"
        (click)="onBack.emit()"
      >
        <svg
          [style.transform]="isRtl ? 'rotate(180deg)' : 'rotate(0deg)'"
          class="header__back-button-icon"
          width="8"
          height="16"
          viewBox="0 0 8 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 15L1 8L2.5 6.25M7 1L5 3.333" stroke="#7A1CAC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </app-button>
      <app-button
        *ngIf="showCloseButton"
        variant="icon-bg"
        [direction]="isRtl ? 'rtl' : 'ltr'"
        className="button--close-button"
        (click)="onClose.emit()"
      >
        <svg width="40" height="40" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.8568 21.1458L21.1484 33.8541M21.1484 21.1458L33.8568 33.8541M14.7943 5.48404C18.6562 3.24921 23.0407 2.07593 27.5026 2.08329C41.5402 2.08329 52.9193 13.4623 52.9193 27.5C52.9193 41.5376 41.5402 52.9166 27.5026 52.9166C13.465 52.9166 2.08594 41.5376 2.08594 27.5C2.08594 22.8716 3.32373 18.5279 5.48669 14.7916"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </app-button>
      <svg *ngIf="showLogo" class="header__logo" viewBox="0 0 55 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.53125 19.1353C8.53125 12.2804 14.0883 6.72339 20.9432 6.72339H41.6298C48.4847 6.72339 54.0418 12.2804 54.0418 19.1353V52.2339H20.9432C14.0883 52.2339 8.53125 46.6769 8.53125 39.8219V19.1353Z"
          fill="#E5E5E5"
        />
        <path
          d="M0 12.412C0 5.55702 5.55702 0 12.412 0H33.0985C39.9535 0 45.5105 5.55702 45.5105 12.412V33.0985C45.5105 39.9535 39.9535 45.5105 33.0985 45.5105H0V12.412Z"
          fill="white"
        />
        <path
          d="M14.3684 15.2203C14.3696 15.2162 14.3701 15.2142 14.3704 15.2132C14.5505 14.5816 15.4457 14.5816 15.6258 15.2132C15.6261 15.2142 15.6267 15.2162 15.6278 15.2203C15.6309 15.2311 15.6324 15.2365 15.6338 15.2416C16.4708 18.1971 18.7808 20.5071 21.7364 21.3441C21.7414 21.3455 21.7468 21.3471 21.7576 21.3501C21.7617 21.3512 21.7637 21.3518 21.7647 21.3521C22.3963 21.5322 22.3963 22.4274 21.7647 22.6075C21.7637 22.6078 21.7617 22.6084 21.7576 22.6095C21.7468 22.6126 21.7414 22.6141 21.7364 22.6155C18.7808 23.4525 16.4708 25.7625 15.6338 28.7181C15.6324 28.7231 15.6309 28.7285 15.6278 28.7393C15.6267 28.7434 15.6261 28.7454 15.6258 28.7464C15.4457 29.378 14.5505 29.378 14.3704 28.7464C14.3701 28.7454 14.3696 28.7434 14.3684 28.7393C14.3654 28.7285 14.3638 28.7231 14.3624 28.7181C13.5254 25.7625 11.2154 23.4525 8.25988 22.6155C8.25481 22.6141 8.24942 22.6126 8.23864 22.6095C8.23454 22.6084 8.2325 22.6078 8.23155 22.6075C7.5999 22.4274 7.5999 21.5322 8.23155 21.3521C8.2325 21.3518 8.23454 21.3512 8.23864 21.3501C8.24942 21.3471 8.25481 21.3455 8.25988 21.3441C11.2154 20.5071 13.5254 18.1971 14.3624 15.2416C14.3638 15.2365 14.3654 15.2311 14.3684 15.2203Z"
          fill="#AD49E1"
        />
        <path
          d="M36.7198 21.8503C36.7198 24.9207 34.2886 27.4098 31.2896 27.4098C28.2906 27.4098 25.8594 24.9207 25.8594 21.8503C25.8594 18.7799 28.2906 16.2908 31.2896 16.2908C34.2886 16.2908 36.7198 18.7799 36.7198 21.8503Z"
          fill="#AD49E1"
        />
      </svg>

      <app-button *ngIf="!showBackButton && !showCloseButton" variant="icon-only" class="header__close-button" (click)="onClose.emit()">
        <svg width="40" height="40" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.8568 21.1458L21.1484 33.8541M21.1484 21.1458L33.8568 33.8541M14.7943 5.48404C18.6562 3.24921 23.0407 2.07593 27.5026 2.08329C41.5402 2.08329 52.9193 13.4623 52.9193 27.5C52.9193 41.5376 41.5402 52.9166 27.5026 52.9166C13.465 52.9166 2.08594 41.5376 2.08594 27.5C2.08594 22.8716 3.32373 18.5279 5.48669 14.7916"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
          />
        </svg>
      </app-button>
    </div>
  `
})
export class HeaderComponent {
  @Input() headerType: HeaderType = 'standard'
  @Input() showBackButton = false
  @Input() showLogo = true
  @Input() logoSrc = '/logo-white.svg'
  @Input() logoAlt = 'BabylAI Logo'
  @Input() language = 'en'
  @Input() showCloseButton = false
  @Output() onBack = new EventEmitter<void>()
  @Output() onClose = new EventEmitter<void>()

  get isRtl(): boolean {
    return this.language === 'ar'
  }
}

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslatePipe],
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="chat-header">
      <div class="chat-header__actions">
        <app-button size="small" variant="icon-bg" className="chat-header__button button--light-bg" (click)="onBack.emit()">
          <svg
            width="8"
            height="16"
            viewBox="0 0 8 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            [style.transform]="isRtl ? 'rotate(180deg)' : 'rotate(0deg)'"
          >
            <path d="M7 15L1 8L2.5 6.25M7 1L5 3.333" stroke="#7A1CAC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </app-button>
        <div class="chat-header__menu" data-menu-container>
          <app-button
            size="small"
            variant="icon-bg"
            className="chat-header__button button--light-bg"
            (click)="$event.stopPropagation(); isMenuOpen = !isMenuOpen"
          >
            <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.25 1.8269C3.25 2.22473 3.09196 2.60626 2.81066 2.88756C2.52936 3.16887 2.14782 3.3269 1.75 3.3269C1.35218 3.3269 0.970644 3.16887 0.68934 2.88756C0.408035 2.60626 0.25 2.22473 0.25 1.8269C0.25 1.42908 0.408035 1.04755 0.68934 0.766244C0.970644 0.48494 1.35218 0.326904 1.75 0.326904C2.14782 0.326904 2.52936 0.48494 2.81066 0.766244C3.09196 1.04755 3.25 1.42908 3.25 1.8269ZM8.5 1.8269C8.5 2.22473 8.34196 2.60626 8.06066 2.88756C7.77936 3.16887 7.39782 3.3269 7 3.3269C6.60218 3.3269 6.22064 3.16887 5.93934 2.88756C5.65804 2.60626 5.5 2.22473 5.5 1.8269C5.5 1.42908 5.65804 1.04755 5.93934 0.766244C6.22064 0.48494 6.60218 0.326904 7 0.326904C7.39782 0.326904 7.77936 0.48494 8.06066 0.766244C8.34196 1.04755 8.5 1.42908 8.5 1.8269ZM13.75 1.8269C13.75 2.22473 13.592 2.60626 13.3107 2.88756C13.0294 3.16887 12.6478 3.3269 12.25 3.3269C11.8522 3.3269 11.4706 3.16887 11.1893 2.88756C10.908 2.60626 10.75 2.22473 10.75 1.8269C10.75 1.42908 10.908 1.04755 11.1893 0.766244C11.4706 0.48494 11.8522 0.326904 12.25 0.326904C12.6478 0.326904 13.0294 0.48494 13.3107 0.766244C13.592 1.04755 13.75 1.42908 13.75 1.8269Z"
                fill="#AD49E1"
              />
            </svg>
          </app-button>
          <div *ngIf="isMenuOpen" class="chat-header__menu-dropdown" [ngClass]="{ rtl: isRtl, ltr: !isRtl }">
            <div class="chat-header__menu-dropdown-content">
              <button (click)="onClose.emit(); isMenuOpen = false" class="chat-header__menu-button" [ngClass]="{ rtl: isRtl, ltr: !isRtl }">
                {{ 'EndChat' | translate }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-header__brand">
        <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.14844 13.794C6.14844 8.85255 10.1544 4.84668 15.0959 4.84668H30.0083C34.9499 4.84668 38.9558 8.85255 38.9558 13.794V37.6537H15.0959C10.1544 37.6537 6.14844 33.6478 6.14844 28.7063V13.794Z"
            fill="#ECECEC"
          />
          <path
            d="M0 8.94736C0 4.00587 4.00592 0 8.94746 0H23.8599C28.8014 0 32.8074 4.00587 32.8074 8.94736V23.8596C32.8074 28.8011 28.8014 32.807 23.8599 32.807H0V8.94736Z"
            fill="#AD49E1"
          />
          <path
            d="M10.3592 10.9721C10.36 10.9691 10.3604 10.9677 10.3606 10.967C10.4904 10.5117 11.1358 10.5117 11.2656 10.967C11.2658 10.9677 11.2662 10.9691 11.267 10.9721C11.2692 10.9799 11.2703 10.9838 11.2714 10.9874C11.8747 13.118 13.5399 14.7832 15.6705 15.3865C15.6742 15.3876 15.6781 15.3886 15.6858 15.3908C15.6888 15.3917 15.6903 15.3921 15.6909 15.3923C16.1463 15.5221 16.1463 16.1674 15.6909 16.2973C15.6903 16.2975 15.6888 16.2979 15.6858 16.2987C15.6781 16.3009 15.6742 16.302 15.6705 16.303C13.5399 16.9064 11.8747 18.5716 11.2714 20.7022C11.2703 20.7058 11.2692 20.7097 11.267 20.7175C11.2662 20.7204 11.2658 20.7219 11.2656 20.7226C11.1358 21.1779 10.4904 21.1779 10.3606 20.7226C10.3604 20.7219 10.36 20.7204 10.3592 20.7175C10.357 20.7097 10.3559 20.7058 10.3548 20.7022C9.75148 18.5716 8.08627 16.9064 5.95567 16.303C5.95202 16.302 5.94814 16.3009 5.94036 16.2987C5.93741 16.2979 5.93594 16.2975 5.93525 16.2973C5.47992 16.1674 5.47992 15.5221 5.93525 15.3923C5.93594 15.3921 5.93741 15.3917 5.94036 15.3908C5.94814 15.3886 5.95202 15.3876 5.95567 15.3865C8.08627 14.7832 9.75148 13.118 10.3548 10.9874C10.3559 10.9838 10.357 10.9799 10.3592 10.9721Z"
            fill="white"
          />
          <path
            d="M26.4618 15.7513C26.4618 17.9647 24.7093 19.759 22.5473 19.759C20.3854 19.759 18.6328 17.9647 18.6328 15.7513C18.6328 13.5379 20.3854 11.7437 22.5473 11.7437C24.7093 11.7437 26.4618 13.5379 26.4618 15.7513Z"
            fill="white"
          />
        </svg>

        <p>{{ 'BabylAI' | translate }}</p>
      </div>
    </div>
  `
})
export class ChatHeaderComponent {
  isMenuOpen = false
  @Input() showBackButton = false
  @Input() showLogo = true
  @Input() logoSrc = '/logo-white.svg'
  @Input() logoAlt = 'BabylAI Logo'
  @Input() language = 'en'
  @Output() onBack = new EventEmitter<void>()
  @Output() onClose = new EventEmitter<void>()

  get isRtl(): boolean {
    return this.language === 'ar'
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const menuContainer = target.closest('[data-menu-container]')
    if (!menuContainer && this.isMenuOpen) {
      this.isMenuOpen = false
    }
  }
}
