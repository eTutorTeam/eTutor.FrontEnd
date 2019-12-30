import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppRoutingService {

  constructor(private router: Router) { }

  getRouteTitle() {
    return this.getRouteData('title');
  }

  getRouteData(data: string) {
    const root = this.router.routerState.snapshot.root;
    return this.lastChild(root).data[0][data];
  }

  private lastChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (route.firstChild) {
      return this.lastChild(route.firstChild);
    } else {
      return route;
    }
  }
}
