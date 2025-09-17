import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent, CardContentComponent } from '../shared/components/card';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { TranslatePipe } from '../pipes/translate.pipe';
import { MarkdownRendererComponent } from '../shared/components/markdown-renderer';

// Conditionally import Prism.js components
try {
  eval('require')('prismjs');
  eval('require')('prismjs/components/prism-typescript');
  eval('require')('prismjs/components/prism-javascript');
  eval('require')('prismjs/components/prism-css');
  eval('require')('prismjs/components/prism-json');
} catch (e) {
  console.warn('Prism.js not available, syntax highlighting will be disabled');
}

interface Message {
  id: string | number;
  sender: 'user' | 'assistant' | 'agent';
  senderType: number;
  messageContent: string;
  sentAt: Date;
  isSeen: boolean;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    CardContentComponent,
    LoadingComponent,
    TranslatePipe,
    MarkdownRendererComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() messages: Message[] = [];
  @Input() needsAgent: boolean = false;
  @Input() assistantStatus: string = '';
  @Input() isAblyConnected: boolean = false;
  @Input() isChatClosed: boolean = false;
  @Input() currentLang: string = 'en';
  @Input() loading: boolean = false;
  @Output() sendMessageEvent = new EventEmitter<string>();
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  messageContent = '';
  firstAgentMessageIndex = -1;

  ngOnInit(): void {
    this.findFirstAgentMessageIndex();
  }

  findFirstAgentMessageIndex(): void {
    this.firstAgentMessageIndex = this.messages.findIndex(
      (message) => message.senderType === 2
    );
  }

  handleSendMessage(): void {
    if (!this.messageContent.trim() || this.loading) return;
    this.sendMessageEvent.emit(this.messageContent);
    this.messageContent = '';
    this.adjustTextareaHeight();
  }

  cleanMessageContent(content: string): string {
    return content.replace(/```/g, '\\`\\`\\`');
  }

  adjustTextareaHeight(): void {
    const textarea = this.messageInput?.nativeElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatMessagesContainer.nativeElement.scrollTop =
        this.chatMessagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  hasAgentMessageBeenSent(messages: any[]): boolean {
    return messages.some(
      (message) => message.senderType === 2 || message.senderType === 3
    );
  }
}
