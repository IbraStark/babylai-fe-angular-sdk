import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonComponent } from '../button'

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  styleUrls: ['./confirmation-dialog.component.scss'],
  template: `
    <div class="dialog">
      <div class="dialog__content">
        <h3 class="dialog__title">{{ title }}</h3>
        <p class="dialog__body">{{ body }}</p>
        <div class="dialog__actions">
          <app-button variant="outline" [fullWidth]="true" (click)="onCancel.emit()">
            {{ cancelText }}
          </app-button>
          <app-button variant="default" [fullWidth]="true" (click)="onConfirm.emit()">
            {{ confirmText }}
          </app-button>
        </div>
      </div>
    </div>
  `
})
export class ConfirmationDialogComponent {
  @Input() title: string = ''
  @Input() body: string = ''
  @Input() confirmText: string = 'Confirm'
  @Input() cancelText: string = 'Cancel'
  @Output() onConfirm = new EventEmitter<void>()
  @Output() onCancel = new EventEmitter<void>()
}
