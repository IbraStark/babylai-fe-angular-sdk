import { Message } from './../../../types';
import { MarkdownRendererComponent } from './../../../shared/components/markdown-renderer/markdown-renderer.component';
import {
  CardComponent,
  CardContentComponent,
} from './../../../shared/components/card';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatAvatarComponent } from '../chat-avatar/chat-avatar.component';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    MarkdownRendererComponent,
    ChatAvatarComponent,
  ],
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
})
export class ChatMessageComponent {
  @Input() message!: Message;
  @Input() needsAgent: boolean = false;
  @Input() currentLang: string = 'en';
  @Input() isHidden: boolean = false;

  cleanMessageContent(content: string): string {
    return content.replace(/```/g, '\\`\\`\\`');
  }
}
