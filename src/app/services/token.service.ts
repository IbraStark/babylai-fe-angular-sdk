import { Injectable } from '@angular/core'
import { HelpCenterConfigService } from './help-center-config.service'
import { TokenResponse } from '../types'

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private config: HelpCenterConfigService) {}

  async getToken(): Promise<TokenResponse> {
    // If a custom token function is provided, use it
    const customGetToken = this.config.getTokenFn()
    if (customGetToken) {
      const token = await customGetToken()
      return {
        token,
        expiresIn: 3600 // Default to 1 hour
      }
    }

    // Otherwise, return error that getTokenFn is not provided
    throw new Error('getTokenFn is not provided')
  }
}
