// auth.ts
import { Injectable } from '@angular/core';
import { General } from './general';
import { Telegram } from './telegram';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private token: string | null = null;
  private readyResolve!: () => void;
  readonly ready = new Promise<void>(resolve => {
    this.readyResolve = resolve;
  });

  constructor(
    private generalService: General,
    private telegramService: Telegram
  ) {}

  initToken(): Promise<void> {
    const initData = this.telegramService.getWebApp().initData;
    
    if(initData != 'query_id' || initData != null){
      console.log('user token is saved', initData)   
      this.token = initData
    }else{
      console.log('user token no save', initData)   
    }
    // if (initData) {
    //   this.token = initData;
    //   this.persistToken(initData);
    // } else {
    //   this.token = this.loadStoredToken();
    // }

    this.readyResolve();
    return this.ready;
  }

  saveToken(token: string){
    this.token = token
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