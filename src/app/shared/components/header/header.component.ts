import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackButtonComponent } from '../back-button';
import { CloseButtonComponent } from '../close-button';
import { SimpleCloseButtonComponent } from '../simple-close-button';
import { LogoComponent } from '../logo';

type HeaderType = 'standard' | 'minimal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent,
    CloseButtonComponent,
    SimpleCloseButtonComponent,
    LogoComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() headerType: HeaderType = 'standard';
  @Input() showBackButton = false;
  @Input() showLogo = true;
  @Input() language = 'en';
  @Input() showCloseButton = false;
  @Output() onBack = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  get isRtl(): boolean {
    return this.language === 'ar';
  }
}
