import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import { ButtonComponent } from '../../../shared/components/button';
import { HelpScreenDataComponent } from '../../../help-screen-data/help-screen-data.component';
import { ChatComponent } from '../../../chat/chat.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { IntroSectionComponent } from '../intro-section/intro-section.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatHeaderComponent, HeaderComponent } from '../../../shared/components';

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
  selector: 'app-help-popup',
  templateUrl: './help-popup.component.html',
  styleUrls: ['./help-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    ButtonComponent,
    HelpScreenDataComponent,
    HeaderComponent,
    ChatHeaderComponent,
    ChatComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    IntroSectionComponent,
    FooterComponent,
  ]
})
export class HelpPopupComponent {
  @Input() isPopupOpen: boolean = false;
  @Input() showHelpScreenData: boolean = false;
  @Input() showChat: boolean = false;
  @Input() status: string = 'idle';
  @Input() error: string | null = null;
  @Input() helpScreenData: any = null;
  @Input() messages: Message[] = [];
  @Input() needsAgent: boolean = false;
  @Input() assistantStatus: string = 'idle';
  @Input() isAblyConnected: boolean = false;
  @Input() isChatClosed: boolean = false;
  @Input() currentLang: string = 'en';
  @Input() chatIsLoading: boolean = false;
  @Input() sessionId: string | null = null;
  @Input() isIntroScreenEnabled: boolean = false;
  @Input() selectedOption: Option | null = null;
  @Input() selectedNestedOption: Option | null = null;
  @Input() showEndChatConfirmation: boolean = false;

  @Output() closePopup = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() showChatEvent = new EventEmitter<void>();
  @Output() endChat = new EventEmitter<void>();
  @Output() confirmEndChat = new EventEmitter<void>();
  @Output() cancelEndChat = new EventEmitter<void>();
  @Output() sendMessageEvent = new EventEmitter<string>();
  @Output() startNewChat = new EventEmitter<Option>();
  @Output() showHelpScreenDataEvent = new EventEmitter<void>();
  @Output() hideHelpScreenData = new EventEmitter<void>();
  @Output() navigateToUrl = new EventEmitter<string>();

  handleClosePopup() {
    this.closePopup.emit();
  }

  handleBack() {
    this.back.emit();
  }

  handleShowChat() {
    this.showChatEvent.emit();
  }

  handleEndChat() {
    this.endChat.emit();
  }

  handleConfirmEndChat() {
    this.confirmEndChat.emit();
  }

  handleCancelEndChat() {
    this.cancelEndChat.emit();
  }

  handleSendMessage(message: string) {
    this.sendMessageEvent.emit(message);
  }

  handleStartNewChat(option: Option) {
    this.startNewChat.emit(option);
  }

  handleShowHelpScreenData() {
    this.showHelpScreenDataEvent.emit();
  }

  handleHideHelpScreenData() {
    this.hideHelpScreenData.emit();
  }

  handleNavigateToUrl(url: string) {
    this.navigateToUrl.emit(url);
  }
}
