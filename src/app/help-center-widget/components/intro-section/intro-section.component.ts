import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translate.pipe';
import {
  CardComponent,
  CardContentComponent,
} from '../../../shared/components/card';
import { ButtonComponent } from '../../../shared/components/button';

@Component({
  selector: 'app-intro-section',
  templateUrl: './intro-section.component.html',
  styleUrls: ['./intro-section.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    CardComponent,
    CardContentComponent,
    ButtonComponent,
  ],
})
export class IntroSectionComponent {
  @Input() currentLang: string = 'en';
  @Output() showHelpScreenData = new EventEmitter<void>();
  @Output() navigateToUrl = new EventEmitter<string>();

  handleShowHelpScreenData() {
    this.showHelpScreenData.emit();
  }

  handleNavigateToUrl(url: string) {
    this.navigateToUrl.emit(url);
  }
}
