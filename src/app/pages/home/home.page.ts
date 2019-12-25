import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from "../../services/accounts/account.service";
import {RoleTypes} from "../../enums/role-types.enum";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading = true;

  constructor(
      public router: Router,
      private accountService: AccountService
  ) {}

  ionViewWillEnter() {
    this.reroute();
  }

  ngOnInit() {

  }

  private reroute() {
    this.isLoading = true;
    this.rerouteDependingOnRole().catch(err => {
      this.isLoading = false;
    });
  }

  private async rerouteDependingOnRole() {
    if (await this.accountService.checkIfUserHasRole(RoleTypes.Tutor)) {
      await this.router.navigate(['tutors']);
    }

    if (await this.accountService.checkIfUserHasRole(RoleTypes.Parent)) {
      await this.router.navigate(['parents']);
    }

    this.isLoading = false;
  }

}
