import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/accounts/auth.guard';
import { RoleAuthGuard } from './services/accounts/role-auth.guard';
import { RoleTypes } from './enums/role-types.enum';

const routes: Routes = [
  { path: '', redirectTo: 'login-tutor', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule), 
    data: {
      roles: [RoleTypes.Tutor]
    },
    canActivate: [AuthGuard]
  },
  // { path: 'login-tutor', loadChildren: './pages/login-tutor/login-tutor.module#LoginTutorPageModule' },
  { path: 'login-tutor', loadChildren: './auth/login-tutor/login-tutor.module#LoginTutorPageModule' },
  { path: 'register-tutor', loadChildren: './auth/register-tutor/register-tutor.module#RegisterTutorPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' , canActivate: [AuthGuard]},
  { path: 'history', loadChildren: './pages/history/history.module#HistoryPageModule', canActivate: [AuthGuard] },  { path: 'subjects-list', loadChildren: './subjects-list/subjects-list.module#SubjectsListPageModule' },
  { path: 'tutor-d-list', loadChildren: './tutor-d-list/tutor-d-list.module#TutorDListPageModule' },
  { path: 'tutor-d-list', loadChildren: './pages/tutor-d-list/tutor-d-list.module#TutorDListPageModule' },
  { path: 'subjects-list', loadChildren: './pages/subjects-list/subjects-list.module#SubjectsListPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
