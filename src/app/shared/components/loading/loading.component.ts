import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-loading',
  styleUrls: ['./loading.component.scss'],
  template: `
    <div class="loading">
      <div class="loader" [class.loader--primary]="variant === 'primary'"></div>
    </div>
  `,
  standalone: true
})
export class LoadingComponent {
  @Input() variant: 'default' | 'primary' = 'default'
}
