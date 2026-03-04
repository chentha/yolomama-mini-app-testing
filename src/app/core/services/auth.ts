// auth.ts
import { Injectable } from '@angular/core';
import { General } from './general';
import { Telegram } from './telegram';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private token: string | null = null;

  constructor(
    private generalService: General,
    private telegramService: Telegram
  ) {
    this.initToken();
  }

  private initToken() {
    // 1. Try getting fresh token from Telegram
    const initData = this.telegramService.getWebApp()?.initData;
    if (initData) {
      this.token = initData;
      this.persistToken(initData);
      return;
    }

    // 2. Fallback to stored token (e.g. app reloaded outside Telegram)
    this.token = this.loadStoredToken();
  }

  getToken(): string | null {
    return this.token;
  }

  private persistToken(token: string) {
    const encrypted = this.generalService.encryptFileForLocal(token);
    localStorage.setItem('token', encrypted);
  }

  private loadStoredToken(): string | null {
    const data = localStorage.getItem('token');
    if (!data) return null;
    return this.generalService.decryptFileForLocal(data);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }
}