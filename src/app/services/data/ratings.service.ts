import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RatingRequest} from "../../models/rating-request";
import {RatingResponse} from "../../models/rating-response";

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  async createRating(rating: RatingRequest): Promise<RatingResponse> {
    return this.http.post<RatingResponse>(`${environment.apiBaseUrl}/api/ratings`, rating).toPromise();
  }
}
