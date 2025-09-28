import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Input() showLogo = true;
  @Input() size: 'default' | 'small' = 'default';
  private themeService = inject(ThemeService);

  get effectiveLogoUrl(): string | undefined {
    return this.themeService.getLogoUrl();
  }
}
