import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountManagerService {
  // isUserSignIn = new EventEmitter<boolean>();
  ////////////////////////////////////////////////////////////////////////////
  // const storedUserData = JSON.parse(localStorage.getItem('userData'));   //
  // const expireDate = new Date(storedUserData.expires);                   //
  // const formattedExpireDate = expireDate.toLocaleDateString('en-CA', {   //
  //   year: 'numeric',                                                     //
  //   month: '2-digit',                                                    //
  //   day: '2-digit',                                                      //
  // });                                                                    //
  // console.log('formated Date', formattedExpireDate);                     //
  ////////////////////////////////////////////////////////////////////////////
  isUserLoggedIn = new EventEmitter<boolean>();
  isSpecialUserLogedIn = new EventEmitter<boolean>();
  constructor() {}
  checkUserIsLogin() {
    let isUserDataExist = localStorage.getItem('userData') ? true : false;
    console.log('user data storage service', isUserDataExist);
    return isUserDataExist ? true : false;
  }
  checkSpecialUser() {
    let isUserDataExist = localStorage?.getItem('userData') ? true : false;
    if (isUserDataExist) {
      const userData = JSON.parse(localStorage.getItem('userData'));
      return userData.usertype === 'special' ? true : false;
    }
    return false;
  }
  signOut() {
    localStorage.removeItem('userData');
    this.isUserLoggedIn.emit(false);
    this.isSpecialUserLogedIn.emit(false);
  }
}
