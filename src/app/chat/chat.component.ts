import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatSeparatorComponent } from './components/chat-separator/chat-separator.component';
import { ChatTypingIndicatorComponent } from './components/chat-typing-indicator/chat-typing-indicator.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { Message } from '../types';

// Import Prism.js components
import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    ChatMessageComponent,
    ChatSeparatorComponent,
    ChatTypingIndicatorComponent,
    ChatInputComponent,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() messages: Message[] = [];
  @Input() needsAgent: boolean = false;
  @Input() assistantStatus: string = '';
  @Input() isAblyConnected: boolean = false;
  @Input() isChatClosed: boolean = false;
  @Input() currentLang: string = 'en';
  @Input() loading: boolean = false;
  @Output() sendMessageEvent = new EventEmitter<string>();
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;

  firstAgentMessageIndex = -1;

  ngOnInit(): void {
    this.findFirstAgentMessageIndex();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      this.findFirstAgentMessageIndex();
    }
  }

  findFirstAgentMessageIndex(): void {
    // Only set firstAgentMessageIndex if we haven't found it yet
    if (this.firstAgentMessageIndex === -1) {
      this.firstAgentMessageIndex = this.messages.findIndex(
        (message) => message.senderType === 2
      );
    }
  }

  handleSendMessage(message: string): void {
    this.sendMessageEvent.emit(message);
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
