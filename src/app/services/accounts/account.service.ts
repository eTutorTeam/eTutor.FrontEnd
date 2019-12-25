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
import { PushNotificationService } from '../push-notification.service';
import { BehaviorSubject } from 'rxjs';
import {RoleTypes} from "../../enums/role-types.enum";
import {UserProfileUpdateRequest} from "../../models/user-profile-update-request";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private helper: JwtHelperService;
  private apiBaseUrl = environment.apiBaseUrl;
  private userStorageKey = 'user-etutor-token';
  user: UserTokenResponse;
  userSubject: BehaviorSubject<UserTokenResponse> = new BehaviorSubject<UserTokenResponse>(null);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router
  ) {
    this.helper = new JwtHelperService();
  }

  async loginUser(loginRequest: LoginRequest): Promise<UserTokenResponse> {
    const response = await this.http.post<UserTokenResponse>(`${this.apiBaseUrl}/api/accounts/login`, loginRequest).toPromise();
    await this.saveToken(response);
    return response;
  }
  async registerUser(registerRequest: RegisterRequest, userType: string) {
    const requestUrl = `${this.apiBaseUrl}/api/accounts/register-${userType}`;
    const response = await this.http.post<UserTokenResponse>(requestUrl,
        registerRequest).toPromise();
  }

  async reloadUserInfo(): Promise<UserTokenResponse> {
    const response = await this.http.get<UserTokenResponse>(`${this.apiBaseUrl}/api/accounts/updated-info-token`).toPromise();
    await this.saveToken(response);
    return response;
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
    this.userSubject.next(this.user);
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

  async updateUserImage(image: string) {
    await this.updateUserVariable();
    this.user.profileImageUrl = image;
    await this.saveUserToStorage(this.user);
  }

  private async saveUserToStorage(userToSave: UserTokenResponse) {
    const strUser = JSON.stringify(userToSave);
    this.userSubject.next(userToSave);
    await this.storage.set(this.userStorageKey, strUser);
  }

  async checkIfUserHasRole(role: RoleTypes): Promise<boolean> {
    await this.updateUserVariable();
    if (this.user !== null && this.user !== undefined) {
      const roles = this.user.roles;
      return roles.some(r => r === role);
    }
    return false;
  }

  async ForgotPassword(forgotPassRequest: ForgotPasswordRequest) {
      const requestUrl = `${this.apiBaseUrl}/api/accounts/forgot-password`;
      const response = await this.http.post(requestUrl,
          forgotPassRequest).toPromise();

  }

}
