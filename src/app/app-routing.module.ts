import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/home/homepage/homepage.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {
    path : "social", loadChildren : () =>{
      return import("./social/social.module").then((module)=>{
        return module.SocialModule
      })
    }, canActivate: [AuthGuard]
  },
  // user - settings
  // profile settings
  // changepassword
  {path: '**', component: NoPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
