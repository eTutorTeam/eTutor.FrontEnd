import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';
import { RoleTypes } from 'src/app/enums/role-types.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles: RoleTypes[] = next.data['roles']
    return this.loggedUserHasRoles(roles);
  }

  private async loggedUserHasRoles(roles: RoleTypes[]): Promise<boolean> {
    const loggedIn = await this.isUserLoggedIn();
    const user = await this.accountService.getLoggedUser();
    if (loggedIn && user.roles.some(r => roles.includes(r))) {
      return true;
    }

    //TODO: Show unathorized page
    this.router.navigate(['login-tutor'])
    return false;
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
