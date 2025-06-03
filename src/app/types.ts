export type Language = 'en' | 'ar'

export interface TokenResponse {
  token: string
  expiresIn: number
}

export interface Option {
  id: string
  helpScreenId: string
  parentOptionId: string | null
  nestedOptions: Option[]
  title: string
  paragraphs: string[]
  chatWithUs: boolean
  assistantId?: string
  assistant?: {
    id: string
    tenantId: string
    tenant: {
      id: string
      name: string
      key: string
    }
    name: string
    openAIAssistantId: string
    greeting: string
    closing: string
  }
  hasNestedOptions: boolean
  order: number
}

export interface Message {
  id: string | number
  sender: 'user' | 'assistant' | 'agent'
  senderType: number
  messageContent: string
  sentAt: Date
  isSeen: boolean
}
