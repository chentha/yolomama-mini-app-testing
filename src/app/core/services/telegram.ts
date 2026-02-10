import { Injectable } from '@angular/core';
import WebApp from '@twa-dev/sdk';
import { General } from './general';

@Injectable({
  providedIn: 'root',
})
export class Telegram {
  tg = WebApp;

  constructor(
    private generalService: General
  ) {
    this.tg.ready();
    this.tg.expand();
  }


  showBackButton() {
    this.tg?.BackButton.show();
  }

  hideBackButton() {
    this.tg?.BackButton.hide();
  }

  onBack(callback: () => void) {
    this.tg?.BackButton.onClick(callback);
  }

  // Handle all possible callback formats
  // requestPhoneNumber(): Promise<{ phone: string; contact: any }> {
  //   return new Promise((resolve, reject) => {
  //     console.log('Requesting contact...');
      
  //     this.tg.requestContact((sent: boolean, event: any) => {
  //       console.log('Callback triggered sent:', sent);
  //       console.log('Callback event:', event);
        
  //       if (sent) {

  //         if (event && event.responseUnsafe && event.responseUnsafe.contact) {
  //           const contact = event.responseUnsafe.contact;
            
  //           console.log('Contact data received:', contact);
            
  //           resolve({
  //             phone: contact.phone_number,
  //             contact: contact
  //           });
  //         } else {
  //           // console.error('Contact data not found');
  //           reject('Contact data not available in response');
  //         }
  //       } else {
  //         reject('User declined');
  //       }
  //     });
  //   });
  // }

  requestPhoneNumber(): Promise<{ phone: string; contact: any }> {
  return new Promise((resolve, reject) => {
    this.tg.requestContact((sent: boolean, event: any) => {
      console.log('sent:', sent, 'event:', event);

      if (!sent) {
        return reject('User declined');
      }

      // Try multiple possible locations for the contact data
      const contact =
        event?.responseUnsafe?.contact ||
        event?.response?.contact ||
        event?.contact ||
        null;

      if (contact?.phone_number) {
        resolve({ phone: contact.phone_number, contact });
      } else {
        console.error('Unexpected event structure:', JSON.stringify(event));
        reject('Contact data not available');
      }
    });
  });
}


  getWebApp() {
    return this.tg;
  }

  // showAlert(message: string) {
  //   this.tg.showAlert(message);
  // }

  logAllUserData() {
    
    return {
      user: this.tg.initDataUnsafe.user,
    };
  }


  //save user info tg into storage
  saveUserInStorage(user:any){
    // if(user){
    //   localStorage.setItem('userInfo', this.generalService.encryptFileForLocal(user));
    // } 
  }


}
