import { Injectable } from '@angular/core'
import { ApiConfig } from '../../../public_api'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private getTokenFunction: (() => Promise<string>) | null = null
  private baseUrl: string = 'https://babylai.net/api'

  /**
   * Initialize the API service with optional configuration
   * @param config Configuration object containing token function and optional base URL
   */
  initialize(config: ApiConfig) {
    if (!config.getToken) {
      throw new Error('getToken function is required for API initialization')
    }

    this.getTokenFunction = config.getToken
    if (config.baseUrl) {
      this.baseUrl = config.baseUrl
    }
  }

  async getValidToken(forceRefresh = false): Promise<string> {
    if (!this.getTokenFunction) {
      throw new Error('API service not initialized. Call initialize({ getToken }) first.')
    }

    let storedToken = localStorage.getItem('chatbot-token')
    let storedExpiry = localStorage.getItem('chatbot-token-expiry')

    const currentTime = Math.floor(Date.now() / 1000)

    if (!storedToken || !storedExpiry || currentTime >= Number(storedExpiry) || forceRefresh) {
      const tokenResponse = await this.getTokenFunction()

      if (!tokenResponse) {
        throw new Error('Invalid token response from getToken function')
      }

      storedToken = tokenResponse
      storedExpiry = String(currentTime + 900) // 15 minutes expiry

      localStorage.setItem('chatbot-token', storedToken)
      localStorage.setItem('chatbot-token-expiry', storedExpiry)
    }

    return storedToken
  }

  private async fetchWithAuth(url: string, options: RequestInit, retry = true): Promise<Response> {
    if (!options.headers) {
      options.headers = {}
    }

    const headers = options.headers as Record<string, string>
    headers['Authorization'] = `Bearer ${await this.getValidToken()}`

    let response = await fetch(url, options)

    if ((response.status === 401 || response.status === 403) && retry) {
      console.warn('Token expired. Fetching new token...')

      const newToken = await this.getValidToken(true)
      headers['Authorization'] = `Bearer ${newToken}`

      response = await fetch(url, options)
    }

    return response
  }

  async apiRequest(endpoint: string, method = 'GET', body: any = null, customHeaders: Record<string, string> = {}): Promise<Response> {
    const url = `${this.baseUrl}/${endpoint}`

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...customHeaders
      },
      body: body ? JSON.stringify(body) : null
    }

    const response = await this.fetchWithAuth(url, options)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'API request failed')
    }

    return response
  }
}
