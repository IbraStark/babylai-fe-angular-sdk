import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ClientAblyService } from '../services/ably.service';
import {
  CardComponent,
  CardContentComponent,
} from '../shared/components/card/card.component';
import { ButtonComponent } from '../shared/components/button';
import { HelpScreenDataComponent } from '../help-screen-data/help-screen-data.component';
import {
  HeaderComponent,
  ChatHeaderComponent,
} from '../shared/components/header';
import { ChatComponent } from '../chat/chat.component';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';
import { TranslatePipe } from '../pipes/translate.pipe';
import { TranslationService } from '../services/translation.service';
import { Subscription } from 'rxjs';

interface Option {
  id: string;
  helpScreenId: string;
  parentOptionId: string | null;
  nestedOptions: Option[];
  title: string;
  paragraphs: string[];
  chatWithUs: boolean;
  assistantId?: string;
  assistant?: {
    id: string;
    tenantId: string;
    tenant: {
      id: string;
      name: string;
      key: string;
    };
    name: string;
    openAIAssistantId: string;
    greeting: string;
    closing: string;
  };
  hasNestedOptions: boolean;
  order: number;
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
  selector: 'app-help-center-widget',
  templateUrl: './help-center-widget.component.html',
  styleUrls: ['./help-center-widget.component.scss', '../../styles.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CardComponent,
    CardContentComponent,
    ButtonComponent,
    HelpScreenDataComponent,
    HeaderComponent,
    ChatHeaderComponent,
    ChatComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
  ],
})
export class HelpCenterWidgetComponent implements OnInit, OnDestroy {
  @Input() getToken!: () => Promise<string>;
  @Input() helpScreenId!: string;
  @Input() showArrow: boolean = true;
  @Input() messageLabel: string | null = null;
  @Input() set currentLang(value: string) {
    this._currentLang = value;
    this.isRTL = value === 'ar';
  }
  get currentLang(): string {
    return this._currentLang;
  }
  @Input() isIntroScreenEnabled: boolean = false;
  @ViewChild('chatMessagesContainer') chatMessagesContainer!: ElementRef;

  private _currentLang: string = 'en';
  private langSubscription?: Subscription;
  isRTL: boolean = false;

  // State variables
  isPopupOpen = false;
  helpScreenData: any = null;
  status = 'idle';
  error: string | null = null;
  showArrowAnimation = this.showArrow;
  showTooltip = false;
  sessionId: string | null = null;
  isAblyConnected = false;
  isChatClosed = false;
  showChat = false;
  messageText: string = '';
  isTyping = false;
  messages: Message[] = [];
  showHelpScreenData = false;
  chatIsLoading = false;
  ablyToken: string | null = null;

  isOpen = false;

  needsAgent = false;
  assistantStatus = 'idle';

  selectedOption: Option | null = null;
  selectedNestedOption: Option | null = null;

  showEndChatConfirmation = false;

  constructor(
    private apiService: ApiService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.showArrowAnimation = this.showArrowAnimation;
    if (!this.isIntroScreenEnabled) {
      this.showHelpScreenData = true;
    }

    // Subscribe to language changes
    this.langSubscription = this.translationService.currentLang.subscribe(
      (lang) => {
        this.currentLang = lang;
      }
    );
  }

  ngOnDestroy() {
    // Clean up subscription
    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }

