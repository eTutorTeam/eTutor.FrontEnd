import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserPopoverComponent } from '../user-popover/user-popover.component';
import { AccountService } from 'src/app/services/accounts/account.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserTokenResponse } from 'src/app/models/user-token-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  user: UserTokenResponse;
  @Input() showBack: boolean = false;
  @Input() title: string = '';

  constructor(
    private popoverCtrl: PopoverController,
    private accountService: AccountService
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
}
