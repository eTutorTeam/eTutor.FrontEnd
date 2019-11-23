import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router ,UrlTree, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public accountService: AccountService,
    public router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.isUserLoggedIn();
  }

  private async isUserLoggedIn(): Promise<boolean> {
    let isUserLoggedIn = this.accountService.isUserLoggedIn();
    if (isUserLoggedIn) {
      if (await this.accountService.isTokenExpired()) {
        await this.accountService.logoutUser();
        return false;
      }
      return true;
    }
    return false;
  }
}
