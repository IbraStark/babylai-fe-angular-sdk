import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackButtonComponent } from '../back-button';
import { MenuDropdownComponent } from '../menu-dropdown';
import { LogoComponent } from '../logo';

@Component({
  selector: 'app-chat-header',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonComponent,
    MenuDropdownComponent,
    LogoComponent,
  ],
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
})
export class ChatHeaderComponent {
  @Input() showBackButton = false;
  @Input() showLogo = true;
  @Input() language = 'en';
  @Output() onBack = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();
}
