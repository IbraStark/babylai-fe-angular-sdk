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
  AfterViewChecked,
  OnDestroy,
  ChangeDetectorRef,
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
export class ChatComponent
  implements OnInit, OnChanges, AfterViewChecked, OnDestroy
{
  @Input() messages: Message[] = [];
  @Input() needsAgent: boolean = false;
  @Input() assistantStatus: string = '';
  @Input() isAblyConnected: boolean = false;
  @Input() isChatClosed: boolean = false;
  @Input() currentLang: string = 'en';
  @Input() loading: boolean = false;
  @Input() avatarUrl: string = '';
  @Output() sendMessageEvent = new EventEmitter<string>();
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;

  firstAgentMessageIndex = -1;
  private lastMessageCount = 0;
  private shouldAutoScroll = true;
  private isUserScrolling = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.findFirstAgentMessageIndex();
    this.setupScrollListener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['messages']) {
      this.findFirstAgentMessageIndex();
      // Only auto-scroll if new messages were added and we should auto-scroll
      if (
        this.messages.length > this.lastMessageCount &&
        this.shouldAutoScroll
      ) {
        this.lastMessageCount = this.messages.length;
        // Use setTimeout to ensure DOM is updated
        setTimeout(() => this.scrollToBottom(), 0);
      }
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
    // Only scroll if we have new messages and should auto-scroll
    if (
      this.messages.length > this.lastMessageCount &&
      this.shouldAutoScroll &&
      !this.isUserScrolling
    ) {
      this.lastMessageCount = this.messages.length;
      this.scrollToBottom();
    }
  }

  private setupScrollListener(): void {
    // Listen for user scroll events to detect when user is manually scrolling
    if (this.chatMessagesContainer?.nativeElement) {
      this.chatMessagesContainer.nativeElement.addEventListener(
        'scroll',
        this.onScroll.bind(this)
      );
    }
  }

  private onScroll(): void {
    const element = this.chatMessagesContainer.nativeElement;
    const isAtBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 10; // 10px threshold

    // If user scrolled to bottom, re-enable auto-scroll
    if (isAtBottom) {
      this.shouldAutoScroll = true;
      this.isUserScrolling = false;
    } else {
      // User scrolled up, disable auto-scroll
      this.shouldAutoScroll = false;
      this.isUserScrolling = true;
    }
  }

  scrollToBottom(): void {
    if (!this.chatMessagesContainer?.nativeElement) return;

    try {
      const element = this.chatMessagesContainer.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  hasAgentMessageBeenSent(messages: any[]): boolean {
    return messages.some(
      (message) => message.senderType === 2 || message.senderType === 3
    );
  }

  ngOnDestroy(): void {
    // Clean up event listener
    if (this.chatMessagesContainer?.nativeElement) {
      this.chatMessagesContainer.nativeElement.removeEventListener(
        'scroll',
        this.onScroll.bind(this)
      );
    }
  }
}
