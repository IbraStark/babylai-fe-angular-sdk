import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { HelpCenterWidgetComponent } from './help-center-widget.component'

import { ApiService } from '../services/api.service'
import { SignalRService } from '../services/signalrService.service'
import { TokenService } from '../services/token.service'

// Export the providers for standalone usage
export const HELP_CENTER_PROVIDERS = [ApiService, SignalRService, TokenService]

@NgModule({
  imports: [CommonModule, HttpClientModule, HelpCenterWidgetComponent],
  exports: [HelpCenterWidgetComponent],
  providers: HELP_CENTER_PROVIDERS
})
export class HelpCenterModule {}
