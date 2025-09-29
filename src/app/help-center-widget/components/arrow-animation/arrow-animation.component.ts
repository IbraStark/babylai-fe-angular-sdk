import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arrow-animation',
  templateUrl: './arrow-animation.component.html',
  styleUrls: ['./arrow-animation.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ArrowAnimationComponent {
  @Input() showArrowAnimation: boolean = false;
  @Input() isPopupOpen: boolean = false;
  @Input() messageLabel: string | null = null;
  @Input() isVisible: boolean = true;
  @Output() closeArrowAnimation = new EventEmitter<void>();

  handleCloseArrowAnimation() {
    this.closeArrowAnimation.emit();
  }
}
