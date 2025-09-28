import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonVariant = 'default' | 'icon-bg' | 'icon-only' | 'outline';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./button.component.scss'],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="getButtonClasses()"
      (click)="onClick.emit($event)"
      [dir]="direction"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() className = '';
  @Input() size: 'default' | 'small' | 'medium' = 'default';
  @Input() direction: 'ltr' | 'rtl' = 'ltr';
  @Output() onClick = new EventEmitter<MouseEvent>();

  getButtonClasses(): string {
    const classes = ['button'];

    // Add variant class
    classes.push(`button--${this.variant}`);

    // Add full width class if needed
    if (this.fullWidth) {
      classes.push('button--full-width');
    }

    // Add size class if needed
    if (this.size) {
      classes.push(`button--${this.size}`);
    }

    // Add direction class
    classes.push(`button--${this.direction}`);

    // Add custom classes
    if (this.className) {
      classes.push(this.className);
    }

    return classes.join(' ');
  }
}

@Component({
  selector: 'app-button-content',
  standalone: true,
  imports: [CommonModule],
  template: ` <ng-content></ng-content> `,
})
export class ButtonContentComponent {}

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <app-button
      variant="icon-bg"
      [className]="className"
      [disabled]="disabled"
      (onClick)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </app-button>
  `,
})
export class IconButtonComponent {
  @Input() className = '';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
}

@Component({
  selector: 'app-transparent-icon-button',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <app-button
      variant="icon-only"
      [className]="className"
      [disabled]="disabled"
      (onClick)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </app-button>
  `,
})
export class TransparentIconButtonComponent {
  @Input() className = '';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<MouseEvent>();
}
