import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule) , canActivate: [AuthGuard]},
  // { path: 'login-tutor', loadChildren: './pages/login-tutor/login-tutor.module#LoginTutorPageModule' },
  { path: 'login-tutor', loadChildren: './auth/login-tutor/login-tutor.module#LoginTutorPageModule' },
  { path: 'register-tutor', loadChildren: './auth/register-tutor/register-tutor.module#RegisterTutorPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' , canActivate: [AuthGuard]},
  { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
