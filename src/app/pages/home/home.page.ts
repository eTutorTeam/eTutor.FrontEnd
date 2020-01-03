import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from "../../services/accounts/account.service";
import {RoleTypes} from "../../enums/role-types.enum";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLoading = true;
  map: GoogleMap;
  constructor(
      public router: Router,
      private accountService: AccountService,
      private googleMaps: GoogleMaps
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
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create('map_canvas', mapOptions);
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error => {
      console.log(error);
    });
  }
  getPosition(): void{
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

}
