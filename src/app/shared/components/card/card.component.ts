import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./card.component.scss'],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class CardComponent {
  @Input() variant: 'default' | 'rounded' | 'shadowed' = 'default'
  @Input() class = ''

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['card']
    classes.push(`card--${this.variant}`)
    if (this.class) {
      classes.push(this.class)
    }
    return classes.join(' ')
  }
}

@Component({
  selector: 'app-card-header',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./card.component.scss'],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class CardHeaderComponent {
  @Input() class = ''

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['card__header']
    if (this.class) {
      classes.push(this.class)
    }
    return classes.join(' ')
  }
}

@Component({
  selector: 'app-card-title',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./card.component.scss'],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class CardTitleComponent {
  @Input() class = ''

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['card__title']
    if (this.class) {
      classes.push(this.class)
    }
    return classes.join(' ')
  }
}

@Component({
  selector: 'app-card-description',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./card.component.scss'],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class CardDescriptionComponent {
  @Input() class = ''

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['card__description']
    if (this.class) {
      classes.push(this.class)
    }
    return classes.join(' ')
  }
}

@Component({
  selector: 'app-card-content',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./card.component.scss'],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class CardContentComponent {
  @Input() class = ''

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['card__content']
    if (this.class) {
      classes.push(this.class)
    }
    return classes.join(' ')
  }
}

@Component({
  selector: 'app-card-footer',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./card.component.scss'],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class CardFooterComponent {
  @Input() class = ''

  @HostBinding('class')
  get hostClasses(): string {
    const classes = ['card__footer']
    if (this.class) {
      classes.push(this.class)
    }
    return classes.join(' ')
  }
}
