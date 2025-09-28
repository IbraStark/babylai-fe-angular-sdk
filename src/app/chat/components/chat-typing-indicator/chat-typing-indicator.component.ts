import { CardComponent, CardContentComponent } from './../../../shared/components/card/card.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component';

@Component({
  selector: 'app-chat-typing-indicator',
  standalone: true,
  imports: [CommonModule, CardComponent, CardContentComponent, ChatAvatarComponent],
  templateUrl: './chat-typing-indicator.component.html',
  styleUrls: ['./chat-typing-indicator.component.scss']
})
export class ChatTypingIndicatorComponent {}
