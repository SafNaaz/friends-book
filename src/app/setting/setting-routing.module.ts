import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './components/password/password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'password', component: PasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
