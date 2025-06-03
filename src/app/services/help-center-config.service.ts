import { Injectable } from '@angular/core'

export type GetTokenFn = () => Promise<string>

@Injectable({
  providedIn: 'root'
})
export class HelpCenterConfigService {
  private _apiBaseUrl: string = 'https://babylai.net/api'
  private _getTokenFn?: GetTokenFn

  setApiBaseUrl(url: string) {
    this._apiBaseUrl = url
  }

  getApiBaseUrl(): string {
    return this._apiBaseUrl
  }

  setGetTokenFn(fn: GetTokenFn) {
    this._getTokenFn = fn
  }

  getTokenFn(): GetTokenFn | undefined {
    return this._getTokenFn
  }
}
