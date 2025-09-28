import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  @Input() language = 'en';
  @Input() size: 'default' | 'small' | 'medium' = 'default';
  @Output() onBack = new EventEmitter<void>();

  get isRtl(): boolean {
    return this.language === 'ar';
  }
}
