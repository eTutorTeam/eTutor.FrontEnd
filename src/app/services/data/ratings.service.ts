import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RatingRequest} from "../../models/rating-request";
import {RatingResponse} from "../../models/rating-response";
import {MeetingSummary} from "../../models/meeting-summary";

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(
      private http: HttpClient
  ) { }

  async createRating(rating: RatingRequest): Promise<RatingResponse> {
    return this.http.post<RatingResponse>(`${environment.apiBaseUrl}/api/ratings`, rating).toPromise();
  }

  async getPendingMeetingToRate(): Promise<MeetingSummary> {
    const meeting = await this.http.get<MeetingSummary>(`${environment.apiBaseUrl}/api/ratings/pending`).toPromise();
    return meeting;
  }
}
