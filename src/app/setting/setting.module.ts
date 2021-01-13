import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordComponent } from './components/password/password.component';
import { SettingComponent } from './setting/setting.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, PasswordComponent, SettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    ReactiveFormsModule
  ]
})
export class SettingModule { }
