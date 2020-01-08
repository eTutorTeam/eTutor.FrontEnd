import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../user-popover/user-popover.component';
import { AccountService } from 'src/app/services/accounts/account.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserTokenResponse } from 'src/app/models/user-token-response';
import {ActivatedRoute, Router} from "@angular/router";
import {AppRoutingService} from "../../services/app-routing.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  user: UserTokenResponse;
  @Input() showBack = false;
  @Input() title = '';

  constructor(
    private popoverCtrl: PopoverController,
    private accountService: AccountService,
    private router: Router,
    private routerService: AppRoutingService
    ) { }

  ngOnInit() {
    this.accountService.userSubject.subscribe(subject => {
      this.user = subject;
    });
  }

  async mostrarPop( event ) {
    const popover = await this.popoverCtrl.create({
      component: UserPopoverComponent,
      event,
      mode: 'ios',
    });

    await popover.present();
  }

  private readTitleFromRoute() {
    const tit = this.routerService.getRouteTitle();
    if (tit !== undefined) {
      this.title = tit;
    }
  }
}
