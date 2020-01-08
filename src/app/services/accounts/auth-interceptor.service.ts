import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private accountService: AccountService,
    private router: Router
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleRequest(req, next))
  }

  private async handleRequest(req: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    const isLogged = await this.accountService.isUserLoggedIn();
    if (isLogged && !req.headers.has('Authorization')) {
      let user = await this.accountService.getLoggedUser();
      if (await this.accountService.isTokenExpired()) {
        await this.accountService.logoutUser()
        return;
      }

      req = req.clone({
        setHeaders: {
          Authorization: `bearer ${user.token}`
        }
      })
    }

    
    return next.handle(req).toPromise();
  }
}