    // Clean up Ably connection
    ClientAblyService.stopConnection();
  }

  async handleTogglePopup() {
    this.isPopupOpen = !this.isPopupOpen;
    this.showArrowAnimation = this.isPopupOpen;

    if (this.isPopupOpen) {
      // Reset the state when opening the popup
      if (!this.isIntroScreenEnabled) {
        this.showHelpScreenData = true;
      }
      await this.fetchHelpScreenData();
    }
  }

  private async fetchHelpScreenData() {
    this.status = 'loading';
    this.error = null;

    try {
      const response = await this.apiService.apiRequest(
        `client/clientHelpScreen/${this.helpScreenId}`,
        'GET'
      );
      this.helpScreenData = await response.json();
      this.status = 'succeeded';
    } catch (error: any) {
      this.error = error.message;
      this.status = 'failed';
    }
  }

  async createChatSession(option?: Option) {
    try {
      const selectedOpt = option || this.selectedOption;
      const chatSessionCreateDto = {
        optionId: selectedOpt?.id,
        helpScreenId: this.helpScreenId,
      };

      const response = await this.apiService.apiRequest(
        'Client/ClientChatSession/create-session',
        'POST',
        chatSessionCreateDto
      );
      const data = await response.json();

      const { chatSession, ablyToken } = data;
      this.sessionId = chatSession?.id;
      this.ablyToken = ablyToken;

      // Establish Ably connection after creating session
      if (this.sessionId && selectedOpt && !this.isAblyConnected) {
        // Use the ablyToken from response or fallback to getValidToken
        const tokenToUse =
          this.ablyToken || (await this.apiService.getValidToken());

        // Get tenantId from the selected option's assistant
        const tenantId =
          selectedOpt.assistant?.tenantId ||
          selectedOpt.assistant?.tenant?.id ||
          '';

        await ClientAblyService.startConnection(
          this.sessionId,
          tokenToUse,
          this.handleReceiveMessage.bind(this),
          tenantId
        );

        this.isAblyConnected = true;

        // Add greeting message
        this.messages.push({
          id: Date.now(),
          sender: 'assistant',
          senderType: 3,
          messageContent:
            selectedOpt.assistant?.greeting ||
            (this.currentLang === 'en'
              ? 'Hello! How can I assist you today?'
              : 'مرحباً! كيف يمكنني مساعدتك اليوم؟'),
          sentAt: new Date(),
          isSeen: true,
        });
      }

      return data;
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  async sendMessage(messageText?: string) {
    const textToSend = messageText || this.messageText;
    if (!textToSend.trim() || !this.isAblyConnected || this.isChatClosed)
      return;

    try {
      this.assistantStatus = 'typing';

      // Add user message
      this.messages.push({
        id: Date.now(),
        sender: 'user',
        senderType: 1,
        messageContent: textToSend,
        sentAt: new Date(),
        isSeen: false,
      });

      if (!this.sessionId) {
        await this.createChatSession(this.selectedOption || undefined);
      }

      const messageDto = { messageContent: textToSend };
      await this.apiService.apiRequest(
        `Client/ClientChatSession/${this.sessionId}/send-message`,
        'POST',
        messageDto
      );

      // Clear message input
      this.messageText = '';

      // Update message as seen
      this.messages = this.messages.map((msg) =>
        msg.senderType === 1 && !msg.isSeen ? { ...msg, isSeen: true } : msg
      );
    } catch (error) {
      console.error('Error sending message:', error);
      this.assistantStatus = 'idle';
      this.messages.push({
        id: Date.now(),
        sender: 'assistant',
        senderType: 3,
        messageContent:
          'Failed to send the message. Please try again.\n لم يتم إرسال الرسالة. يرجى المحاولة مرة أخرى.',
        sentAt: new Date(),
        isSeen: true,
      });
    }
  }

  async sendMessageToChatSession(chatSessionId: string, messageDto: any) {
    try {
      const response = await this.apiService.apiRequest(
        `Client/ClientChatSession/${chatSessionId}/send-message`,
        'POST',
        messageDto
      );
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  handleReceiveMessage(
    message: string,
    senderType: string,
    needsAgent: boolean
  ) {
    if (needsAgent) {
      this.needsAgent = true;
    }

    const sender = this.getSenderType(parseInt(senderType));

    this.messages.push({
      id: Date.now(),
      sender: sender,
      senderType: parseInt(senderType),
      messageContent: message,
      sentAt: new Date(),
      isSeen: true,
    });

    this.assistantStatus = 'idle';
    this.scrollToBottom();
  }

  private getSenderType(senderType: number): 'user' | 'assistant' | 'agent' {
    switch (senderType) {
      case 1:
        return 'user';
      case 2:
        return 'agent';
      default:
        return 'assistant';
    }
  }

  async handleStartNewChat(option: Option) {
    this.selectedOption = option;
    this.chatIsLoading = true;

    try {
      // Create chat session (includes Ably connection setup)
      if (!this.sessionId) {
        await this.createChatSession(option);
      }

      // Update UI state
      this.showChat = true;
      this.isChatClosed = false;
      this.showHelpScreenData = false;
      this.chatIsLoading = false;
    } catch (error) {
      console.error('Error starting chat:', error);
      this.chatIsLoading = false;

      // Show error message to user
      this.messages.push({
        id: Date.now(),
        sender: 'assistant',
        senderType: 3,
        messageContent:
          'Failed to start chat. Please try again.\n فشل في بدء المحادثة. يرجى المحاولة مرة أخرى.',
        sentAt: new Date(),
        isSeen: true,
      });
    }
  }

  private async startNewChatSession(option: any) {
    try {
      this.status = 'loading';
      this.error = '';
      this.messages = [];

      // Use the centralized createChatSession method
      await this.createChatSession(option);

      this.isChatClosed = false;
      this.status = 'succeeded';
    } catch (error: any) {
      console.error('Chat start error:', error);
      this.error = error.message || 'Failed to start chat session';
      this.status = 'failed';
    }
  }

  async handleStartChat(option: any) {
    this.showChat = true;
    await this.startNewChatSession(option);
  }

  async handleEndChat() {
    this.showEndChatConfirmation = true;
  }

  async confirmEndChat() {
    this.showEndChatConfirmation = false;
    if (this.sessionId) {
      await this.closeChatSession(this.sessionId);
      this.sessionId = null;
    }

    // Stop Ably connection
    await ClientAblyService.stopConnection();
    this.isAblyConnected = false;

    this.showChat = false;
    this.showHelpScreenData = true;
    this.messages = [];
    this.needsAgent = false;
    this.assistantStatus = 'idle';
    this.selectedOption = null;
    this.selectedNestedOption = null;
  }

  cancelEndChat() {
    this.showEndChatConfirmation = false;
  }

  async closeChatSession(chatSessionId: string) {
    try {
      const response = await this.apiService.apiRequest(
        `Client/ClientChatSession/${chatSessionId}/close`,
        'POST'
      );
      return await response.json();
    } catch (error) {
      console.error('Error closing chat session:', error);
      throw error;
    }
  }

  handleClosePopup() {
    this.showHelpScreenData = false;
    this.showChat = false;
    this.isPopupOpen = false;
    this.selectedOption = null;
    this.selectedNestedOption = null;
  }

  handleCloseArrowAnimation() {
    this.showArrowAnimation = false;
  }

  handleBack() {
    if (this.showChat) {
      this.showChat = false;
      this.showHelpScreenData = true;
    } else if (this.selectedNestedOption) {
      this.selectedNestedOption = null;
    } else if (this.selectedOption) {
      this.selectedOption = null;
    } else if (this.showHelpScreenData) {
      this.showHelpScreenData = false;
    }
  }

  handleShowChat() {
    this.showChat = true;
    this.showHelpScreenData = false;
  }

  selectOption(option: Option) {
    this.selectedOption = option;
    this.selectedNestedOption = null;
  }

  selectNestedOption(nestedOption: Option) {
    this.selectedNestedOption = nestedOption;
  }

  handleShowHelpScreenData() {
    this.showHelpScreenData = true;
  }

  handleHideHelpScreenData() {
    this.showHelpScreenData = false;
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.chatMessagesContainer) {
        const element = this.chatMessagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    });
  }

  getDirection() {
    return this.currentLang === 'ar' ? 'rtl' : 'ltr';
  }

  get helpScreenDataList() {
    if (!this.helpScreenData?.options) return [];
    // Transform options to the format expected by HelpScreenDataComponent
    return this.helpScreenData.options.map((option: any) => ({
      icon: option.icon || '/icons/default.svg',
      title: option.title,
      description: option.paragraphs?.[0] || '',
      actionLabel: option.chatWithUs ? 'Chat Now' : '',
      action: option.chatWithUs ? () => this.handleStartChat(option) : null,
    }));
  }

  navigateToUrl(url: string): void {
    window.open(url, '_blank');
  }
}
