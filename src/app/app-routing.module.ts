import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { authGuard } from './auth.guard';
import { DialogComponent } from './dialog/dialog.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { adminauthGuard } from './adminauth.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { DefaultPageComponent } from './default-page/default-page.component';


const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomePageComponent},
  { path: 'dashboard', component: DashBoardComponent,canActivate:[authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
  {path:'dialog',component:DialogComponent},
  {path:'userDetails',component:UserDetailsComponent,canActivate:[adminauthGuard]},
  {path:'default',component:DefaultPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
