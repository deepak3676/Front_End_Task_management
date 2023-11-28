import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Authguard/user/auth.guard';
import { adminauthGuard } from './Authguard/admin/adminauth.guard';
import { HomePageComponent } from './component/home-page/home-page.component';
import { DashBoardComponent } from './component/dash-board/dash-board.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { UserDetailsComponent } from './component/user-details/user-details.component';
import { DefaultPageComponent } from './component/default-page/default-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'dashboard', component: DashBoardComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'userDetails', component: UserDetailsComponent, canActivate: [adminauthGuard] },
  { path: 'default', component: DefaultPageComponent, canActivate: [authGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
