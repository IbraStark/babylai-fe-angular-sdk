import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardComponent, CardContentComponent } from '../shared/components/card/card.component'
import { ButtonComponent } from '../shared/components/button/button.component'
import { TranslatePipe } from '../pipes/translate.pipe'

interface Tenant {
  id: string
  name: string
  key: string
}

interface Assistant {
  id: string
  tenantId: string
  tenant: Tenant
  name: string
  openAIAssistantId: string
  greeting: string
  closing: string
}

interface HelpScreenOption {
  id: string
  helpScreenId: string
  parentOptionId: string | null
  parentOption: HelpScreenOption | null
  nestedOptions: HelpScreenOption[]
  assistantId: string
  assistant: Assistant
  title: string
  paragraphs: string[]
  files: any[]
  chatWithUs: boolean
  hasNestedOptions: boolean
  order: number
}

interface HelpScreenData {
  id: string
  tenantId: string
  tenant: Tenant
  title: string
  description: string
  options: HelpScreenOption[]
  chatWithUs: boolean
}

@Component({
  selector: 'app-help-screen-data',
  standalone: true,
  imports: [CommonModule, CardComponent, CardContentComponent, ButtonComponent, TranslatePipe],
  templateUrl: './help-screen-data.component.html',
  styleUrls: ['./help-screen-data.component.scss']
})
export class HelpScreenDataComponent implements OnInit {
  @Input() helpScreenData: HelpScreenData | null = null
  @Input() title: string = ''
  @Output() handleStartNewChat = new EventEmitter<HelpScreenOption>()

  expandedItemId: string | null = null

  get helpScreenDataList() {
    if (!this.helpScreenData?.options) return []
    // Transform options to the format expected by HelpScreenDataComponent
    return this.helpScreenData.options.map((option: any) => ({
      icon: option.icon || 'assets/icons/default.svg',
      title: option.title,
      description: option.paragraphs?.[0] || '',
      actionLabel: option.chatWithUs ? 'Chat Now' : '',
      action: option.chatWithUs ? () => this.handleStartChat(option) : null
    }))
  }

  ngOnInit() {}

  toggleExpand(itemId: string): void {
    if (this.expandedItemId === itemId) {
      this.expandedItemId = null
    } else {
      this.expandedItemId = itemId
      setTimeout(() => {
        const element = document.getElementById(itemId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }
      }, 100)
    }
  }

  handleStartChat(option: HelpScreenOption): void {
    this.handleStartNewChat.emit(option)
  }
}
