import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';

import { MainPanelComponent } from './main-panel/main-panel.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToProfile = () => 
  map(user => user ? ['profile',(user as any).uid]: true);
const onlyAllowSelf = next => map(user => (!!user && next.params.id == (user as any).uid) || ['']);

const routes: Routes = [
  { 
    path: '', component: LoginComponent,
    canActivate: [ AngularFireAuthGuard ], 
    data: { authGuardPipe: redirectLoggedInToProfile } 
  },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'profile/:id', 
    component: ProfileComponent, 
    canActivate: [ AngularFireAuthGuard ], 
    data: { authGuardPipe: onlyAllowSelf }
  },
  { path: 'main', component: MainPanelComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
