import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { AccountService } from './account.service';
import { UserTokenResponse } from 'src/app/models/user-token-response';
import { request } from 'http';
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

/**
 * intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.headers.has('Authorization') && this.accountService.isLogged) {
      if (this.accountService.isTokenExpired()) {
        localStorage.clear();
        this.router.navigate(['pages/login']);
        return;
      }
      request = request.clone({
        setHeaders: {
          Authorization: `bearer ${this.accountService.currentUser.token}`
        }
      });
    }



    return next.handle(request).pipe(tap(
      succ => {
      },
      err => {
        if (err.status === 401) {
          this.router.navigateByUrl('pages/login');
        }
      }
    ));
  }
 */