import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonComponent } from '../button';

@Component({
  selector: 'app-simple-close-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './simple-close-button.component.html',
  styleUrls: ['./simple-close-button.component.scss']
})
export class SimpleCloseButtonComponent {
  @Output() onClose = new EventEmitter<void>();
}
