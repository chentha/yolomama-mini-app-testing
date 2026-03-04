import { Injectable } from '@angular/core';
import { General } from './general';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  constructor(
    private generalService: General
  ){

  }

  setToken(token: any) {
    const encryptedToken = this.generalService.encryptFileForLocal(token)
    localStorage.setItem('token', encryptedToken);
  }

  // getToken(): any | null {
  //   const data = localStorage.getItem('token');
  //   const decryptedToken = this.generalService.decryptFileForLocal(data);
  //   return decryptedToken;
  // }

  getToken(): string | null {
    const data = localStorage.getItem('token');
    if (!data) return null;
    const decrypted = this.generalService.decryptFileForLocal(data);
    return decrypted ? JSON.parse(decrypted) : null;
  }

  clearToken() {
    localStorage.removeItem('token');
  }
  
}
