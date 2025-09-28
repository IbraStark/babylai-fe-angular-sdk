import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-button',
  templateUrl: './help-button.component.html',
  styleUrls: ['./help-button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class HelpButtonComponent {
  @Output() togglePopup = new EventEmitter<void>();

  handleTogglePopup() {
    this.togglePopup.emit();
  }
}
