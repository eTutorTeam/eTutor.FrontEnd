import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage';
import { ComponentsModule } from './components/components.module';
import { UserPopoverComponent } from './components/user-popover/user-popover.component';
import { AuthInterceptorService } from './services/accounts/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {FirebaseX} from '@ionic-native/firebase-x/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ImageHandlingService} from "./services/image-handling.service";
import {NgxMaskModule} from "ngx-mask";
import {AvatarModule} from "ngx-avatar";
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    UserPopoverComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    NgxMaskModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    ImageHandlingService,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FirebaseX,

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
