import { TranslatePipe } from './../../../pipes/translate.pipe';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslatePipe],
})
export class FooterComponent {
  @Input() showHelpScreenData: boolean = false;
  @Input() showChat: boolean = false;
}
