import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-close-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss']
})
export class CloseButtonComponent {
  @Input() language = 'en';
  @Output() onClose = new EventEmitter<void>();

  get isRtl(): boolean {
    return this.language === 'ar';
  }
}
