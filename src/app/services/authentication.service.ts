import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { UserTokenResponse } from '../models/user-token-response';
import {environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  TOKEN_KEY = 'auth-token';
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private platform: Platform,
    private router: Router,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  async loginUser(loginRequest: LoginRequest): Promise<UserTokenResponse> {
    const response  = await this.http.post<UserTokenResponse>(`${environment.apiBaseUrl}/api/accounts/login`, loginRequest).toPromise();
    this.storeUserInStorage(response);
    console.log('User response ', response);
    await this.checkToken();
    return response;
  }

  isUserLoggedIn() {
    return localStorage.getItem(this.TOKEN_KEY) !== undefined;
  }

  getLoggedUser(): UserTokenResponse {
    return this.getUserFromStorage();
  }

  checkToken() {
    return new Promise((resolve, reject) => {
      this.storage.get(this.TOKEN_KEY)
        .then(res => {
          if (res) {
            this.authenticationState.next(true);
          }
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  login(accessToken) {
    const token = 'Bearer' + accessToken;
    this.storage.set(this.TOKEN_KEY, token).then(() => {
      console.log('Setting token: ', token);
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove(this.TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      this.checkToken()
        .then(res => {
          resolve(this.authenticationState.value);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  private storeUserInStorage(user: UserTokenResponse) {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(user));
  }

  private getUserFromStorage() : UserTokenResponse {
    if (localStorage.getItem(this.TOKEN_KEY) !== undefined) {
      const userStr = localStorage.getItem(this.TOKEN_KEY);
      const user: UserTokenResponse = JSON.parse(userStr);
      return user;
    }
    return null
  }

  private removeUserFromStorage() {
    if (localStorage.getItem(this.TOKEN_KEY) !== undefined) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

}
