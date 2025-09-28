import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-menu-dropdown',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslatePipe],
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent {
  isMenuOpen = false;
  @Input() language = 'en';
  @Output() onClose = new EventEmitter<void>();

  get isRtl(): boolean {
    return this.language === 'ar';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menuContainer = target.closest('[data-menu-container]');
    if (!menuContainer && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
