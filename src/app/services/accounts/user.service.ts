import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserProfileResponse} from "../../models/user-profile-response";
import {UserProfileUpdateRequest} from "../../models/user-profile-update-request";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async getUserProfile(): Promise<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(`${environment.apiBaseUrl}/api/users/profile`).toPromise();
  }

  async addImageToUser(base64img: string, filename: string) {
    return this.http.patch(`${environment.apiBaseUrl}/api/users/profile/image`,
        {
          base64Img: base64img,
          fileName: filename
        }).toPromise();
  }


  async updateUser(user: UserProfileUpdateRequest) {
      return this.http.put(`${environment.apiBaseUrl}/api/users/profile`, user).toPromise();
  }
}
