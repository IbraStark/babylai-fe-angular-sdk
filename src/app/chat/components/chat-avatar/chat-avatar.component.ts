import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-avatar.component.html',
  styleUrls: ['./chat-avatar.component.scss'],
})
export class ChatAvatarComponent {
  @Input() senderType: number = 1;
  @Input() needsAgent: boolean = false;
  @Input() isHidden: boolean = false;
  @Input() avatarUrl: string = '';
}
