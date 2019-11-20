import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage, private platform: Platform, private router: Router, private http: HttpClient,
    private loadingCtrl: LoadingController
  ) {
    this.platform.ready().then( () => {
      this.checkToken();
    });
  }

  checkToken() {
    return new Promise( (resolve, reject ) => {
      this.storage.get(TOKEN_KEY)
      .then( res => {
        if (res) {
          this.authenticationState.next(true);
        }
        resolve(res);
      })
      .catch( error => {
        reject(error);
      });
    });
  }

  login(accessToken) {
    const token = 'Bearer' + accessToken;
    this.storage.set(TOKEN_KEY, token).then( () => {
      console.log('Setting token: ', token);
      this.authenticationState.next(true);
    });
  }
  logout() {
    return this.storage.remove(TOKEN_KEY).then( () => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return new Promise( (resolve, reject) => {
      this.checkToken()
      .then( res => {
        resolve(this.authenticationState.value);
      })
      .catch( error => {
        reject(error);
      });
    });
  }

}
