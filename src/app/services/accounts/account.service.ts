import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserTokenResponse } from 'src/app/models/user-token-response';
import { LoginRequest } from 'src/app/models/login-request';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RegisterRequest} from '../../models/register-request';
import {ForgotPasswordRequest} from '../../models/forgot-password-request';
import {FcmService} from "../fcm.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private helper: JwtHelperService;
  private apiBaseUrl = environment.apiBaseUrl;
  private userStorageKey = 'user-etutor-token';
  user: UserTokenResponse;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private fmcService: FcmService
  ) {
    this.helper = new JwtHelperService();
  }

  async loginUser(loginRequest: LoginRequest): Promise<UserTokenResponse> {
    const response = await this.http.post<UserTokenResponse>(`${this.apiBaseUrl}/api/accounts/login`, loginRequest).toPromise();
    //await this.fmcService.getToken();
    //this.fmcService.registerToNotifications();
    return this.saveToken(response);
  }
  async registerUser(registerRequest: RegisterRequest, userType: string): Promise<UserTokenResponse> {
    const requestUrl = `${this.apiBaseUrl}/api/accounts/register-${userType}`;
    const response = await this.http.post<UserTokenResponse>(requestUrl,
        registerRequest).toPromise();
    return this.saveToken(response);
  }
  async saveToken(response): Promise<UserTokenResponse> {
    this.user = response;
    await this.saveUserToStorage(this.user);
    return response;
  }

  async logoutUser() {
    await this.updateUserVariable();
    if (this.user != null) {
      await this.storage.remove(this.userStorageKey);
      this.user = null;
      this.router.navigate(['login-tutor']);
    }
  }

  async updateUserVariable() {
    const storageContent = await this.storage.get(this.userStorageKey);
    if (storageContent != null && storageContent !== undefined && storageContent.length > 0) {
      this.user = JSON.parse(storageContent);
    } else {
      this.user = null;
    }
  }

  async getLoggedUser(): Promise<UserTokenResponse> {
    if (await this.isUserLoggedIn()) {
      return this.user;
    }
    return null;
  }

  async isUserLoggedIn(): Promise<boolean> {
    await this.updateUserVariable();
    return this.user != null;
  }

  async isTokenExpired(): Promise<boolean> {
    const loggedIn = await this.isUserLoggedIn();
    if (!loggedIn) {
      return true;
    }

    return this.helper.isTokenExpired(this.user.token);
  }

  private async saveUserToStorage(userToSave: UserTokenResponse) {
    const strUser = JSON.stringify(userToSave);
    await this.storage.set(this.userStorageKey, strUser);
  }

  async ForgotPassword(forgotPassRequest: ForgotPasswordRequest) {
      const requestUrl = `${this.apiBaseUrl}/api/accounts/forgot-password`;
      const response = await this.http.post(requestUrl,
          forgotPassRequest).toPromise();

  }

}
