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
    const encryptedToken = this.generalService.encryptFileForLocal(JSON.stringify(token))
    localStorage.setItem('token', encryptedToken);
  }

getToken(): any | null {
  const data = localStorage.getItem('token');
  if (!data) return null; // ✅ stop if no token

  try {
    const decryptedToken = this.generalService.decryptFileForLocal(data);
    if (!decryptedToken) return null; // extra safety
    alert('sucess to decrypt or parse token:');
    return JSON.parse(decryptedToken);
  } catch (error) {
    alert('Failed to decrypt or parse token:');
    return null;
  }
}

  clearToken() {
    localStorage.removeItem('token');
  }
  
}
